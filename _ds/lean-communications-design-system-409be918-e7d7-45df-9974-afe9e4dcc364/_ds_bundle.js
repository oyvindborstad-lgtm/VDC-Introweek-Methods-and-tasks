/* @ds-bundle: {"format":3,"namespace":"LeanCommunicationsDesignSystem_409be9","components":[],"sourceHashes":{"ui_kits/website/ContactCard.jsx":"9f6df9e2303b","ui_kits/website/CourseCard.jsx":"3cfdac21fba9","ui_kits/website/Footer.jsx":"3d11bb568500","ui_kits/website/Header.jsx":"514400bfef94","ui_kits/website/Hero.jsx":"fe721fc5f54c","ui_kits/website/StatBlock.jsx":"b8d182305a12"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LeanCommunicationsDesignSystem_409be9 = window.LeanCommunicationsDesignSystem_409be9 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/website/ContactCard.jsx
try { (() => {
function ContactCard({
  person
}) {
  const initials = person.name.split(' ').map(n => n[0]).slice(0, 2).join('');
  return /*#__PURE__*/React.createElement("div", {
    className: "lc-contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lc-contact__avatar",
    style: {
      background: person.tone || 'var(--lean-blue-20)'
    }
  }, /*#__PURE__*/React.createElement("span", null, initials)), /*#__PURE__*/React.createElement("div", {
    className: "lc-contact__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lc-contact__name"
  }, person.name), /*#__PURE__*/React.createElement("div", {
    className: "lc-contact__role"
  }, person.role), /*#__PURE__*/React.createElement("div", {
    className: "lc-contact__phone"
  }, person.phone), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--primary btn--sm"
  }, "Book m\xF8te")));
}
window.ContactCard = ContactCard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ContactCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/CourseCard.jsx
try { (() => {
function CourseCard({
  course,
  onOpen,
  featured
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: 'lc-course' + (featured ? ' lc-course--featured' : ''),
    onClick: () => onOpen(course)
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, course.eyebrow), /*#__PURE__*/React.createElement("h3", {
    className: "lc-course__title"
  }, course.title), /*#__PURE__*/React.createElement("p", {
    className: "lc-course__body"
  }, course.body), /*#__PURE__*/React.createElement("div", {
    className: "lc-course__meta"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "clock"
  }), " ", course.duration), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "users"
  }), " ", course.mode)), /*#__PURE__*/React.createElement("div", {
    className: "lc-course__link"
  }, "Les mer ", /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-right"
  })));
}
window.CourseCard = CourseCard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/CourseCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "lc-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lc-footer__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lc-footer__col"
  }, /*#__PURE__*/React.createElement("img", {
    className: "lc-footer__logo",
    src: "../../assets/logo-mark.png",
    alt: "Lean Communications"
  }), /*#__PURE__*/React.createElement("p", {
    className: "lc-footer__tag"
  }, "Norges ledende leverand\xF8r av Lean- og VDC-tjenester for bygg- og anleggsbransjen.")), /*#__PURE__*/React.createElement("div", {
    className: "lc-footer__col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lc-footer__heading"
  }, "Oslo-kontor"), /*#__PURE__*/React.createElement("p", null, "c/o Collektivet", /*#__PURE__*/React.createElement("br", null), "Ulvenveien 82E", /*#__PURE__*/React.createElement("br", null), "0581 Oslo")), /*#__PURE__*/React.createElement("div", {
    className: "lc-footer__col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lc-footer__heading"
  }, "Bergen-kontor"), /*#__PURE__*/React.createElement("p", null, "Litle\xE5svegen 53", /*#__PURE__*/React.createElement("br", null), "5132 Nyborg")), /*#__PURE__*/React.createElement("div", {
    className: "lc-footer__col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lc-footer__heading"
  }, "Kontakt"), /*#__PURE__*/React.createElement("p", null, "post@leancommunications.no", /*#__PURE__*/React.createElement("br", null), "Org.nr. 928 708 500"))), /*#__PURE__*/React.createElement("div", {
    className: "lc-footer__base"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 ", new Date().getFullYear(), " Lean Communications AS"), /*#__PURE__*/React.createElement("span", null, "leancommunications.no")));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
function Header({
  onNav,
  active
}) {
  const links = [{
    id: 'home',
    label: 'Forside'
  }, {
    id: 'kurs',
    label: 'Kurs'
  }, {
    id: 'tjenester',
    label: 'Tjenester'
  }, {
    id: 'hva-er-lean',
    label: 'Hva er Lean?'
  }, {
    id: 'om-oss',
    label: 'Om oss'
  }, {
    id: 'kontakt',
    label: 'Kontakt'
  }];
  return /*#__PURE__*/React.createElement("header", {
    className: "lc-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lc-header__inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "lc-header__logo",
    onClick: () => onNav('home')
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-primary.png",
    alt: "Lean Communications"
  })), /*#__PURE__*/React.createElement("nav", {
    className: "lc-header__nav"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    className: 'lc-navlink' + (active === l.id ? ' is-active' : ''),
    onClick: () => onNav(l.id)
  }, l.label))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--primary",
    onClick: () => onNav('kontakt')
  }, "Book m\xF8te")));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
function Hero({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "lc-hero lc-hero--warm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lc-hero__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lc-eyebrow-rule"
  }, "Lean & VDC \xB7 Bygg og anlegg"), /*#__PURE__*/React.createElement("h1", {
    className: "lc-bigtype",
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "lc-bigtype__line lc-bigtype__line--solid"
  }, "Bygg"), /*#__PURE__*/React.createElement("span", {
    className: "lc-bigtype__line lc-bigtype__line--italic"
  }, "bedre,"), /*#__PURE__*/React.createElement("span", {
    className: "lc-bigtype__line lc-bigtype__line--outline"
  }, "sammen.")), /*#__PURE__*/React.createElement("p", {
    className: "lc-hero__lead"
  }, "De beste prosjektene skapes n\xE5r folk forst\xE5r og mestrer VDC og Lean. Vi er Norges st\xF8rste akt\xF8r innen oppl\xE6ring og prosjektst\xF8tte \u2014 og samarbeider med NTNU."), /*#__PURE__*/React.createElement("div", {
    className: "lc-hero__cta"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn--primary",
    onClick: () => onNav('kurs')
  }, "Se v\xE5re kurs ", /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-right"
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--ghost",
    onClick: () => onNav('hva-er-lean')
  }, "Pr\xF8v metoden"))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/StatBlock.jsx
try { (() => {
function StatBlock() {
  const stats = [{
    num: '17 500',
    label: 'Sertifiserte i Lean siden 2009'
  }, {
    num: '900+',
    label: 'Bedrifter vi har jobbet med'
  }, {
    num: '2 kontorer',
    label: 'Oslo og Bergen'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "lc-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lc-stats__inner"
  }, stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "lc-stat",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "lc-stat__num"
  }, s.num), /*#__PURE__*/React.createElement("div", {
    className: "lc-stat__lbl"
  }, s.label)))));
}
window.StatBlock = StatBlock;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/StatBlock.jsx", error: String((e && e.message) || e) }); }

})();
