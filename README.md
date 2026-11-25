# Grandcrest Integrated Services Ltd website

A plain HTML, CSS and JavaScript site. No build step: edit the files and push.

## Files
- `index.html`: all page content (hero, services, sectors, about, contact)
- `assets/css/style.css`: colours and fonts are the variables at the top (`--ink`, `--amber`, ...)
- `assets/js/main.js`: mobile menu and the enquiry form
- `assets/img/favicon.svg`: the crest mark. Replace it, and the matching inline SVG in the header, when you have a final logo.

## Animation
All motion is in `assets/css/style.css` (bottom section) and `assets/js/main.js`, with no libraries. Speeds to tweak: the amber band `animation: scroll 38s` (lower is faster), the headline `transition-delay` step (65ms per word) and the hero route dot (`dur="5s"` in `index.html`). Visitors who set "reduce motion" on their device get the site with the movement switched off.

## Run it on your computer
Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Publish with GitHub Pages
1. Create a GitHub repository and push these files to the `main` branch.
2. In the repository go to Settings > Pages and set Source to **GitHub Actions**.
3. Every push to `main` now redeploys the site (the workflow is in `.github/workflows/pages.yml`).
4. To use your own domain (for example grandcrestintegrated.com.ng), add it under Settings > Pages and create the DNS records GitHub shows you.

## Before you launch
- Add a phone/WhatsApp number in the Contact section and footer. None was in your documents, so none is shown.
- Add director or team profiles only with the owners' consent. Personal details in the CAC documents (birth dates, home addresses, personal emails, phone numbers) were deliberately left off.
- The services list follows the objects in the Memorandum of Association. Before advertising regulated activities (oil and gas operations, petroleum products marketing, haulage), confirm you hold the licences and registrations those need, and adjust the wording to match.
- Add real projects, clients and certifications only when you have them. The site makes no such claims yet.
- The enquiry form opens the visitor's email app. For a form that delivers straight to your inbox, create a free Formspree form and replace the submit handler in `main.js` with a normal `action` and `method="post"` on the form.
