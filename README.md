# Lathered & Lit — Shopify Field Mapping Reference

This doc covers every Shopify field the UI reads and exactly where/how to set it in your Shopify admin.

---

## Environment Setup

Create a `.env` file at the project root:

```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your-storefront-api-public-token
```

Get the token: **Shopify Admin → Settings → Apps and sales channels → Develop apps → your app → API credentials → Storefront API access token**

---

## Product Fields

| UI Field | Shopify Admin Location | Notes |
|---|---|---|
| **Name** | Products → Title | Displayed on cards, detail page, cart |
| **Price** | Products → Pricing → Price | Uses the first variant's price |
| **Description** | Products → Description | Full text shown on product detail page |
| **Short Description** | Products → Metafields → `custom.short_description` | Shown on product cards. Falls back to first 80 chars of Description if not set |
| **Burn Time** | Products → Metafields → `custom.burn_time` | e.g. `45–55 hours`. Only shown for candles |
| **Weight** | Products → Variants → Shipping → Weight | Set unit to **oz** or any unit; displayed as-is |
| **Category** | Products → Product type | Must be exactly `Candle`, `Soap`, or `Set` (case-insensitive) |
| **Main Image** | Products → Media → first image | Used everywhere (cards, cart, detail) |
| **Hover Image** | Products → Media → second image | Shown on card hover. Optional |
| **Stock / Availability** | Products → Variants → Inventory → Quantity | `0` = out of stock, add-to-cart disabled |

---

## Tags

Tags drive several UI behaviors. Add them in **Products → Tags**.

| Tag | Effect |
|---|---|
| `featured` | Product appears in the Featured Products section on homepage |
| `bestseller` | Shows **Bestseller** badge on product card |
| `new` | Shows **New** badge on product card |
| `limited` | Shows **Limited** badge on product card |
| `scent:cedar` | Adds "cedar" to the product's scent list (used for filtering). Replace `cedar` with any scent name — no spaces |
| `scent:lavender` | Multiple scent tags are all collected |

Tag format for scents: `scent:<name>` — lowercase, no spaces (e.g. `scent:sea-salt`, `scent:vanilla-amber`).

---

## Metafields Setup

Two custom metafields must be created before they will appear in the product admin UI.

**Shopify Admin → Settings → Custom data → Products → Add definition**

| Definition | Namespace | Key | Type |
|---|---|---|---|
| Short Description | `custom` | `short_description` | Single line text |
| Burn Time | `custom` | `burn_time` | Single line text |

After creating, they appear under **Products → [any product] → Metafields** at the bottom of the page.

---

## Category → Product Type Mapping

| Product Type (Shopify) | UI Category |
|---|---|
| `Candle` | candle |
| `Soap` | soap |
| `Set` | set |
| anything else | candle (default) |

---

## Cart

Cart data is pulled automatically from the Shopify Storefront API. No extra configuration needed beyond inventory tracking being enabled on variants.

Make sure **Track quantity** is checked on each variant so the stock check works correctly.

---

## Quick Checklist for a New Product

- [ ] Title set
- [ ] Price set on variant
- [ ] Product type set to `Candle`, `Soap`, or `Set`
- [ ] At least one image uploaded (first image = main, second = hover)
- [ ] Inventory tracking enabled, quantity set
- [ ] Variant weight set (with unit)
- [ ] Metafield `custom.short_description` filled in
- [ ] Metafield `custom.burn_time` filled in (candles only)
- [ ] Scent tags added (`scent:<name>`)
- [ ] Badge tags added if applicable (`featured`, `bestseller`, `new`, `limited`)
