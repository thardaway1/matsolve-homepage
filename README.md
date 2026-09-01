# MatSOLVE — lab homepage

Static site for **MatSOLVE** (Material Simulation and Optimization Lab with Virtual
Engineering), Center for Virtual Engineering Platform, Korea Institute of Ceramic
Engineering and Technology (KICET). PI: Hyunseok Ko.

No build step, no dependencies — plain HTML/CSS/JS. Any static host works
(GitHub Pages, Netlify, an institutional web server).

## Structure

```
index.html              markup for all six sections + inline JSON data
                        (#imgdata = image path map, #pubdata = 42 publications)
assets/css/style.css    design system: colours, type scale, layout, dark mode
assets/js/site.js       routing, news stream, publication list/filters, gallery
assets/img/             47 web-sized images (2.2 MB total)
```

Sections: about · research · people · publications · facility · gallery.
Client-side routing only — one HTML file, sections toggled by `hidden`.

## Local preview

`file://` works for everything (no `fetch`), but a server is closer to production:

```bash
python -m http.server 8000    # then open http://localhost:8000
```

## Editing content

| What | Where |
|---|---|
| News items | `NEWS` array at the top of `assets/js/site.js` — sorted newest-first automatically |
| Publications | `<script id="pubdata">` in `index.html` |
| Members, research areas, facility copy | markup in `index.html` |
| Images | drop a file in `assets/img/`, add the key to `<script id="imgdata">` |

Dates are ISO (`YYYY-MM-DD`); news, publications and gallery all render newest-first.

## Images

`assets/img/` holds downscaled, quality-tuned derivatives. **Originals** (142 files,
250 MB) live in Google Drive:
`내 드라이브 / 업무 / b MatSOLVE 홈페이지 / 이미지 원본_260901`.
Regenerate derivatives from the originals rather than re-compressing what is here.

Brand colour: `#66E6E3` (MatSOLVE symbol), `#077F7A` for light-mode text.

## Open items

Content that still needs the lab's input — the draft carried these as on-page notes;
they were removed before publishing, so they live here instead.

- **Profile links** — Google Scholar, ORCID, GitHub, KICET profile and the CV file.
  The markup is in place but `hidden`: fill the `href` and drop the `hidden`
  attribute on the `data-ext` links in `index.html`.
- **Lab phone number and postal address** — the contact block has email and QR only.
- **Member names and titles** — English spellings and ranks (researcher /
  student researcher / postdoc) were inferred from the photo filenames.
- **Publication author lines** — no full author lists, so each entry shows
  *position / total authors / role*. Thumbnails are placeholders for graphical
  abstracts.
- **Gallery captions** — event names and dates come from the photo folder names.
- **News wording** — Korean items are lifted from press-release filenames.

## Publishing

Decided 2026-09-01: **public repository + GitHub Pages**, all 47 images included
(12 member portraits, 9 group photos). Note that images pushed to a public repo
stay in the commit history even if removed later.

Deploy: push to GitHub → Settings → Pages → *Deploy from a branch* → `main` / `/ (root)`.
`.nojekyll` is present so the files are served as-is.
