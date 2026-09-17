# Lathered & Lit Apothecary — Website Work Summary

**Client:** Lathered & Lit Apothecary LLC
**Project:** latheredandlitapothecary.com — rebrand, redesign, mobile cleanup, performance, launch, marketing tools
**Work dates:** September 5, 8 and 9, 2026
**Prepared by:** Bory
**Rate:** $100 / hour · **Agreed cap:** 4 hours

---

## Summary

Over three working sessions the site was moved from the old "Lathered & Lit Soap Co." identity to the new **Lathered & Lit Apothecary** brand, visually redesigned, made fully mobile-friendly, optimized for speed, deployed to your new domain on Cloudflare, wired up with a cookie consent banner, Mailchimp newsletter signup, and Meta (Facebook) Pixel tracking, and finally moved onto a brand-new Shopify store under your new business email with a simple JSON-based product upload system.

Total time spent came to roughly **8 hours**. Per our agreement, **billing is capped at 4 hours ($400)**. The additional ~4 hours were spent on design iteration, extra features, and the new Shopify migration beyond the original scope, and are **included at no charge**.

---

## Time & Billing

| Date | Work block | Hours | Billed |
|---|---|---|---|
| Sep 5 | Rebrand to Lathered & Lit Apothecary (logo, name, footer, favicon, copy) | 0.75 | Yes |
| Sep 5 | Full design pass: palette, hero, header, leaf-vine borders, section layouts | 2.25 | Partial (see below) |
| Sep 5 | Performance optimization + Cloudflare Pages deployment + custom domain | 0.75 | No |
| Sep 5 | Mobile audit and fixes (hamburger menu, mobile nav, all mobile views) | 0.50 | No |
| Sep 8 | Cookie consent banner, Mailchimp newsletter, Meta Pixel, client feedback fixes | 1.25 | No |
| Sep 9 | New business email, new Shopify store + API setup, JSON product upload system, site switched to new store | 1.50 | No |
| | **Total time worked** | **~8.0** | |
| | **Billable (capped)** | **4.0** | **$400.00** |
| | **Complimentary (over cap, not charged)** | **~4.0** | **$0.00** |

**Amount due: $400.00**

---

## What Was Done

### 1. Rebrand to "Lathered & Lit Apothecary" (Sep 5)

- Replaced all "Lathered & Lit Soap Co." references with **Lathered & Lit Apothecary** across the site, page title, and footer copyright ("© 2026 Lathered & Lit Apothecary LLC").
- Built a new wordmark that mirrors the treatment on your Facebook posts: **LATHERED & LIT** in serif caps with letter-spaced **APOTHECARY** beneath, flanked by two small accent dots. It has a stacked version for the hero and footer and an inline version for the navigation bar.
- New heart-style favicon (browser tab icon) matching the header artwork.
- Footer redesigned to a taller, modern layout with brand column, links, and social icons pointing to the Lathered & Lit Apothecary Facebook page and Instagram.
- Removed unused old logo and hero image files from the project.

### 2. Design Refresh (Sep 5)

- Reviewed every section against the brand palette (teal, blush, rose-gold, gold) and tightened colors, spacing, and typography so the site reads as polished and premium.
- New hero: converted your updated hero artwork to an optimized WebP image, fixed the "floating" header image, and repositioned the brand name centered above the message and image at a larger size.
- Hero message block: enlarged text to fill empty space; the three promise lines ("Free shipping on orders over $50 · 100% natural, skin-loving ingredients · Handmade on our family farm") now sit on a single line.
- Created a reusable **hand-drawn leaf vine** decorative border drawn from the leaves in your hero image. It runs along the footer edge and its wavy stem now shapes the footer's top edge so the section follows the curve.
- Extended the "What Our Customers Say" background down to the footer to remove the mismatched gap.
- Softer, smoother scroll-reveal animations on sections and product cards.
- Restored the navigation bar after trying an alternate treatment you preferred not to keep.

### 3. Performance Optimization (Sep 5)

- Converted heavy PNG images (hero, textures, story cover) to WebP; total image weight dropped from roughly 19 MB to about 300 KB.
- Hero image is preloaded with high priority so the first screen appears faster.
- Added long-lived browser caching headers for site assets and basic security headers.
- Added SEO essentials: meta description, canonical URL, Open Graph and Twitter share cards with a branded share image, `robots.txt`, and `sitemap.xml`.

### 4. Deployment to Cloudflare Pages + Custom Domain (Sep 5)

- Set up the project for Cloudflare Pages and resolved the build failures that were blocking the first deploy (lock-file sync and dependency pinning).
- Added a one-command deploy (`npm run deploy`) so future updates can be built locally and pushed live.
- Walked through connecting **latheredandlitapothecary.com** to the deployment so the site serves from your own domain instead of the temporary Cloudflare address.

