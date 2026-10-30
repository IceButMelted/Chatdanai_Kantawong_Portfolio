# IcebutMelted Portfolio

Static portfolio site for a game developer (gameplay programmer, tech artist).
Plain HTML, CSS and JavaScript. No build step, no dependencies.

- Pages: About, Games (Steam-style library with a page per game), Contact
- Languages: English and Thai, with an EN / ไทย switch
- Light and dark theme follow the visitor's system setting

## Run locally

Open `index.html` in a browser, or start a local server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy (GitHub Pages)

1. Push this folder to a GitHub repository.
2. Settings > Pages > Deploy from a branch > `main` / `(root)`.
3. The site is served at `https://<user>.github.io/<repo>/`.

Any static host works the same way (Netlify, Cloudflare Pages, itch.io page, your own server).

## Project structure

```
index.html            About page
games.html            game library
game.html             one game's page (game.html?id=<game id>)
contact.html          Contact page
css/style.css         all styles; colors and fonts are tokens at the top
js/i18n.js            UI text in English and Thai (About, buttons, labels)
js/games.js           your games, English and Thai   <-- edit this to add or change games
js/main.js            links between pages, library, game pages, language switch
assets/games/<id>/    cover.jpg, icon.jpg, shot-1.jpg ... for each game
```

## Add or edit a game

Open `js/games.js`. Each game is one object in the `GAMES` array:

```js
{ id:"my-game", title:"My Game", status:"released",   // released | dev | proto
  year:"2026", engine:"Unity", platform:"PC", team:4,
  hue:200, motif:"moon",                               // placeholder art if no images
  link:"https://example.itch.io/my-game",              // "" hides the play button
  video:"https://youtu.be/xxxx",                       // optional
  cover:"assets/games/my-game/cover.jpg",              // optional
  coverRatio:"1920/620", coverPos:"30% 50%",           // cover size and crop focus
  icon:"assets/games/my-game/icon.jpg",                // small square for the list
  shots:["assets/games/my-game/shot-1.jpg"],           // screenshots
  en:{ tagline:"...", desc:"...", genre:["..."], role:"...", linkLabel:"Play on itch.io", did:["..."], credits:["..."] },
  th:{ /* same fields in Thai */ } }
```

Games are listed in array order, newest first. `engine`, `platform`, `cover`, `icon`, `shots`, `video`
and `link` are all optional.

Image tips: cover about 1400 px wide, screenshots about 900 px wide, icon 128 x 128 px, JPEG quality 80.
Keep the whole site under a few MB so it loads fast.

## Change text, contact and colors

- About text, labels, contact lines: `js/i18n.js` (both `en` and `th` blocks).
- Phone and email: `contact.html` (`#c-phone`, `#c-email`).
- Colors and fonts: the `:root` tokens at the top of `css/style.css` (light), plus the two dark blocks right below.
- Profile photo: replace the pixel placeholder `<svg id="avatar">` in `index.html` with an `<img>`.

## Notes

- Fonts load from Google Fonts. Without internet the page falls back to system fonts.
- Each page is its own HTML file, so the browser Back button goes to the previous page. Old hash links (`index.html#autobahn`) redirect to the new pages.
- The header is copied in every page file; change it in all five.
