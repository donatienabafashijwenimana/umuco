# Umuco Wacu

Isomero ry'ikoranabuhanga ry'umuco n'ubuvanganzo nyarwanda. Urubuga rukusanyiriza
hamwe imigani migufi, ibisakuzo, ikeshamvugo n'insigamigani mu buryo bworoshye
gushakisha no gusoma.

## Ibyo urubuga rufite

| Icyiciro | Umubare | Inkomoko |
| --- | --- | --- |
| Imigani migufi n'imigenurano | 1,134 | `public/document/imigani-migufi.xlsx` |
| Ibisakuzo | 147 | `public/document/ibisakuzo.xlsx` |
| Ikeshamvugo | 69 (ibice 4) | `public/document/ikeshamvugo/*.xlsx` |
| Insigamigani | 100 (imigani yuzuye) | `public/document/insigamigani/INSIGAMIGANI.pdf` |
| Inkuru ndende | 4 (zitegurwa) | `src/pages/imigani-miremire.jsx` |

Ibintu byose bishobora gushakishwa; insigamigani zishakishwa mu mibiri yose
y'amagambo, hakaba n'umubare w'iminota yo gusoma.

## Ikoranabuhanga

- React 19 + Vite 7
- Tailwind CSS v4 (binyuze kuri `@tailwindcss/vite`)
- `lucide-react` ku mbago
- `xlsx` ku gusoma ama faili ya Excel (ipakiwe ukwayo, ntibuhira urubuga)
- `pdfjs-dist` (dev only) mu gukura amagambo mu PDF

## Gutangira

```bash
npm install
npm start      # urubuga kuri http://localhost:5173
npm run build  # kubaka `dist/`
npm run lint
npm run preview
```

## Gutunganya inyandiko z'Insigamigani

JSON ikoreshwa n'urubuga (`public/document/insigamigani/insigamigani.json`)
ikorwa ikuwe mu PDF:

```bash
npm run data:insigamigani
```

Iyi script:

1. isoma urutonde rw'imigani (TOC) mu ntangiriro ya PDF;
2. ihuriza hamwe umutwe wa buri mugani n'umubare wawo;
3. ikuraho imirongo y'imitwe y'impapuro n'imibare y'impapuro;
4. itandukanya ibice by'inyandiko ukurikije umwanya uri hagati y'imirongo;
5. yandika `{ source, intro, stories: [{ number, title, paragraphs }] }`.

Niba PDF yahindutse, subira gukora iyi script hanyuma urebe ko umubare
w'imigani ari 100.

## Imiterere y'ububiko

```
public/document/          Inkomoko: Excel na PDF
scripts/                  Gukura amagambo mu PDF
src/
  components/             PageHeader, SearchField, States, Highlight
  hooks/                  useSheets, useJson, useHashPage
  pages/                  Buri gice cy'urubuga
  homepage.jsx            Ikiranga: header, navigation, footer
  navigation.jsx          Urutonde rw'ibice n'amabara yabyo
  index.css              Tailwind theme n'imiterere y'ibanze
```

## Ibyo utakibona

- **Inkuru ndende**: 4 gusa zanditse mu code, ntizirasomwa. Zitezwe gusubirwamo
  mu buryo bwuzuye.
- **Amafoto**: `public/pic*.png` ni amafoto ya kera y'u Rwanda akoreshwa muri
  galari yo ku rupapuro rw'ahabanza.
- **Inkomoko y'amakuru**: nta makuru mashya yongewe ku yandi; ibiri ku rubuga
  biva mu byanditswe byatanzwe.

## Uruhushya

Amakuru y'umuco n'ubuvanganzo ni umurage rusange w'Abanyarwanda. PDF
`INSIGAMIGANI.pdf` ni inkomoko y'umwimerere: utegereje uruhushya rw'abayanditse
mbere yo kongera gukoresha ibiri muri yo ahandi.