### 5. Mobile Cleanup (Sep 5)

- Audited every page at phone size and fixed layout issues throughout.
- Added a proper mobile navigation: animated hamburger-to-X button, slide-down menu with Home / Shop / Your Bag, cart count badge, social links, Escape-key and tap-outside to close, and scroll lock while open.
- Responsive tuning for the header, hero, product grid, product detail, cart drawer, testimonials, and footer.

### 6. Marketing Tools & Client Feedback (Sep 8)

- **Cookie consent banner:** a generic "We use cookies" notice with Accept / Decline, remembered per visitor. Tracking only activates after the visitor accepts.
- **Mailchimp newsletter signup:** footer signup form connected directly to your Mailchimp audience (no Shopify page required), with clear success / already-subscribed / error messages. Added a tasteful welcome popup that appears once, remembers subscribers, and stays hidden for 30 days after dismissal.
- **Meta (Facebook) Pixel:** installed with consent-aware loading. Tracks PageView, ViewContent (product pages), AddToCart, InitiateCheckout, and Lead (newsletter signup). Events that happen before consent are queued and sent once the visitor accepts.
- Logo fix: removed the gradient fade on "LIT" so the whole word is a single solid color.
- Client-requested tweaks: hero image hidden on mobile, "Apothecary" made larger under the logo, footer centered on mobile, the three feature badges (Natural Ingredients · Made with Love · Gentle & Nourishing) on one line on mobile, and testimonials adjusted to a realistic mix of 4- and 5-star reviews.

### 7. New Email, New Shopify Store & JSON Product System (Sep 9)

**New business email**

- The business now runs on **admin@latheredandlitapothecary.com** (Gmail on the new domain). This is the address used for the new Shopify account and will be the contact for Mailchimp and Facebook going forward, replacing the old Admin@latheredandlit.com.

**New Shopify store**

- Created and verified a fresh Shopify account under the new email, with a new store (`f0wxfm-t4.myshopify.com`) to replace the old Lathered & Lit Soap Co. store.
- Set up a private **"Product Generator"** app in Shopify's Dev Dashboard with the permissions needed to create and edit products, upload images, manage inventory, and publish to the Online Store channel. Shopify has retired the old "custom app" screen, so this is now the required path for any automation.
- Generated a Storefront API key for the website and pointed the site at the new store. Products are automatically published to the Online Store channel so they appear on the site.
- Set up inventory tracking at your main location so the site shows real stock levels instead of "Out of Stock".
- Seeded the new store with six sample products (bar soap, body butter, bath bomb) with generated placeholder label art, prices, descriptions, tags, and stock of 25 each. These are placeholders you can rename, re-price, or delete.

**JSON product upload system**

- Added a simple way to manage the whole catalog from one file, **`data/products.json`**, without clicking through Shopify admin:
  - `npm run products:export` pulls every product from the store into the file.
  - Edit the file: change a title, price, stock, status, tags, or description; add a new product by adding an entry without an `id`; remove one by deleting its entry.
  - `npm run products:sync` pushes the changes back to Shopify (creates new products, updates existing ones, and lists any you removed; add `--delete` to actually delete them).
  - Product images can be a web link, a local file, or the word `"generate"` for auto-made brand-style placeholder art.
- Also added `npm run products:generate` to bulk-create random sample products, and `npm run products:storefront-token` to re-issue the website's store key if it is ever rotated.
- Documented all of this in the project README.

---

## Items Needing Your Action

These require account access only the business owner has:

1. **Meta Pixel:** add your Pixel ID from Meta Events Manager (key `VITE_META_PIXEL_ID`).
2. **Cloudflare Pages:** update the two Shopify settings (`VITE_SHOPIFY_STORE_DOMAIN`, `VITE_SHOPIFY_STOREFRONT_TOKEN`) in the Pages project to the new store values so the live site uses the new store, then redeploy.
3. **New Shopify store:** rename the store from "My Store" to Lathered & Lit Apothecary, upload the brand logo / cover, connect latheredandlitapothecary.com as the store domain, and set up payments and shipping before going live.
4. **Real products:** the six products in the new store are placeholders. Your real products still live in the old store; they can be exported and loaded into the new one through the JSON system on request.
5. **Facebook page:** update the listed email and website from latheredandlit.com to admin@latheredandlitapothecary.com / latheredandlitapothecary.com.
6. **Mailchimp:** update the account contact email to the new address.

---

Thank you for the opportunity to work on Lathered & Lit Apothecary. Please reach out with any questions about this summary or the items above.
