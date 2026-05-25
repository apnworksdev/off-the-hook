import { c as createComponent } from './astro-component_DwRfR3My.mjs';
import 'piccolore';
import { j as addAttribute, o as renderTemplate, n as renderSlot, l as renderHead, r as renderComponent, m as maybeRenderHead } from './ssr-function_cSCL6eLw.mjs';
import 'clsx';

const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = "OTH",
    description = "Off the hook",
    image,
    noindex = false
  } = Astro2.props;
  const canonical = Astro2.site ? new URL(Astro2.url.pathname, Astro2.site).toString() : Astro2.url.toString();
  const ogImage = image && Astro2.site ? new URL(image, Astro2.site).toString() : image;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonical, "href")}><!-- <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
    <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" /> -->${noindex && renderTemplate`<meta name="robots" content="noindex,nofollow">`}<meta property="og:type" content="website"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:url"${addAttribute(canonical, "content")}>${ogImage && renderTemplate`<meta property="og:image"${addAttribute(ogImage, "content")}>`}<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}>${ogImage && renderTemplate`<meta name="twitter:image"${addAttribute(ogImage, "content")}>`}${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/chris/Desktop/SERVERS/OFF_THE_HOOK/OFF_THE_HOOK_DEV/src/layouts/BaseLayout.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "OTH", "description": "Off the hook" }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", '<div class="home-background"> ', ' </div> <main class="content"> <div class="oth-container"> <img class="oth-img oth-logo" data-poster="desktop" src="/images/oth_logo.webp" alt="" loading="eager" decoding="async"> <img class="oth-img oth-skepta" data-poster="desktop" src="/images/oth_skepta.webp" alt="" loading="eager" decoding="async"> </div> </main> <script src="/scripts/autoplay-video.js" defer><\/script> '])), maybeRenderHead(), renderComponent($$result2, "autoplay-video", "autoplay-video", { "class": "bg-media" }, { "default": () => renderTemplate` <img class="bg-poster" data-poster="desktop" src="/images/oth_poster.webp" alt="" loading="eager" decoding="async"> <video class="bg-video" data-video="desktop" muted loop playsinline preload="metadata" aria-hidden="true"> <source data-src="/videos/oth_video.mp4" type="video/mp4"> </video> ` })) })}`;
}, "/Users/chris/Desktop/SERVERS/OFF_THE_HOOK/OFF_THE_HOOK_DEV/src/pages/index.astro", void 0);

const $$file = "/Users/chris/Desktop/SERVERS/OFF_THE_HOOK/OFF_THE_HOOK_DEV/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
