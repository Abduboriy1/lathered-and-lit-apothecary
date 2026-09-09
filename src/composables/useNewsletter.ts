import { ref } from 'vue'
import { track } from '@/lib/pixel'

/**
 * Mailchimp signup via the embed form's JSONP endpoint.
 *
 * VITE_MAILCHIMP_FORM_URL is the `action` URL from Mailchimp's
 * "Embedded forms" code, e.g.
 *   https://example.us21.list-manage.com/subscribe/post?u=XXXX&id=YYYY
 *
 * Mailchimp exposes the same endpoint as `post-json`, which accepts a
 * JSONP callback (`c=`) so the browser can submit cross-origin and read
 * the result without a backend.
 */
export type NewsletterStatus = 'idle' | 'loading' | 'success' | 'error'

const FORM_URL = import.meta.env.VITE_MAILCHIMP_FORM_URL ?? ''

interface MailchimpResponse {
  result: 'success' | 'error'
  msg: string
}

function jsonpUrl(email: string, callback: string): string {
  const url = new URL(FORM_URL)
  url.pathname = url.pathname.replace(/\/subscribe\/post\/?$/, '/subscribe/post-json')
  url.searchParams.set('EMAIL', email)
  url.searchParams.set('c', callback)
  return url.toString()
}

function subscribeJsonp(email: string): Promise<MailchimpResponse> {
  return new Promise((resolve, reject) => {
    const callback = `__mc_cb_${Date.now()}_${Math.floor(Math.random() * 1e6)}`
    const script = document.createElement('script')
    const win = window as unknown as Record<string, unknown>

    const cleanup = () => {
      delete win[callback]
      script.remove()
      clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      cleanup()
      reject(new Error('Request timed out. Please try again.'))
    }, 15000)

    win[callback] = (data: MailchimpResponse) => {
      cleanup()
      resolve(data)
    }

    script.onerror = () => {
      cleanup()
      reject(new Error('Could not reach the signup service.'))
    }

    script.src = jsonpUrl(email, callback)
    document.head.appendChild(script)
  })
}

/** Strip Mailchimp's HTML from its messages ("0 - Please enter a value", links, etc.). */
function cleanMessage(msg: string): string {
  const text = msg.replace(/<[^>]*>/g, '').replace(/^\d+\s*-\s*/, '').trim()
  return text || 'Something went wrong. Please try again.'
}

export const isNewsletterConfigured = FORM_URL.length > 0

export function useNewsletter() {
  const email = ref('')
  const status = ref<NewsletterStatus>('idle')
  const message = ref('')

  async function subscribe() {
    const value = email.value.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      status.value = 'error'
      message.value = 'Please enter a valid email address.'
      return
    }
    if (!isNewsletterConfigured) {
      status.value = 'error'
      message.value = 'Newsletter signup is not available right now.'
      return
    }

    status.value = 'loading'
    message.value = ''
    try {
      const res = await subscribeJsonp(value)
      if (res.result === 'success') {
        status.value = 'success'
        message.value = "You're in! Check your inbox to confirm."
        email.value = ''
        markSubscribed()
        track('Lead', { content_name: 'newsletter' })
      } else {
        status.value = 'error'
        message.value = /already subscribed/i.test(res.msg)
          ? "You're already on the list."
          : cleanMessage(res.msg)
      }
    } catch (err) {
      status.value = 'error'
      message.value = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
    }
  }

  return { email, status, message, subscribe }
}

/* ---- Popup visibility persistence ---- */

const SUBSCRIBED_KEY = 'll_newsletter_subscribed'
const DISMISSED_KEY = 'll_newsletter_dismissed_at'
const DISMISS_DAYS = 30

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* private mode / blocked storage: popup just shows again next visit */
  }
}

export function markSubscribed() {
  safeSet(SUBSCRIBED_KEY, '1')
}

export function markPopupDismissed() {
  safeSet(DISMISSED_KEY, String(Date.now()))
}

export function shouldShowPopup(): boolean {
  if (!isNewsletterConfigured) return false
  if (safeGet(SUBSCRIBED_KEY)) return false
  const dismissed = Number(safeGet(DISMISSED_KEY) ?? 0)
  if (dismissed && Date.now() - dismissed < DISMISS_DAYS * 86_400_000) return false
  return true
}
