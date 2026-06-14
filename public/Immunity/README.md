# Cipher Puzzle — Setup Guide

## File structure

```
your-project/
│
├── puzzle.html          ← the main puzzle page
├── codes.txt            ← your secret codes config
├── fail.html            ← universal fail page
│
├── success-team1.html   ← one of your success pages
├── success-team2.html   ← another success page
│
└── images/
    ├── layer1/
    │   ├── manifest.json   ← list of filenames in this folder
    │   ├── red_mask.png
    │   ├── ancient_totem.png
    │   └── ...
    ├── layer2/
    │   ├── manifest.json
    │   └── ...
    ├── layer3/
    │   ├── manifest.json
    │   └── ...
    └── layer4/
        ├── manifest.json
        └── ...
```

---

## Step 1 — Add your images

Put up to 20 images in each of the 4 layer folders. Any image format works (jpg, png, gif, webp, svg).

**Name your files carefully** — the filename becomes the button label and the code key:

| Filename              | Button Label    | Code Key        |
|-----------------------|-----------------|-----------------|
| `red_mask.png`        | Red Mask        | `RedMask`       |
| `ancient-totem.jpg`   | Ancient Totem   | `AncientTotem`  |
| `blue orb.png`        | Blue Orb        | `BlueOrb`       |
| `fire_symbol_v2.png`  | Fire Symbol V2  | `FireSymbolV2`  |

---

## Step 2 — Create manifest.json files

In **each** layer folder, create a `manifest.json` file that lists the image filenames as a JSON array:

```json
[
  "red_mask.png",
  "ancient_totem.png",
  "blue_orb.png",
  "golden_key.png"
]
```

This tells the puzzle which images to load (browsers can't list folders directly).

---

## Step 3 — Set up codes.txt

Each line in `codes.txt` is one valid winning code:

```
Layer1Key,Layer2Key,Layer3Key,Layer4Key=success-page.html
```

**Example:**
```
RedMask,AncientTotem,BlueOrb,GoldenKey=success-team1.html
FireSymbol,StoneRune,SilverCoin,WoodenIdol=success-team2.html
```

- Lines starting with `#` are comments
- Multiple codes can exist, pointing to different success pages
- The separator is a comma between keys and `=` before the page URL
- Success page URLs can be relative (`winner.html`) or absolute (`https://...`)

---

## Step 4 — Configure puzzle.html

Open `puzzle.html` and find the `CONFIG` block near the top of the `<script>` section. You may want to adjust:

```javascript
const CONFIG = {
  CODES_FILE:  "codes.txt",      // path to codes file
  FAIL_PAGE:   "fail.html",      // universal fail page

  LAYER_FOLDERS: [
    "images/layer1",             // customize folder paths if needed
    "images/layer2",
    "images/layer3",
    "images/layer4",
  ],

  REDIRECT_ON_RESULT: true,      // set false to test without redirecting
};
```

### Alternative: hardcode images directly (no manifest.json needed)

If you don't want to use manifest.json files, you can hardcode the image lists directly in puzzle.html:

```javascript
CONFIG.LAYER_IMAGES = [
  ["red_mask.png", "ancient_totem.png", "blue_orb.png"],  // layer 1
  ["fire_symbol.png", "stone_rune.png", "silver_coin.png"], // layer 2
  ["jade_serpent.png", "crystal_shard.png"],              // layer 3
  ["ghost_lantern.png", "wax_seal.png"],                  // layer 4
];
```

---

## Step 5 — Test it

Set `REDIRECT_ON_RESULT: false` in the CONFIG block while testing — the puzzle will show an overlay with the result instead of actually redirecting, so you can verify your codes work.

Change it back to `true` when you go live.

---

## Customization

**Title and subtitle** — edit these lines in puzzle.html:
```html
<div id="title">The Cipher</div>
<div id="subtitle">select the sequence — four layers — one truth</div>
```

**Colors** — edit the `:root` CSS variables at the top of the `<style>` block:
```css
--accent:  #00C8F0;   /* teal highlight color */
--amber:   #FFB347;   /* selected tile color */
--success: #00E887;   /* success screen color */
--danger:  #FF4466;   /* fail screen color */
```

---

## Hosting

The puzzle needs to be served from a web server (not opened as a local file) because it fetches `codes.txt` and `manifest.json` via HTTP. Options:

- Upload to any web host (Netlify, GitHub Pages, etc.)
- Run a local server: `python3 -m http.server 8080` in the project folder
- Use VS Code's Live Server extension
