// Minimal Storefront API client: one POST to the GraphQL endpoint.
// Replaces @shopify/storefront-api-client (~100 KB of JS) with a plain fetch.

const rawDomain = (import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string) ?? ''
const storeDomain = rawDomain.replace(/^https?:\/\//, '').replace(/\/+$/, '')
const token = (import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string) ?? ''
const API_VERSION = '2025-07'
const endpoint = `https://${storeDomain}/api/${API_VERSION}/graphql.json`

export interface StorefrontResponse<T = unknown> {
  data?: T
  /** Joined GraphQL / network error message, undefined on success. */
  errors?: string
}

interface RequestOptions {
  variables?: Record<string, unknown>
}

export const shopifyClient = {
  async request<T = unknown>(query: string, options: RequestOptions = {}): Promise<StorefrontResponse<T>> {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query, variables: options.variables }),
    })

    if (!res.ok) {
      return { errors: `Shopify request failed (${res.status} ${res.statusText})` }
    }

    const json = (await res.json()) as { data?: T; errors?: { message: string }[] }
    const errors = json.errors?.length ? json.errors.map((e) => e.message).join('; ') : undefined
    return { data: json.data, errors }
  },
}
