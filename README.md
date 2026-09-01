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

## Before publishing

- [ ] Member photo consent — 12 portraits and 9 group/outing photos are in the repo.
      Once pushed to a public repo they stay in the commit history even if removed later.
- [ ] Repository visibility — public repo + GitHub Pages (free), or private repo
      (Pages needs a paid plan).
- [ ] Domain — GitHub Pages subdomain vs. a KICET-hosted address.
