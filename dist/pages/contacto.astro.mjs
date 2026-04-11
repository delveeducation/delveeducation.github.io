import { c as createComponent, r as renderHead, a as renderScript, b as renderTemplate } from '../chunks/astro/server_CAN_r-tG.mjs';
import 'piccolore';
import 'html-escaper';
import 'clsx';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Contacto = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`<html lang="es" data-astro-cid-2mxdoeuz> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Delve Educación | DeepTech</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-2mxdoeuz> <nav data-astro-cid-2mxdoeuz> <div class="logo" data-astro-cid-2mxdoeuz> <a href="/" data-astro-cid-2mxdoeuz><img src="/assets/logo.png" data-astro-cid-2mxdoeuz></a> </div> <ul id="nav-links" data-astro-cid-2mxdoeuz> <li data-astro-cid-2mxdoeuz><a href="/cursos" data-astro-cid-2mxdoeuz>Cursos</a></li> <li data-astro-cid-2mxdoeuz><a href="/nosotros" data-astro-cid-2mxdoeuz>Nosotros</a></li> <li data-astro-cid-2mxdoeuz><a href="/contacto" data-astro-cid-2mxdoeuz>Contacto</a></li> <li data-astro-cid-2mxdoeuz><a href="https://forms.gle/fknvV9x2rLHyrF4N7" target="_blank" class="nav-btn" data-astro-cid-2mxdoeuz>Inscribirme</a></li> </ul> <div class="hamburger" id="hamburger" data-astro-cid-2mxdoeuz> <span data-astro-cid-2mxdoeuz></span> <span data-astro-cid-2mxdoeuz></span> <span data-astro-cid-2mxdoeuz></span> </div> </nav> <div class="container" data-astro-cid-2mxdoeuz> <div class="founder" data-astro-cid-2mxdoeuz> <div class="founder-text" data-astro-cid-2mxdoeuz> <h2 data-astro-cid-2mxdoeuz>Contáctanos</h2> <p data-astro-cid-2mxdoeuz>
Puedes enviarnos un mensaje para conocer más sobre
                        nuestras iniciativas, explorar oportunidades de
                        colaboración o resolver cualquier duda sobre nuestros
                        programas y servicios.
</p> <a href="https://api.whatsapp.com/send/?phone=59178853748&text=Hola+quiero+mas+informacion+de+los+cursos&type=phone_number&app_absent=0" target="_blank" class="btn" data-astro-cid-2mxdoeuz>Enviar WhatsApp</a> </div> <div class="founder-image" data-astro-cid-2mxdoeuz> <img src="/assets/contacto_delve.png" alt="Acceso Founder Delve" style="max-width: 65%; height: auto;" data-astro-cid-2mxdoeuz> </div> </div> <footer data-astro-cid-2mxdoeuz> <div class="accelerated" data-astro-cid-2mxdoeuz> <p class="accelerated-text" data-astro-cid-2mxdoeuz>Acelerados por:</p> <img src="/aceleratec.svg" alt="Aceleradora" class="accelerated-logo" data-astro-cid-2mxdoeuz> </div> <div class="social-icons" data-astro-cid-2mxdoeuz> <a href="https://facebook.com" target="_blank" data-astro-cid-2mxdoeuz> <img src="/facebook.webp" alt="Facebook" data-astro-cid-2mxdoeuz> </a> <a href="https://instagram.com" target="_blank" data-astro-cid-2mxdoeuz> <img src="/instagram.webp" alt="Instagram" data-astro-cid-2mxdoeuz> </a> <a href="https://tiktok.com" target="_blank" data-astro-cid-2mxdoeuz> <img src="/tiktok.webp" alt="TikTok" data-astro-cid-2mxdoeuz> </a> <a href="https://linkedin.com" target="_blank" data-astro-cid-2mxdoeuz> <img src="/linkedin.webp" alt="LinkedIn" data-astro-cid-2mxdoeuz> </a> </div> <p style="text-align: center;" data-astro-cid-2mxdoeuz>© ${year} Delve Educación</p> </footer> ${renderScript($$result, "/Users/fernando/Documents/astro/delveeducation/src/pages/contacto.astro?astro&type=script&index=0&lang.ts")} </div> </body> </html>`;
}, "/Users/fernando/Documents/astro/delveeducation/src/pages/contacto.astro", void 0);

const $$file = "/Users/fernando/Documents/astro/delveeducation/src/pages/contacto.astro";
const $$url = "/contacto";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Contacto,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
