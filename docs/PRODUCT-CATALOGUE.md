# WILDCORE product catalogue

Products are intentionally empty until a reliable supplier is confirmed.

## Add a product

Add an object to `data/products.json` with these fields:

- `id`: unique stable identifier, e.g. `wc-camp-001`
- `name_en`, `name_sl`: product names in English and Slovenian
- `description_en`, `description_sl`: original product descriptions
- `category`: one of `camping`, `survival`, `fishing`, `hunting`, `accessories`
- `type`: `direct` for WILDCORE direct sales, or `affiliate` for a partner recommendation
- `image`: path to an image that WILDCORE has permission to use
- `price`: numeric EUR price for direct products; use `null` for affiliate products unless a current, approved feed supplies a display price
- `currency`: `EUR`
- `availability`: `in_stock`, `out_of_stock`, or `preorder` for direct products; partner availability must be checked before publishing
- `supplier`: supplier or merchant name
- `destination_url`: product page URL for affiliate items; leave blank for direct items until checkout is integrated
- `affiliate_disclosure_required`: `true` for affiliate links
- `published`: only set to `true` after details, pricing, stock, image rights, delivery/returns and destination URL are checked

Never publish placeholder products, invented stock, unverified prices or affiliate destinations. For direct sales, connect payment, order confirmation, shipping, returns and customer support before enabling purchase buttons.
