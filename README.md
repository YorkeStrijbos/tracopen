# Tracopen website

Statische website van Tracopen: China sourcing zonder omwegen.

## Structuur

```
index.html          Home: video-hero, statement, pijlers, klantenstrook, waarom Tracopen
diensten.html       Diensten: donkere hero met pijler-index, alle diensten, werkwijze + wereldkaart
portfolio.html      Portfolio: projecten, branches en klantlogo's
over-ons.html       Over ons: foto-hero, verhaal + kantoren, team-spotlight
                    (Elke pagina eindigt met hetzelfde contactblok)
css/style.css       Styling voor alle pagina's: kleuren, typografie, layout
js/site.js          Gedeeld: menu, header, titelanimatie, zwevend beeldmerk, reveal
js/quiz.js          "Vrijblijvend sparren": vragenlijst van 5 vragen (vragen bovenaan het bestand).
                    Elke knop met data-open-quiz opent hem; link pagina.html#vragen opent hem direct.
js/components.js    Alle onderdelen + inhoud: pijlers, diensten, USP's, team, wereldkaart,
                    projecten en klanten. Alle lijsten staan bovenaan.
js/home.js          Homepage: video-hero (Vimeo) en popup
js/portfolio.js     Portfolio: kaarten met kanteling, branche-filter en logowand
assets/icons.svg    Iconen (Lucide), gebruikt als <use href="assets/icons.svg#i-naam">
assets/img/         Foto's (pijlers, portfolio)
assets/logos/       Klantlogo's (svg/png), gekoppeld via CLIENTS in js/components.js
```

## Lokaal draaien

De iconen worden uit `assets/icons.svg` geladen, dus open de site via een lokale server (niet door `index.html` dubbel te klikken):

- **VS Code:** installeer de aanbevolen extensie *Live Server* en klik rechtsonder op **Go Live**, of
- **Terminal:** `python3 -m http.server 8765` en ga naar http://localhost:8765

## Inhoud aanpassen

- Teksten van secties: `index.html`
- Diensten, USP's, teamleden, kaartbestemmingen, projecten en klanten: de lijsten bovenaan `js/components.js`
- Hero-video: `VIDEO` bovenaan `js/home.js`
- Vragenlijst (vragen, antwoorden, ontvangend e-mailadres): `QUIZ` bovenaan `js/quiz.js`
- Menu of footer aanpassen: dat staat in elke HTML-pagina, dus pas het op alle pagina's aan
- Portfolio-projecten, branches en klanten: ook in `js/components.js`
- Nieuwe pagina: kopieer `portfolio.html`, laad `js/site.js` en eventueel een eigen script
- Kleuren: de variabelen onder `:root` in `css/style.css`

## Publiceren

Werkt op elke statische host zonder build-stap (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

## Preview voor de klant

De site staat als preview op GitHub Pages: **https://yorkestrijbos.github.io/tracopen/**

- Bijwerken: commit en push naar `main`, GitHub Pages werkt de site binnen ± een minuut bij.
- De preview is niet vindbaar in Google: elke pagina heeft `<meta name="robots" content="noindex, nofollow">` en `robots.txt` blokkeert alles.

**Bij de echte livegang:** verwijder de `noindex`-regel uit alle HTML-pagina's en zet in `robots.txt` `Allow: /`.
