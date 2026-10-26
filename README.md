# Ginnan ($GINNAN) website

Static site: `index.html`, `css/style.css`, `js/main.js`. No build step. Open `index.html` or host the folder on any static host.

## Config
Edit the `CONFIG` block at the top of `js/main.js`:
- `TOKEN_NAME`, `TICKER`
- `CONTRACT_ADDRESS`: empty shows "TBA". When set, Buy links become `https://app.uniswap.org/#/swap?inputCurrency=eth&outputCurrency=<CA>` and the Chart/DexScreener links become `https://dexscreener.com/ethereum/<CA>`.
- `X_URL` (currently `https://x.com/ginnan_eth_coin`), optional `BUY_URL` / `DEXSCREENER_URL` overrides.
Tokenomics (`VAULT`), roadmap (`ROAD`), FAQ and gallery captions are arrays in the same file. Tokenomics are TBA until launch.

## Logo
All logo files (logo-round.webp/png, logo-256.webp, favicons, icons, apple-touch-icon, og-image.jpg) are generated from the square logo:

    python3 tools/make_logo_assets.py path/to/logo.jpg

It cuts the white background out to a transparent circle.

## Gallery
12 photos of Ginnan from https://kabochan.blog.jp/archives/56184690.html, in `assets/gallery/` (WebP, max 900px). Credit is shown in the gallery and footer. The photos belong to their owner; get permission before commercial use.

## Notes
- Boop counter is stored in localStorage on the visitor's device only.
- Icons are inline SVG. No emoji.
- Respects `prefers-reduced-motion`.
