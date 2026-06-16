# Lean Communications — Design System

> Norges ledende leverandør av Lean- og VDC-tjenester for bygg- og anleggsbransjen.
> (Norway's leading provider of Lean and VDC services for the construction industry.)

---

## About the company

**Lean Communications AS** is a Norwegian consultancy founded in 2009 and re-registered in its current legal form in 2022. They are Norway's largest provider of Lean and **VDC** (Virtual Design and Construction) training and advisory, working almost exclusively with the building and construction sector (BA-bransjen). Since inception they have worked with 900+ companies and certified 17,500+ people in Lean methodology.

Core offerings:

- **Courses & certification** (Lean, VDC, PPM — Prosjektering)
- **On-site project support** — embedded consultants helping real construction projects implement Lean/VDC from day one
- **Public speaking / foredrag** on Lean and VDC
- **Free introductory video courses** (~30 min) with a downloadable diplom
- **Downloadable templates** for Lean tools: A3, Fiskebeinsdiagram (fishbone), Prioriteringsvinduet, Lean ordliste, etc.

They are not "typical consultants" — staff are former line managers ("tidligere linjeledere") who work equally well in the boardroom and on the construction site. The voice is practical, rooted in real construction experience, and focused on involving people at every level of the organisation.

Offices in Oslo (Ulvenveien 82E / Standardveien 1) and Bergen (Litleåsvegen 53). Partnerships with NTNU.

## Products represented

This design system covers the public-facing brand at **leancommunications.no** — a marketing/course-discovery website in Norwegian. There is no public mobile app or separate product UI shipped by the company, so this system focuses on:

1. **Marketing website** (leancommunications.no) — primary surface
2. **Course materials & brochures** — printed and PDF
3. **Slide decks & keynote visuals** — for foredrag / presentations
4. **Social media / LinkedIn** visuals

---

## Sources

- **Logos (uploads/):** `leanC_logo_2014.png`, `leanC_logo_2014_hvittekst.png`, `leanC_logo_2014 -svart hvitt.png`
- **Design manual (uploads/):** `LEAN_profilmanual ny profil 2014.pdf` — 9-page official profile guide (2014). Parsed text saved at `uploads/profilmanual-text.txt`. This is the **primary source of truth** for colors, type, logo usage, and graphic elements.
- **Live website:** https://www.leancommunications.no (fetched via search; summary of content only — no codebase or Figma was provided)
- No codebase, Figma or component library was supplied. UI kit components are reconstructed from the website's described content + design manual.

---

## Index — what's in this system

```
/
├── README.md                     ← you are here
├── SKILL.md                      ← Claude Skill manifest
├── colors_and_type.css           ← CSS tokens (vars + semantic classes)
├── assets/
│   ├── logo-primary.png          ← full color, blue + green on light
│   ├── logo-mark.png             ← wheel mark only, white text variant
│   └── logo-mono.png             ← black + grey mono
├── fonts/                        ← (intentionally empty — see Type below)
├── preview/                      ← design-system tab cards
│   ├── 01-logo.html
│   ├── 02-colors-primary.html
│   ├── 03-colors-secondary.html
│   ├── 04-color-tints.html
│   ├── 05-type-display.html
│   ├── 06-type-body.html
│   ├── 07-type-scale.html
│   ├── 08-spacing.html
│   ├── 09-radii-shadow.html
│   ├── 10-buttons.html
│   ├── 11-form.html
│   ├── 12-cards.html
│   ├── 13-graphic-elements.html
│   ├── 14-big-number.html
│   └── 15-iconography.html
├── ui_kits/
│   └── website/
│       ├── index.html            ← click-through of the marketing site
│       ├── README.md
│       ├── Header.jsx
│       ├── Hero.jsx
│       ├── CourseCard.jsx
│       ├── StatBlock.jsx
│       ├── ContactCard.jsx
│       └── Footer.jsx
└── uploads/                      ← original source files (do not ship)
```

---

## CONTENT FUNDAMENTALS

### Language

**Primary language is Norwegian Bokmål.** Every customer-facing surface (website, courses, brochures, decks) is Norwegian. English is only used for international or academic contexts. When writing for this brand, default to Norwegian unless explicitly told otherwise.

### Voice & tone

**Practical-expert, grounded, collective.** The brand speaks as "Vi" (we) — a team of experienced practitioners, not distant consultants. It refers to the reader as "du" / "deg" (informal you) — Norwegian business norm, friendly-but-professional. Tone is confident without being boastful, and always ties abstractions back to concrete construction-industry reality.

Representative sentences (real copy from the site):

> "Vi er Norges største aktør for opplæring innen Lean og VDC til bygg- og anleggsbransjen, og samarbeider med NTNU."
>
> "De beste prosjektene og virksomhetene skapes når folk forstår og mestrer VDC og Lean."
>
> "Mesteparten av vår tid går til å hjelpe prosjekter med å implementere Lean og VDC i praksis. Resten bruker vi på kurs, opplæring og egen utvikling – alltid med mål om kontinuerlig forbedring."
>
> "I Lean Communications AS jobber det ikke typiske konsulenter, men tidligere linjeledere som forstås like godt i styrerommet som «på gulvet»."

Key tone markers to emulate:
- **We / Vi first** — credit the collective method, not individual stars.
- **Concrete over abstract** — "på gulvet" (on the floor), "milepælbasert styring" (milestone-based management), never vague buzzwords.
- **Involvement language** — "involvering", "medarbeiderne i sentrum", "alle ledd i organisasjonen". Involving people is the brand's worldview.
- **Kontinuerlig forbedring** (continuous improvement) — used genuinely, not as a tagline.

### Casing

- **Body copy:** sentence case, standard Norwegian punctuation. Use `«guillemets»` for quotations, not `"straight quotes"`.
- **Headings (H1/H2/H3):** UPPERCASE. This is explicit in the design manual and matches the logo's LEAN wordmark.
- **Eyebrow labels / callouts:** UPPERCASE with wide letter-spacing (see `.eyebrow`).
- **Button labels:** can be sentence case *or* uppercase — uppercase for primary CTAs that echo the LEAN wordmark rhythm ("BOOK MØTE", "LES MER"), sentence case for softer inline actions.

### Person / pronouns

- **Vi / oss** when speaking as the company.
- **Du / deg / din** when addressing the reader — informal even in B2B.
- Avoid passive constructions. "Vi hjelper deg" beats "Det tilbys hjelp".

### Emoji, ornaments, icons

- **No emoji.** Not in copy, not as UI decoration, not in bullet lists. The brand is construction-industry professional — emoji reads as unserious.
- **No decorative unicode** (✓ ★ → etc.) in body copy. Use dedicated icons or the dashed brand line instead.
- **Exception:** simple bullet characters (•) and en/em dashes are fine.

### Numbers & data

Numbers are part of the brand. The manual literally shows a giant **"70 MILLIONER"** treatment as a graphic device. When a number tells a story (17.500 sertifiserte, 900 bedrifter, 2009 stiftet), set it BIG in `--lean-green` using the display font. Use **Norwegian formatting**: `17 500` or `17.500` for thousands, `1,5` for decimals, `kr` for currency.

### Vibe

Practical. Rooted. Slightly understated. This is a brand that helps a contractor run a better site meeting — not a startup promising to disrupt anything. Avoid hype, superlatives, and AI-era marketing tropes.

---

## VISUAL FOUNDATIONS

### Colors

Primary palette is deliberately small: **one deep blue + one punchy green** on white. All other colors are tints of those two, plus three supporting secondaries used sparingly. The full token set lives in `colors_and_type.css`.

| Token | Hex | PMS | Role |
|---|---|---|---|
| `--lean-blue` | `#002A3A` | 303 U | Primary ink, headings, dark surfaces |
| `--lean-green` | `#78BE20` | 368 U | Accent, highlights, CTAs, big numbers |
| `--lean-teal` | `#33A6B1` | – | Secondary — links, diagrams |
| `--lean-lime` | `#CDD751` | – | Secondary — infographic fills |
| `--lean-red` | `#E4022D` | – | Alert / attention — very sparingly |

Tints of the primary blue and green are available at 80/60/40/20% (straight from the manual) as `--lean-blue-80` through `--lean-blue-20` and the green equivalents. Use tints for backgrounds, borders, and typographic hierarchy rather than introducing new hues.

**Note on the manual's page 5:** the listed hex `#196573` under "primærfarger" does not match its own RGB 134/205/0 (which resolves to the green `#86CD00`/`#78BE20` family). The PMS references (303 U and 368 U) are the reliable anchors and are what we've encoded.

### Type

**Display / headlines:** **Barlow Semi Condensed** — served locally from `/fonts` with the full weight range (100–900, roman + italic). This is now the canonical display face for the brand across all digital surfaces. Use 900 Black for hero headlines, 700 Bold for H2/H3, 600 SemiBold for eyebrows, and the italic variants for the signature mixed-style headline.

**Body / internal:** **Jost** (Google Fonts) — still used as a stand-in for Century Gothic on body copy and UI. Replace with the licensed Century Gothic when available.

> **Historical note:** the 2014 profile manual specifies Gotham Narrow (external, licensed) and Century Gothic (internal). We've settled on Barlow Semi Condensed as the production display face — structurally a condensed geometric sans in the same family, with full weight coverage and a licensed local install.

### Spacing

4-based scale: `--s-1` (4px) → `--s-9` (96px). No fractional steps. Layouts breathe — the brand manual's sample brochure leans on generous side margins and lots of white.

### Backgrounds

- **White paper is default.** Most surfaces are plain white.
- **Dark blue backgrounds** (`--bg-dark`) carry hero statements, CTAs, or footer.
- **Green is an accent background**, not a surface for long reading — buttons, pull-quote panels, single callouts only.
- **No gradients**, no photographic overlays, no glassmorphism. The brand is flat graphic, consistent with its 2014-established manual.
- **Watermark wheel:** the LEAN wheel (three gear-rings from the logo) may appear oversized and faded (~8-15% opacity) as a watermark on brochures. This is the only "decorative" background pattern the manual sanctions.

### Animation

Understated. This is a corporate brand, not a consumer app.

- **Durations:** 120ms (hover), 220ms (default), 360ms (page-level).
- **Easing:** `cubic-bezier(.2,.6,.2,1)` — snappy out.
- **Fades and short translates** only. No bounces, no springy overshoot, no parallax.
- Large motion is reserved for the LEAN wheel — if animated, it rotates slowly (20s+ linear) like machinery, never spins.

### Hover states

- **Text links:** color shift from `--lean-teal` → `--lean-blue`.
- **Primary button (green):** darken green by ~8% + subtle lift (`--shadow-2`).
- **Dark button (blue):** lift to `--lean-blue-80` (lighter).
- **Cards:** border darkens from `--rule` → `--rule-strong`, no scale.

### Press / active states

- Subtle **1-2px translateY(1px)** — like a physical key. No shrink, no flash.
- Keep color locked during press; do not over-saturate.

### Focus

Accessibility-first: 3px outer glow in `rgba(120,190,32,.35)` (`--shadow-focus`). Never remove focus rings.

### Borders

- **Hairline** (`1px solid var(--rule)`) for cards and dividers.
- **Brand dashed line** (`.lean-dash`) — 2px blue dashes, from the manual's "LEAN stiplet linje". This is a signature element: use it as a section divider, inline rule, or around callouts. Color can vary (blue/green) and dot size can vary, per manual.

### Shadows / elevation

Flat-first. Three levels only:
- `--shadow-1` — cards at rest (barely there)
- `--shadow-2` — cards on hover
- `--shadow-3` — overlays / modals

Shadows are always tinted with the brand blue (`rgba(0,42,58,…)`), never pure black.

### Corner radii

Nearly square. `--r-2: 4px` is default for cards and inputs. `--r-pill` is for the rare tag/chip. `--r-full` is reserved for the LEAN wheel and circular profile photos. **Do not introduce 12px+ radii** — it fights the squared, industrial feel of the manual.

### Cards

- White background, 1px `--rule` border, `--r-2` (4px) radius, `--shadow-1` at rest.
- Hover lifts to `--shadow-2` and border darkens to `--rule-strong`.
- Optional **top or left accent stripe in `--lean-green`** for featured items — this is a real brand pattern (manual page 7 brochure shows green vertical rules separating columns).

### Transparency & blur

- Transparency is used for the **watermark wheel** (~10%) and for subtle overlays on photos (dark-blue 60-70% for text legibility on imagery).
- **No backdrop-filter blur.** Not in the 2014 manual, not appropriate for this brand era.

### Signature display headline

The brand has a **signature multi-line display treatment** — mixed styles stacked tight on a warm paper background. Three class modifiers on `.lc-bigtype__line`:

- `--solid` — LEAN blue, regular 900 weight
- `--italic` — LEAN green, italic + expanded, slightly translated right
- `--outline` — transparent fill with 2px blue stroke

Paired with `.lc-eyebrow-rule` (short green bar + uppercase label). Use this on hero, section openers, or pull-quote plates. Sits on `--paper-warm` (#EAE6DE) by default — this warm newsprint is now a core brand surface, alongside white.

### Imagery

The manual doesn't ship photography, but the website and social visuals lean toward:
- **Construction-site documentary photography** — real workers, real sites, warm natural light.
- **Workshop / course photography** — people around a planning board with post-its (Lean planning boards are literally the product).
- **Color treatment:** natural, slightly warm, never desaturated or b&w. Not cold or clinical.
- **Overlay rule:** if text sits on a photo, it goes over a `rgba(0,42,58,.65)` wash of `--lean-blue`.

### Layout rules

- **Fixed header** on website (white with 1px rule bottom).
- **Max content width** ~1200px; full-bleed only for hero and dark-blue CTA bands.
- **Gutters:** generous — 24-32px inside cards, 48-96px between sections.
- **Grid:** 12-col for web, 4-col for brochures (as seen in manual page 7).

### Signature graphic elements (from manual pages 6-7)

1. **LEAN hjulet (the wheel)** — the three concentric broken rings from the logo, used as:
   - Flat-color graphic anchor
   - Oversized watermark (~10% opacity)
   - Frame for a statistic or word inside the center
2. **LEAN stiplet linje** — the dashed line, used as divider or framing element.
3. **LEAN sirkel** — plain circles (outline or filled) used in infographics, around numbers, or holding icons.
4. **Big numbers** — `--fs-hero` in green for standout statistics (manual shows "70 MILLIONER").
5. **Pull-quote plates** — uppercase display text on a light blue-tint background (manual page 7: "HVIS DU ØNSKER ET ANNET RESULTAT MÅ DU ENDRE MÅTEN DU ARBEIDER PÅ").

---

## ICONOGRAPHY

The profile manual does **not** specify an icon system, and the website does not ship a proprietary icon font. This means: **no native Lean Communications icon set exists.** We fill the gap with a flagged substitution.

### Substitution (flagged)

We use **Lucide** (https://lucide.dev) via CDN:
- Open-source (ISC license), widely trusted.
- **Stroke-based, 2px weight** — matches the clean geometric rhythm of Barlow/Gotham Narrow.
- Outline style only — no filled variants, no duotone. This matches the "flat, graphic, squared" vibe of the LEAN manual.

Usage:

```html
<!-- in <head> -->
<script src="https://unpkg.com/lucide@latest"></script>

<!-- in page -->
<i data-lucide="check-circle" style="width:20px;height:20px;color:var(--lean-green)"></i>
<script>lucide.createIcons();</script>
```

Default icon sizes: `16px` (inline), `20px` (UI), `24px` (card), `48px` (feature).

Default icon color: inherits `currentColor`. In practice that means `--lean-blue` on light surfaces and `--lean-green` for affirmative/positive states.

### What NOT to use

- **No emoji** — see Content Fundamentals.
- **No filled / glyph-heavy** icon sets (Material Filled, Font Awesome Solid). They fight the brand's line weight.
- **No hand-drawn SVGs.** We copy from Lucide; we do not invent icons inline.

### Native brand marks

The only icon-like asset that IS proprietary to the brand is the **LEAN wheel mark** (`assets/logo-mark.png`). Use it as an icon only at logo-mark sizes (32px+). Don't embed it inline at 16px — it becomes mud.

---

## UI kits

- **`ui_kits/website/`** — marketing website recreation. Includes header, hero, course cards, stats block, contact card, footer. See the kit's own README for component inventory.

No separate mobile app or product UI is shipped by Lean Communications, so only one UI kit exists.

---

## Caveats

- **No codebase or Figma was provided.** Component fidelity is inferred from the design manual + website copy. Expect small mismatches with what the live site currently renders.
- **Licensed fonts substituted.** Gotham Narrow → Barlow Semi Condensed; Century Gothic → Jost. Swap in the real files when available.
- **The manual's page-5 primary hex `#196573` is mislabelled** (its RGB doesn't match its hex). We've encoded the PMS-verified values (`#002A3A` blue, `#78BE20` green) as source of truth.
- **Imagery not included.** Full-bleed hero photos should come from Lean Communications' own library (construction-site documentary). The system defines the treatment; the assets need user upload.
