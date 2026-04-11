import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, e as decodeKey } from './chunks/astro/server_CAN_r-tG.mjs';
import 'es-module-lexer';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/fernando/Documents/astro/delveeducation/","cacheDir":"file:///Users/fernando/Documents/astro/delveeducation/node_modules/.astro/","outDir":"file:///Users/fernando/Documents/astro/delveeducation/dist/","srcDir":"file:///Users/fernando/Documents/astro/delveeducation/src/","publicDir":"file:///Users/fernando/Documents/astro/delveeducation/public/","buildClientDir":"file:///Users/fernando/Documents/astro/delveeducation/dist/client/","buildServerDir":"file:///Users/fernando/Documents/astro/delveeducation/dist/server/","adapterName":"","routes":[{"file":"file:///Users/fernando/Documents/astro/delveeducation/dist/aed/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/aed","isIndex":false,"type":"page","pattern":"^\\/aed\\/?$","segments":[[{"content":"aed","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/aed.astro","pathname":"/aed","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/fernando/Documents/astro/delveeducation/dist/cai/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cai","isIndex":false,"type":"page","pattern":"^\\/cai\\/?$","segments":[[{"content":"cai","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cai.astro","pathname":"/cai","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/fernando/Documents/astro/delveeducation/dist/contacto/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contacto","isIndex":false,"type":"page","pattern":"^\\/contacto\\/?$","segments":[[{"content":"contacto","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contacto.astro","pathname":"/contacto","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/fernando/Documents/astro/delveeducation/dist/copiacursos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/copiacursos","isIndex":false,"type":"page","pattern":"^\\/copiacursos\\/?$","segments":[[{"content":"copiacursos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/copiacursos.astro","pathname":"/copiacursos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/fernando/Documents/astro/delveeducation/dist/cursos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cursos","isIndex":false,"type":"page","pattern":"^\\/cursos\\/?$","segments":[[{"content":"cursos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cursos.astro","pathname":"/cursos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/fernando/Documents/astro/delveeducation/dist/dlxcv/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/dlxcv","isIndex":false,"type":"page","pattern":"^\\/dlxcv\\/?$","segments":[[{"content":"dlxcv","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dlxcv.astro","pathname":"/dlxcv","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/fernando/Documents/astro/delveeducation/dist/fdl/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/fdl","isIndex":false,"type":"page","pattern":"^\\/fdl\\/?$","segments":[[{"content":"fdl","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/fdl.astro","pathname":"/fdl","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/fernando/Documents/astro/delveeducation/dist/icv/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/icv","isIndex":false,"type":"page","pattern":"^\\/icv\\/?$","segments":[[{"content":"icv","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/icv.astro","pathname":"/icv","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/fernando/Documents/astro/delveeducation/dist/iqc/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/iqc","isIndex":false,"type":"page","pattern":"^\\/iqc\\/?$","segments":[[{"content":"iqc","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/iqc.astro","pathname":"/iqc","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/fernando/Documents/astro/delveeducation/dist/kg/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/kg","isIndex":false,"type":"page","pattern":"^\\/kg\\/?$","segments":[[{"content":"kg","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/kg.astro","pathname":"/kg","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/fernando/Documents/astro/delveeducation/dist/llma/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/llma","isIndex":false,"type":"page","pattern":"^\\/llma\\/?$","segments":[[{"content":"llma","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/llma.astro","pathname":"/llma","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/fernando/Documents/astro/delveeducation/dist/llml/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/llml","isIndex":false,"type":"page","pattern":"^\\/llml\\/?$","segments":[[{"content":"llml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/llml.astro","pathname":"/llml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/fernando/Documents/astro/delveeducation/dist/llms/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/llms","isIndex":false,"type":"page","pattern":"^\\/llms\\/?$","segments":[[{"content":"llms","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/llms.astro","pathname":"/llms","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/fernando/Documents/astro/delveeducation/dist/nosotros/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/nosotros","isIndex":false,"type":"page","pattern":"^\\/nosotros\\/?$","segments":[[{"content":"nosotros","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/nosotros.astro","pathname":"/nosotros","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/fernando/Documents/astro/delveeducation/dist/pp/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/pp","isIndex":false,"type":"page","pattern":"^\\/pp\\/?$","segments":[[{"content":"pp","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pp.astro","pathname":"/pp","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/fernando/Documents/astro/delveeducation/dist/prueba/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/prueba","isIndex":false,"type":"page","pattern":"^\\/prueba\\/?$","segments":[[{"content":"prueba","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/prueba.astro","pathname":"/prueba","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/fernando/Documents/astro/delveeducation/dist/prueba_nav/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/prueba_nav","isIndex":false,"type":"page","pattern":"^\\/prueba_nav\\/?$","segments":[[{"content":"prueba_nav","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/prueba_nav.astro","pathname":"/prueba_nav","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/fernando/Documents/astro/delveeducation/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://www.delveedu.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/fernando/Documents/astro/delveeducation/src/pages/aed.astro",{"propagation":"none","containsHead":true}],["/Users/fernando/Documents/astro/delveeducation/src/pages/cai.astro",{"propagation":"none","containsHead":true}],["/Users/fernando/Documents/astro/delveeducation/src/pages/contacto.astro",{"propagation":"none","containsHead":true}],["/Users/fernando/Documents/astro/delveeducation/src/pages/copiacursos.astro",{"propagation":"none","containsHead":true}],["/Users/fernando/Documents/astro/delveeducation/src/pages/cursos.astro",{"propagation":"none","containsHead":true}],["/Users/fernando/Documents/astro/delveeducation/src/pages/dlxcv.astro",{"propagation":"none","containsHead":true}],["/Users/fernando/Documents/astro/delveeducation/src/pages/fdl.astro",{"propagation":"none","containsHead":true}],["/Users/fernando/Documents/astro/delveeducation/src/pages/icv.astro",{"propagation":"none","containsHead":true}],["/Users/fernando/Documents/astro/delveeducation/src/pages/iqc.astro",{"propagation":"none","containsHead":true}],["/Users/fernando/Documents/astro/delveeducation/src/pages/kg.astro",{"propagation":"none","containsHead":true}],["/Users/fernando/Documents/astro/delveeducation/src/pages/llma.astro",{"propagation":"none","containsHead":true}],["/Users/fernando/Documents/astro/delveeducation/src/pages/llml.astro",{"propagation":"none","containsHead":true}],["/Users/fernando/Documents/astro/delveeducation/src/pages/llms.astro",{"propagation":"none","containsHead":true}],["/Users/fernando/Documents/astro/delveeducation/src/pages/nosotros.astro",{"propagation":"none","containsHead":true}],["/Users/fernando/Documents/astro/delveeducation/src/pages/pp.astro",{"propagation":"none","containsHead":true}],["/Users/fernando/Documents/astro/delveeducation/src/pages/prueba.astro",{"propagation":"none","containsHead":true}],["/Users/fernando/Documents/astro/delveeducation/src/pages/prueba_nav.astro",{"propagation":"none","containsHead":true}],["/Users/fernando/Documents/astro/delveeducation/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/aed@_@astro":"pages/aed.astro.mjs","\u0000@astro-page:src/pages/cai@_@astro":"pages/cai.astro.mjs","\u0000@astro-page:src/pages/contacto@_@astro":"pages/contacto.astro.mjs","\u0000@astro-page:src/pages/copiacursos@_@astro":"pages/copiacursos.astro.mjs","\u0000@astro-page:src/pages/cursos@_@astro":"pages/cursos.astro.mjs","\u0000@astro-page:src/pages/dlxcv@_@astro":"pages/dlxcv.astro.mjs","\u0000@astro-page:src/pages/fdl@_@astro":"pages/fdl.astro.mjs","\u0000@astro-page:src/pages/icv@_@astro":"pages/icv.astro.mjs","\u0000@astro-page:src/pages/iqc@_@astro":"pages/iqc.astro.mjs","\u0000@astro-page:src/pages/kg@_@astro":"pages/kg.astro.mjs","\u0000@astro-page:src/pages/llma@_@astro":"pages/llma.astro.mjs","\u0000@astro-page:src/pages/llml@_@astro":"pages/llml.astro.mjs","\u0000@astro-page:src/pages/llms@_@astro":"pages/llms.astro.mjs","\u0000@astro-page:src/pages/nosotros@_@astro":"pages/nosotros.astro.mjs","\u0000@astro-page:src/pages/pp@_@astro":"pages/pp.astro.mjs","\u0000@astro-page:src/pages/prueba@_@astro":"pages/prueba.astro.mjs","\u0000@astro-page:src/pages/prueba_nav@_@astro":"pages/prueba_nav.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_DaMJWpqm.mjs","/Users/fernando/Documents/astro/delveeducation/src/pages/cai.astro?astro&type=script&index=0&lang.ts":"_astro/cai.astro_astro_type_script_index_0_lang.DHCRmKz4.js","/Users/fernando/Documents/astro/delveeducation/src/pages/contacto.astro?astro&type=script&index=0&lang.ts":"_astro/contacto.astro_astro_type_script_index_0_lang.DHCRmKz4.js","/Users/fernando/Documents/astro/delveeducation/src/pages/aed.astro?astro&type=script&index=0&lang.ts":"_astro/aed.astro_astro_type_script_index_0_lang.DHCRmKz4.js","/Users/fernando/Documents/astro/delveeducation/src/pages/cursos.astro?astro&type=script&index=0&lang.ts":"_astro/cursos.astro_astro_type_script_index_0_lang.DHCRmKz4.js","/Users/fernando/Documents/astro/delveeducation/src/pages/icv.astro?astro&type=script&index=0&lang.ts":"_astro/icv.astro_astro_type_script_index_0_lang.DHCRmKz4.js","/Users/fernando/Documents/astro/delveeducation/src/pages/kg.astro?astro&type=script&index=0&lang.ts":"_astro/kg.astro_astro_type_script_index_0_lang.DHCRmKz4.js","/Users/fernando/Documents/astro/delveeducation/src/pages/iqc.astro?astro&type=script&index=0&lang.ts":"_astro/iqc.astro_astro_type_script_index_0_lang.DHCRmKz4.js","/Users/fernando/Documents/astro/delveeducation/src/pages/llma.astro?astro&type=script&index=0&lang.ts":"_astro/llma.astro_astro_type_script_index_0_lang.DHCRmKz4.js","/Users/fernando/Documents/astro/delveeducation/src/pages/llml.astro?astro&type=script&index=0&lang.ts":"_astro/llml.astro_astro_type_script_index_0_lang.DHCRmKz4.js","/Users/fernando/Documents/astro/delveeducation/src/pages/dlxcv.astro?astro&type=script&index=0&lang.ts":"_astro/dlxcv.astro_astro_type_script_index_0_lang.DHCRmKz4.js","/Users/fernando/Documents/astro/delveeducation/src/pages/llms.astro?astro&type=script&index=0&lang.ts":"_astro/llms.astro_astro_type_script_index_0_lang.DHCRmKz4.js","/Users/fernando/Documents/astro/delveeducation/src/pages/nosotros.astro?astro&type=script&index=0&lang.ts":"_astro/nosotros.astro_astro_type_script_index_0_lang.DHCRmKz4.js","/Users/fernando/Documents/astro/delveeducation/src/pages/fdl.astro?astro&type=script&index=0&lang.ts":"_astro/fdl.astro_astro_type_script_index_0_lang.DHCRmKz4.js","/Users/fernando/Documents/astro/delveeducation/src/pages/pp.astro?astro&type=script&index=0&lang.ts":"_astro/pp.astro_astro_type_script_index_0_lang.DHCRmKz4.js","/Users/fernando/Documents/astro/delveeducation/src/pages/prueba_nav.astro?astro&type=script&index=0&lang.ts":"_astro/prueba_nav.astro_astro_type_script_index_0_lang.DHCRmKz4.js","/Users/fernando/Documents/astro/delveeducation/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.DHCRmKz4.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/fernando/Documents/astro/delveeducation/src/pages/cai.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"hamburger\"),t=document.getElementById(\"nav-links\");e.addEventListener(\"click\",()=>{t.classList.toggle(\"active\")});"],["/Users/fernando/Documents/astro/delveeducation/src/pages/contacto.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"hamburger\"),t=document.getElementById(\"nav-links\");e.addEventListener(\"click\",()=>{t.classList.toggle(\"active\")});"],["/Users/fernando/Documents/astro/delveeducation/src/pages/aed.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"hamburger\"),t=document.getElementById(\"nav-links\");e.addEventListener(\"click\",()=>{t.classList.toggle(\"active\")});"],["/Users/fernando/Documents/astro/delveeducation/src/pages/cursos.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"hamburger\"),t=document.getElementById(\"nav-links\");e.addEventListener(\"click\",()=>{t.classList.toggle(\"active\")});"],["/Users/fernando/Documents/astro/delveeducation/src/pages/icv.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"hamburger\"),t=document.getElementById(\"nav-links\");e.addEventListener(\"click\",()=>{t.classList.toggle(\"active\")});"],["/Users/fernando/Documents/astro/delveeducation/src/pages/kg.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"hamburger\"),t=document.getElementById(\"nav-links\");e.addEventListener(\"click\",()=>{t.classList.toggle(\"active\")});"],["/Users/fernando/Documents/astro/delveeducation/src/pages/iqc.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"hamburger\"),t=document.getElementById(\"nav-links\");e.addEventListener(\"click\",()=>{t.classList.toggle(\"active\")});"],["/Users/fernando/Documents/astro/delveeducation/src/pages/llma.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"hamburger\"),t=document.getElementById(\"nav-links\");e.addEventListener(\"click\",()=>{t.classList.toggle(\"active\")});"],["/Users/fernando/Documents/astro/delveeducation/src/pages/llml.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"hamburger\"),t=document.getElementById(\"nav-links\");e.addEventListener(\"click\",()=>{t.classList.toggle(\"active\")});"],["/Users/fernando/Documents/astro/delveeducation/src/pages/dlxcv.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"hamburger\"),t=document.getElementById(\"nav-links\");e.addEventListener(\"click\",()=>{t.classList.toggle(\"active\")});"],["/Users/fernando/Documents/astro/delveeducation/src/pages/llms.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"hamburger\"),t=document.getElementById(\"nav-links\");e.addEventListener(\"click\",()=>{t.classList.toggle(\"active\")});"],["/Users/fernando/Documents/astro/delveeducation/src/pages/nosotros.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"hamburger\"),t=document.getElementById(\"nav-links\");e.addEventListener(\"click\",()=>{t.classList.toggle(\"active\")});"],["/Users/fernando/Documents/astro/delveeducation/src/pages/fdl.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"hamburger\"),t=document.getElementById(\"nav-links\");e.addEventListener(\"click\",()=>{t.classList.toggle(\"active\")});"],["/Users/fernando/Documents/astro/delveeducation/src/pages/pp.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"hamburger\"),t=document.getElementById(\"nav-links\");e.addEventListener(\"click\",()=>{t.classList.toggle(\"active\")});"],["/Users/fernando/Documents/astro/delveeducation/src/pages/prueba_nav.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"hamburger\"),t=document.getElementById(\"nav-links\");e.addEventListener(\"click\",()=>{t.classList.toggle(\"active\")});"],["/Users/fernando/Documents/astro/delveeducation/src/pages/index.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"hamburger\"),t=document.getElementById(\"nav-links\");e.addEventListener(\"click\",()=>{t.classList.toggle(\"active\")});"]],"assets":["/file:///Users/fernando/Documents/astro/delveeducation/dist/aed/index.html","/file:///Users/fernando/Documents/astro/delveeducation/dist/cai/index.html","/file:///Users/fernando/Documents/astro/delveeducation/dist/contacto/index.html","/file:///Users/fernando/Documents/astro/delveeducation/dist/copiacursos/index.html","/file:///Users/fernando/Documents/astro/delveeducation/dist/cursos/index.html","/file:///Users/fernando/Documents/astro/delveeducation/dist/dlxcv/index.html","/file:///Users/fernando/Documents/astro/delveeducation/dist/fdl/index.html","/file:///Users/fernando/Documents/astro/delveeducation/dist/icv/index.html","/file:///Users/fernando/Documents/astro/delveeducation/dist/iqc/index.html","/file:///Users/fernando/Documents/astro/delveeducation/dist/kg/index.html","/file:///Users/fernando/Documents/astro/delveeducation/dist/llma/index.html","/file:///Users/fernando/Documents/astro/delveeducation/dist/llml/index.html","/file:///Users/fernando/Documents/astro/delveeducation/dist/llms/index.html","/file:///Users/fernando/Documents/astro/delveeducation/dist/nosotros/index.html","/file:///Users/fernando/Documents/astro/delveeducation/dist/pp/index.html","/file:///Users/fernando/Documents/astro/delveeducation/dist/prueba/index.html","/file:///Users/fernando/Documents/astro/delveeducation/dist/prueba_nav/index.html","/file:///Users/fernando/Documents/astro/delveeducation/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"allowedDomains":[],"serverIslandNameMap":[],"key":"afZZ9HVh5tQhozQyGUr8vnqHtxQoHokLzYVa4r8WfhI="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
