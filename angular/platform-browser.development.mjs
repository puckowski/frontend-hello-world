/* esm.sh - esbuild bundle(@angular/platform-browser@17.0.3) es2022 development */
// ../esmd/npm/@angular/platform-browser@17.0.3/node_modules/.pnpm/@angular+platform-browser@17.0.3_@angular+common@17.0.3_@angular+core@17.0.3/node_modules/@angular/platform-browser/fesm2022/platform-browser.mjs
import * as i0 from "./core.development.mjs";
import { \u0275global, \u0275RuntimeError, Injectable, InjectionToken, Inject, APP_ID, CSP_NONCE, PLATFORM_ID, Optional, ViewEncapsulation, RendererStyleFlags2, \u0275internalCreateApplication, ErrorHandler, \u0275setDocument, PLATFORM_INITIALIZER, createPlatformFactory, platformCore, \u0275TESTABILITY_GETTER, \u0275TESTABILITY, Testability, NgZone as NgZone2, TestabilityRegistry, \u0275INJECTOR_SCOPE, RendererFactory2, ApplicationModule, NgModule, SkipSelf, \u0275\u0275inject, ApplicationRef, \u0275Console as \u0275Console2, forwardRef as forwardRef2, \u0275XSS_SECURITY_URL, SecurityContext, \u0275allowSanitizationBypassAndThrow, \u0275unwrapSafeValue, \u0275_sanitizeUrl, \u0275_sanitizeHtml, \u0275bypassSanitizationTrustHtml, \u0275bypassSanitizationTrustStyle, \u0275bypassSanitizationTrustScript, \u0275bypassSanitizationTrustUrl, \u0275bypassSanitizationTrustResourceUrl, Injector, ENVIRONMENT_INITIALIZER, inject, \u0275formatRuntimeError, makeEnvironmentProviders, \u0275withDomHydration, Version, makeStateKey as makeStateKey$1, TransferState as TransferState$1 } from "./core.development.mjs";
import { \u0275DomAdapter, \u0275setRootDomAdapter, \u0275parseCookieValue, \u0275getDOM, isPlatformServer, DOCUMENT, \u0275PLATFORM_BROWSER_ID, XhrFactory, CommonModule } from "./common.development.mjs";
import { \u0275getDOM as \u0275getDOM2 } from "./common.development.mjs";
import { \u0275withHttpTransferCache } from "./http.development.js";
var GenericBrowserDomAdapter = class extends \u0275DomAdapter {
  constructor() {
    super(...arguments);
    this.supportsDOMEvents = true;
  }
};
var BrowserDomAdapter = class _BrowserDomAdapter extends GenericBrowserDomAdapter {
  static makeCurrent() {
    \u0275setRootDomAdapter(new _BrowserDomAdapter());
  }
  onAndCancel(el, evt, listener) {
    el.addEventListener(evt, listener);
    return () => {
      el.removeEventListener(evt, listener);
    };
  }
  dispatchEvent(el, evt) {
    el.dispatchEvent(evt);
  }
  remove(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  createElement(tagName, doc) {
    doc = doc || this.getDefaultDocument();
    return doc.createElement(tagName);
  }
  createHtmlDocument() {
    return document.implementation.createHTMLDocument("fakeTitle");
  }
  getDefaultDocument() {
    return document;
  }
  isElementNode(node) {
    return node.nodeType === Node.ELEMENT_NODE;
  }
  isShadowRoot(node) {
    return node instanceof DocumentFragment;
  }
  /** @deprecated No longer being used in Ivy code. To be removed in version 14. */
  getGlobalEventTarget(doc, target) {
    if (target === "window") {
      return window;
    }
    if (target === "document") {
      return doc;
    }
    if (target === "body") {
      return doc.body;
    }
    return null;
  }
  getBaseHref(doc) {
    const href = getBaseElementHref();
    return href == null ? null : relativePath(href);
  }
  resetBaseElement() {
    baseElement = null;
  }
  getUserAgent() {
    return window.navigator.userAgent;
  }
  getCookie(name) {
    return \u0275parseCookieValue(document.cookie, name);
  }
};
var baseElement = null;
function getBaseElementHref() {
  baseElement = baseElement || document.querySelector("base");
  return baseElement ? baseElement.getAttribute("href") : null;
}
var urlParsingNode;
function relativePath(url) {
  urlParsingNode = urlParsingNode || document.createElement("a");
  urlParsingNode.setAttribute("href", url);
  const pathName = urlParsingNode.pathname;
  return pathName.charAt(0) === "/" ? pathName : `/${pathName}`;
}
var BrowserGetTestability = class {
  addToWindow(registry) {
    \u0275global["getAngularTestability"] = (elem, findInAncestors = true) => {
      const testability = registry.findTestabilityInTree(elem, findInAncestors);
      if (testability == null) {
        throw new \u0275RuntimeError(5103, (typeof ngDevMode === "undefined" || ngDevMode) && "Could not find testability for element.");
      }
      return testability;
    };
    \u0275global["getAllAngularTestabilities"] = () => registry.getAllTestabilities();
    \u0275global["getAllAngularRootElements"] = () => registry.getAllRootElements();
    const whenAllStable = (callback) => {
      const testabilities = \u0275global["getAllAngularTestabilities"]();
      let count = testabilities.length;
      let didWork = false;
      const decrement = function(didWork_) {
        didWork = didWork || didWork_;
        count--;
        if (count == 0) {
          callback(didWork);
        }
      };
      testabilities.forEach((testability) => {
        testability.whenStable(decrement);
      });
    };
    if (!\u0275global["frameworkStabilizers"]) {
      \u0275global["frameworkStabilizers"] = [];
    }
    \u0275global["frameworkStabilizers"].push(whenAllStable);
  }
  findTestabilityInTree(registry, elem, findInAncestors) {
    if (elem == null) {
      return null;
    }
    const t = registry.getTestability(elem);
    if (t != null) {
      return t;
    } else if (!findInAncestors) {
      return null;
    }
    if (\u0275getDOM().isShadowRoot(elem)) {
      return this.findTestabilityInTree(registry, elem.host, true);
    }
    return this.findTestabilityInTree(registry, elem.parentElement, true);
  }
};
var BrowserXhr = class _BrowserXhr {
  build() {
    return new XMLHttpRequest();
  }
  static {
    this.\u0275fac = i0.\u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _BrowserXhr, deps: [], target: i0.\u0275\u0275FactoryTarget.Injectable });
  }
  static {
    this.\u0275prov = i0.\u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _BrowserXhr });
  }
};
i0.\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: BrowserXhr, decorators: [{
  type: Injectable
}] });
var EVENT_MANAGER_PLUGINS = new InjectionToken("EventManagerPlugins");
var EventManager = class _EventManager {
  /**
   * Initializes an instance of the event-manager service.
   */
  constructor(plugins, _zone) {
    this._zone = _zone;
    this._eventNameToPlugin = /* @__PURE__ */ new Map();
    plugins.forEach((plugin) => {
      plugin.manager = this;
    });
    this._plugins = plugins.slice().reverse();
  }
  /**
   * Registers a handler for a specific element and event.
   *
   * @param element The HTML element to receive event notifications.
   * @param eventName The name of the event to listen for.
   * @param handler A function to call when the notification occurs. Receives the
   * event object as an argument.
   * @returns  A callback function that can be used to remove the handler.
   */
  addEventListener(element, eventName, handler) {
    const plugin = this._findPluginFor(eventName);
    return plugin.addEventListener(element, eventName, handler);
  }
  /**
   * Retrieves the compilation zone in which event listeners are registered.
   */
  getZone() {
    return this._zone;
  }
  /** @internal */
  _findPluginFor(eventName) {
    let plugin = this._eventNameToPlugin.get(eventName);
    if (plugin) {
      return plugin;
    }
    const plugins = this._plugins;
    plugin = plugins.find((plugin2) => plugin2.supports(eventName));
    if (!plugin) {
      throw new \u0275RuntimeError(5101, (typeof ngDevMode === "undefined" || ngDevMode) && `No event manager plugin found for event ${eventName}`);
    }
    this._eventNameToPlugin.set(eventName, plugin);
    return plugin;
  }
  static {
    this.\u0275fac = i0.\u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _EventManager, deps: [{ token: EVENT_MANAGER_PLUGINS }, { token: i0.NgZone }], target: i0.\u0275\u0275FactoryTarget.Injectable });
  }
  static {
    this.\u0275prov = i0.\u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _EventManager });
  }
};
i0.\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: EventManager, decorators: [{
  type: Injectable
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: Inject,
  args: [EVENT_MANAGER_PLUGINS]
}] }, { type: i0.NgZone }] });
var EventManagerPlugin = class {
  // TODO: remove (has some usage in G3)
  constructor(_doc) {
    this._doc = _doc;
  }
};
var APP_ID_ATTRIBUTE_NAME = "ng-app-id";
var SharedStylesHost = class _SharedStylesHost {
  constructor(doc, appId, nonce, platformId = {}) {
    this.doc = doc;
    this.appId = appId;
    this.nonce = nonce;
    this.platformId = platformId;
    this.styleRef = /* @__PURE__ */ new Map();
    this.hostNodes = /* @__PURE__ */ new Set();
    this.styleNodesInDOM = this.collectServerRenderedStyles();
    this.platformIsServer = isPlatformServer(platformId);
    this.resetHostNodes();
  }
  addStyles(styles) {
    for (const style of styles) {
      const usageCount = this.changeUsageCount(style, 1);
      if (usageCount === 1) {
        this.onStyleAdded(style);
      }
    }
  }
  removeStyles(styles) {
    for (const style of styles) {
      const usageCount = this.changeUsageCount(style, -1);
      if (usageCount <= 0) {
        this.onStyleRemoved(style);
      }
    }
  }
  ngOnDestroy() {
    const styleNodesInDOM = this.styleNodesInDOM;
    if (styleNodesInDOM) {
      styleNodesInDOM.forEach((node) => node.remove());
      styleNodesInDOM.clear();
    }
    for (const style of this.getAllStyles()) {
      this.onStyleRemoved(style);
    }
    this.resetHostNodes();
  }
  addHost(hostNode) {
    this.hostNodes.add(hostNode);
    for (const style of this.getAllStyles()) {
      this.addStyleToHost(hostNode, style);
    }
  }
  removeHost(hostNode) {
    this.hostNodes.delete(hostNode);
  }
  getAllStyles() {
    return this.styleRef.keys();
  }
  onStyleAdded(style) {
    for (const host of this.hostNodes) {
      this.addStyleToHost(host, style);
    }
  }
  onStyleRemoved(style) {
    const styleRef = this.styleRef;
    styleRef.get(style)?.elements?.forEach((node) => node.remove());
    styleRef.delete(style);
  }
  collectServerRenderedStyles() {
    const styles = this.doc.head?.querySelectorAll(`style[${APP_ID_ATTRIBUTE_NAME}="${this.appId}"]`);
    if (styles?.length) {
      const styleMap = /* @__PURE__ */ new Map();
      styles.forEach((style) => {
        if (style.textContent != null) {
          styleMap.set(style.textContent, style);
        }
      });
      return styleMap;
    }
    return null;
  }
  changeUsageCount(style, delta) {
    const map = this.styleRef;
    if (map.has(style)) {
      const styleRefValue = map.get(style);
      styleRefValue.usage += delta;
      return styleRefValue.usage;
    }
    map.set(style, { usage: delta, elements: [] });
    return delta;
  }
  getStyleElement(host, style) {
    const styleNodesInDOM = this.styleNodesInDOM;
    const styleEl = styleNodesInDOM?.get(style);
    if (styleEl?.parentNode === host) {
      styleNodesInDOM.delete(style);
      styleEl.removeAttribute(APP_ID_ATTRIBUTE_NAME);
      if (typeof ngDevMode === "undefined" || ngDevMode) {
        styleEl.setAttribute("ng-style-reused", "");
      }
      return styleEl;
    } else {
      const styleEl2 = this.doc.createElement("style");
      if (this.nonce) {
        styleEl2.setAttribute("nonce", this.nonce);
      }
      styleEl2.textContent = style;
      if (this.platformIsServer) {
        styleEl2.setAttribute(APP_ID_ATTRIBUTE_NAME, this.appId);
      }
      host.appendChild(styleEl2);
      return styleEl2;
    }
  }
  addStyleToHost(host, style) {
    const styleEl = this.getStyleElement(host, style);
    const styleRef = this.styleRef;
    const styleElRef = styleRef.get(style)?.elements;
    if (styleElRef) {
      styleElRef.push(styleEl);
    } else {
      styleRef.set(style, { elements: [styleEl], usage: 1 });
    }
  }
  resetHostNodes() {
    const hostNodes = this.hostNodes;
    hostNodes.clear();
    hostNodes.add(this.doc.head);
  }
  static {
    this.\u0275fac = i0.\u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _SharedStylesHost, deps: [{ token: DOCUMENT }, { token: APP_ID }, { token: CSP_NONCE, optional: true }, { token: PLATFORM_ID }], target: i0.\u0275\u0275FactoryTarget.Injectable });
  }
  static {
    this.\u0275prov = i0.\u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _SharedStylesHost });
  }
};
i0.\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: SharedStylesHost, decorators: [{
  type: Injectable
}], ctorParameters: () => [{ type: Document, decorators: [{
  type: Inject,
  args: [DOCUMENT]
}] }, { type: void 0, decorators: [{
  type: Inject,
  args: [APP_ID]
}] }, { type: void 0, decorators: [{
  type: Inject,
  args: [CSP_NONCE]
}, {
  type: Optional
}] }, { type: void 0, decorators: [{
  type: Inject,
  args: [PLATFORM_ID]
}] }] });
var NAMESPACE_URIS = {
  "svg": "http://www.w3.org/2000/svg",
  "xhtml": "http://www.w3.org/1999/xhtml",
  "xlink": "http://www.w3.org/1999/xlink",
  "xml": "http://www.w3.org/XML/1998/namespace",
  "xmlns": "http://www.w3.org/2000/xmlns/",
  "math": "http://www.w3.org/1998/MathML/"
};
var COMPONENT_REGEX = /%COMP%/g;
var COMPONENT_VARIABLE = "%COMP%";
var HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
var CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
var REMOVE_STYLES_ON_COMPONENT_DESTROY_DEFAULT = true;
var REMOVE_STYLES_ON_COMPONENT_DESTROY = new InjectionToken("RemoveStylesOnCompDestroy", {
  providedIn: "root",
  factory: () => REMOVE_STYLES_ON_COMPONENT_DESTROY_DEFAULT
});
function shimContentAttribute(componentShortId) {
  return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
function shimHostAttribute(componentShortId) {
  return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
function shimStylesContent(compId, styles) {
  return styles.map((s) => s.replace(COMPONENT_REGEX, compId));
}
var DomRendererFactory2 = class _DomRendererFactory2 {
  constructor(eventManager, sharedStylesHost, appId, removeStylesOnCompDestroy, doc, platformId, ngZone, nonce = null) {
    this.eventManager = eventManager;
    this.sharedStylesHost = sharedStylesHost;
    this.appId = appId;
    this.removeStylesOnCompDestroy = removeStylesOnCompDestroy;
    this.doc = doc;
    this.platformId = platformId;
    this.ngZone = ngZone;
    this.nonce = nonce;
    this.rendererByCompId = /* @__PURE__ */ new Map();
    this.platformIsServer = isPlatformServer(platformId);
    this.defaultRenderer = new DefaultDomRenderer2(eventManager, doc, ngZone, this.platformIsServer);
  }
  createRenderer(element, type) {
    if (!element || !type) {
      return this.defaultRenderer;
    }
    if (this.platformIsServer && type.encapsulation === ViewEncapsulation.ShadowDom) {
      type = { ...type, encapsulation: ViewEncapsulation.Emulated };
    }
    const renderer = this.getOrCreateRenderer(element, type);
    if (renderer instanceof EmulatedEncapsulationDomRenderer2) {
      renderer.applyToHost(element);
    } else if (renderer instanceof NoneEncapsulationDomRenderer) {
      renderer.applyStyles();
    }
    return renderer;
  }
  getOrCreateRenderer(element, type) {
    const rendererByCompId = this.rendererByCompId;
    let renderer = rendererByCompId.get(type.id);
    if (!renderer) {
      const doc = this.doc;
      const ngZone = this.ngZone;
      const eventManager = this.eventManager;
      const sharedStylesHost = this.sharedStylesHost;
      const removeStylesOnCompDestroy = this.removeStylesOnCompDestroy;
      const platformIsServer = this.platformIsServer;
      switch (type.encapsulation) {
        case ViewEncapsulation.Emulated:
          renderer = new EmulatedEncapsulationDomRenderer2(eventManager, sharedStylesHost, type, this.appId, removeStylesOnCompDestroy, doc, ngZone, platformIsServer);
          break;
        case ViewEncapsulation.ShadowDom:
          return new ShadowDomRenderer(eventManager, sharedStylesHost, element, type, doc, ngZone, this.nonce, platformIsServer);
        default:
          renderer = new NoneEncapsulationDomRenderer(eventManager, sharedStylesHost, type, removeStylesOnCompDestroy, doc, ngZone, platformIsServer);
          break;
      }
      rendererByCompId.set(type.id, renderer);
    }
    return renderer;
  }
  ngOnDestroy() {
    this.rendererByCompId.clear();
  }
  static {
    this.\u0275fac = i0.\u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _DomRendererFactory2, deps: [{ token: EventManager }, { token: SharedStylesHost }, { token: APP_ID }, { token: REMOVE_STYLES_ON_COMPONENT_DESTROY }, { token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.NgZone }, { token: CSP_NONCE }], target: i0.\u0275\u0275FactoryTarget.Injectable });
  }
  static {
    this.\u0275prov = i0.\u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _DomRendererFactory2 });
  }
};
i0.\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: DomRendererFactory2, decorators: [{
  type: Injectable
}], ctorParameters: () => [{ type: EventManager }, { type: SharedStylesHost }, { type: void 0, decorators: [{
  type: Inject,
  args: [APP_ID]
}] }, { type: void 0, decorators: [{
  type: Inject,
  args: [REMOVE_STYLES_ON_COMPONENT_DESTROY]
}] }, { type: Document, decorators: [{
  type: Inject,
  args: [DOCUMENT]
}] }, { type: Object, decorators: [{
  type: Inject,
  args: [PLATFORM_ID]
}] }, { type: i0.NgZone }, { type: void 0, decorators: [{
  type: Inject,
  args: [CSP_NONCE]
}] }] });
var DefaultDomRenderer2 = class {
  constructor(eventManager, doc, ngZone, platformIsServer) {
    this.eventManager = eventManager;
    this.doc = doc;
    this.ngZone = ngZone;
    this.platformIsServer = platformIsServer;
    this.data = /* @__PURE__ */ Object.create(null);
    this.throwOnSyntheticProps = true;
    this.destroyNode = null;
  }
  destroy() {
  }
  createElement(name, namespace) {
    if (namespace) {
      return this.doc.createElementNS(NAMESPACE_URIS[namespace] || namespace, name);
    }
    return this.doc.createElement(name);
  }
  createComment(value) {
    return this.doc.createComment(value);
  }
  createText(value) {
    return this.doc.createTextNode(value);
  }
  appendChild(parent, newChild) {
    const targetParent = isTemplateNode(parent) ? parent.content : parent;
    targetParent.appendChild(newChild);
  }
  insertBefore(parent, newChild, refChild) {
    if (parent) {
      const targetParent = isTemplateNode(parent) ? parent.content : parent;
      targetParent.insertBefore(newChild, refChild);
    }
  }
  removeChild(parent, oldChild) {
    if (parent) {
      parent.removeChild(oldChild);
    }
  }
  selectRootElement(selectorOrNode, preserveContent) {
    let el = typeof selectorOrNode === "string" ? this.doc.querySelector(selectorOrNode) : selectorOrNode;
    if (!el) {
      throw new \u0275RuntimeError(-5104, (typeof ngDevMode === "undefined" || ngDevMode) && `The selector "${selectorOrNode}" did not match any elements`);
    }
    if (!preserveContent) {
      el.textContent = "";
    }
    return el;
  }
  parentNode(node) {
    return node.parentNode;
  }
  nextSibling(node) {
    return node.nextSibling;
  }
  setAttribute(el, name, value, namespace) {
    if (namespace) {
      name = namespace + ":" + name;
      const namespaceUri = NAMESPACE_URIS[namespace];
      if (namespaceUri) {
        el.setAttributeNS(namespaceUri, name, value);
      } else {
        el.setAttribute(name, value);
      }
    } else {
      el.setAttribute(name, value);
    }
  }
  removeAttribute(el, name, namespace) {
    if (namespace) {
      const namespaceUri = NAMESPACE_URIS[namespace];
      if (namespaceUri) {
        el.removeAttributeNS(namespaceUri, name);
      } else {
        el.removeAttribute(`${namespace}:${name}`);
      }
    } else {
      el.removeAttribute(name);
    }
  }
  addClass(el, name) {
    el.classList.add(name);
  }
  removeClass(el, name) {
    el.classList.remove(name);
  }
  setStyle(el, style, value, flags) {
    if (flags & (RendererStyleFlags2.DashCase | RendererStyleFlags2.Important)) {
      el.style.setProperty(style, value, flags & RendererStyleFlags2.Important ? "important" : "");
    } else {
      el.style[style] = value;
    }
  }
  removeStyle(el, style, flags) {
    if (flags & RendererStyleFlags2.DashCase) {
      el.style.removeProperty(style);
    } else {
      el.style[style] = "";
    }
  }
  setProperty(el, name, value) {
    if (el == null) {
      return;
    }
    (typeof ngDevMode === "undefined" || ngDevMode) && this.throwOnSyntheticProps && checkNoSyntheticProp(name, "property");
    el[name] = value;
  }
  setValue(node, value) {
    node.nodeValue = value;
  }
  listen(target, event, callback) {
    (typeof ngDevMode === "undefined" || ngDevMode) && this.throwOnSyntheticProps && checkNoSyntheticProp(event, "listener");
    if (typeof target === "string") {
      target = \u0275getDOM().getGlobalEventTarget(this.doc, target);
      if (!target) {
        throw new Error(`Unsupported event target ${target} for event ${event}`);
      }
    }
    return this.eventManager.addEventListener(target, event, this.decoratePreventDefault(callback));
  }
  decoratePreventDefault(eventHandler) {
    return (event) => {
      if (event === "__ngUnwrap__") {
        return eventHandler;
      }
      const allowDefaultBehavior = this.platformIsServer ? this.ngZone.runGuarded(() => eventHandler(event)) : eventHandler(event);
      if (allowDefaultBehavior === false) {
        event.preventDefault();
      }
      return void 0;
    };
  }
};
var AT_CHARCODE = (() => "@".charCodeAt(0))();
function checkNoSyntheticProp(name, nameKind) {
  if (name.charCodeAt(0) === AT_CHARCODE) {
    throw new \u0275RuntimeError(5105, `Unexpected synthetic ${nameKind} ${name} found. Please make sure that:
  - Either \`BrowserAnimationsModule\` or \`NoopAnimationsModule\` are imported in your application.
  - There is corresponding configuration for the animation named \`${name}\` defined in the \`animations\` field of the \`@Component\` decorator (see https://angular.io/api/core/Component#animations).`);
  }
}
function isTemplateNode(node) {
  return node.tagName === "TEMPLATE" && node.content !== void 0;
}
var ShadowDomRenderer = class extends DefaultDomRenderer2 {
  constructor(eventManager, sharedStylesHost, hostEl, component, doc, ngZone, nonce, platformIsServer) {
    super(eventManager, doc, ngZone, platformIsServer);
    this.sharedStylesHost = sharedStylesHost;
    this.hostEl = hostEl;
    this.shadowRoot = hostEl.attachShadow({ mode: "open" });
    this.sharedStylesHost.addHost(this.shadowRoot);
    const styles = shimStylesContent(component.id, component.styles);
    for (const style of styles) {
      const styleEl = document.createElement("style");
      if (nonce) {
        styleEl.setAttribute("nonce", nonce);
      }
      styleEl.textContent = style;
      this.shadowRoot.appendChild(styleEl);
    }
  }
  nodeOrShadowRoot(node) {
    return node === this.hostEl ? this.shadowRoot : node;
  }
  appendChild(parent, newChild) {
    return super.appendChild(this.nodeOrShadowRoot(parent), newChild);
  }
  insertBefore(parent, newChild, refChild) {
    return super.insertBefore(this.nodeOrShadowRoot(parent), newChild, refChild);
  }
  removeChild(parent, oldChild) {
    return super.removeChild(this.nodeOrShadowRoot(parent), oldChild);
  }
  parentNode(node) {
    return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(node)));
  }
  destroy() {
    this.sharedStylesHost.removeHost(this.shadowRoot);
  }
};
var NoneEncapsulationDomRenderer = class extends DefaultDomRenderer2 {
  constructor(eventManager, sharedStylesHost, component, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, compId) {
    super(eventManager, doc, ngZone, platformIsServer);
    this.sharedStylesHost = sharedStylesHost;
    this.removeStylesOnCompDestroy = removeStylesOnCompDestroy;
    this.styles = compId ? shimStylesContent(compId, component.styles) : component.styles;
  }
  applyStyles() {
    this.sharedStylesHost.addStyles(this.styles);
  }
  destroy() {
    if (!this.removeStylesOnCompDestroy) {
      return;
    }
    this.sharedStylesHost.removeStyles(this.styles);
  }
};
var EmulatedEncapsulationDomRenderer2 = class extends NoneEncapsulationDomRenderer {
  constructor(eventManager, sharedStylesHost, component, appId, removeStylesOnCompDestroy, doc, ngZone, platformIsServer) {
    const compId = appId + "-" + component.id;
    super(eventManager, sharedStylesHost, component, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, compId);
    this.contentAttr = shimContentAttribute(compId);
    this.hostAttr = shimHostAttribute(compId);
  }
  applyToHost(element) {
    this.applyStyles();
    this.setAttribute(element, this.hostAttr, "");
  }
  createElement(parent, name) {
    const el = super.createElement(parent, name);
    super.setAttribute(el, this.contentAttr, "");
    return el;
  }
};
var DomEventsPlugin = class _DomEventsPlugin extends EventManagerPlugin {
  constructor(doc) {
    super(doc);
  }
  // This plugin should come last in the list of plugins, because it accepts all
  // events.
  supports(eventName) {
    return true;
  }
  addEventListener(element, eventName, handler) {
    element.addEventListener(eventName, handler, false);
    return () => this.removeEventListener(element, eventName, handler);
  }
  removeEventListener(target, eventName, callback) {
    return target.removeEventListener(eventName, callback);
  }
  static {
    this.\u0275fac = i0.\u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _DomEventsPlugin, deps: [{ token: DOCUMENT }], target: i0.\u0275\u0275FactoryTarget.Injectable });
  }
  static {
    this.\u0275prov = i0.\u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _DomEventsPlugin });
  }
};
i0.\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: DomEventsPlugin, decorators: [{
  type: Injectable
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: Inject,
  args: [DOCUMENT]
}] }] });
var MODIFIER_KEYS = ["alt", "control", "meta", "shift"];
var _keyMap = {
  "\b": "Backspace",
  "	": "Tab",
  "\x7F": "Delete",
  "\x1B": "Escape",
  "Del": "Delete",
  "Esc": "Escape",
  "Left": "ArrowLeft",
  "Right": "ArrowRight",
  "Up": "ArrowUp",
  "Down": "ArrowDown",
  "Menu": "ContextMenu",
  "Scroll": "ScrollLock",
  "Win": "OS"
};
var MODIFIER_KEY_GETTERS = {
  "alt": (event) => event.altKey,
  "control": (event) => event.ctrlKey,
  "meta": (event) => event.metaKey,
  "shift": (event) => event.shiftKey
};
var KeyEventsPlugin = class _KeyEventsPlugin extends EventManagerPlugin {
  /**
   * Initializes an instance of the browser plug-in.
   * @param doc The document in which key events will be detected.
   */
  constructor(doc) {
    super(doc);
  }
  /**
   * Reports whether a named key event is supported.
   * @param eventName The event name to query.
   * @return True if the named key event is supported.
   */
  supports(eventName) {
    return _KeyEventsPlugin.parseEventName(eventName) != null;
  }
  /**
   * Registers a handler for a specific element and key event.
   * @param element The HTML element to receive event notifications.
   * @param eventName The name of the key event to listen for.
   * @param handler A function to call when the notification occurs. Receives the
   * event object as an argument.
   * @returns The key event that was registered.
   */
  addEventListener(element, eventName, handler) {
    const parsedEvent = _KeyEventsPlugin.parseEventName(eventName);
    const outsideHandler = _KeyEventsPlugin.eventCallback(parsedEvent["fullKey"], handler, this.manager.getZone());
    return this.manager.getZone().runOutsideAngular(() => {
      return \u0275getDOM().onAndCancel(element, parsedEvent["domEventName"], outsideHandler);
    });
  }
  /**
   * Parses the user provided full keyboard event definition and normalizes it for
   * later internal use. It ensures the string is all lowercase, converts special
   * characters to a standard spelling, and orders all the values consistently.
   *
   * @param eventName The name of the key event to listen for.
   * @returns an object with the full, normalized string, and the dom event name
   * or null in the case when the event doesn't match a keyboard event.
   */
  static parseEventName(eventName) {
    const parts = eventName.toLowerCase().split(".");
    const domEventName = parts.shift();
    if (parts.length === 0 || !(domEventName === "keydown" || domEventName === "keyup")) {
      return null;
    }
    const key = _KeyEventsPlugin._normalizeKey(parts.pop());
    let fullKey = "";
    let codeIX = parts.indexOf("code");
    if (codeIX > -1) {
      parts.splice(codeIX, 1);
      fullKey = "code.";
    }
    MODIFIER_KEYS.forEach((modifierName) => {
      const index = parts.indexOf(modifierName);
      if (index > -1) {
        parts.splice(index, 1);
        fullKey += modifierName + ".";
      }
    });
    fullKey += key;
    if (parts.length != 0 || key.length === 0) {
      return null;
    }
    const result = {};
    result["domEventName"] = domEventName;
    result["fullKey"] = fullKey;
    return result;
  }
  /**
   * Determines whether the actual keys pressed match the configured key code string.
   * The `fullKeyCode` event is normalized in the `parseEventName` method when the
   * event is attached to the DOM during the `addEventListener` call. This is unseen
   * by the end user and is normalized for internal consistency and parsing.
   *
   * @param event The keyboard event.
   * @param fullKeyCode The normalized user defined expected key event string
   * @returns boolean.
   */
  static matchEventFullKeyCode(event, fullKeyCode) {
    let keycode = _keyMap[event.key] || event.key;
    let key = "";
    if (fullKeyCode.indexOf("code.") > -1) {
      keycode = event.code;
      key = "code.";
    }
    if (keycode == null || !keycode)
      return false;
    keycode = keycode.toLowerCase();
    if (keycode === " ") {
      keycode = "space";
    } else if (keycode === ".") {
      keycode = "dot";
    }
    MODIFIER_KEYS.forEach((modifierName) => {
      if (modifierName !== keycode) {
        const modifierGetter = MODIFIER_KEY_GETTERS[modifierName];
        if (modifierGetter(event)) {
          key += modifierName + ".";
        }
      }
    });
    key += keycode;
    return key === fullKeyCode;
  }
  /**
   * Configures a handler callback for a key event.
   * @param fullKey The event name that combines all simultaneous keystrokes.
   * @param handler The function that responds to the key event.
   * @param zone The zone in which the event occurred.
   * @returns A callback function.
   */
  static eventCallback(fullKey, handler, zone) {
    return (event) => {
      if (_KeyEventsPlugin.matchEventFullKeyCode(event, fullKey)) {
        zone.runGuarded(() => handler(event));
      }
    };
  }
  /** @internal */
  static _normalizeKey(keyName) {
    return keyName === "esc" ? "escape" : keyName;
  }
  static {
    this.\u0275fac = i0.\u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _KeyEventsPlugin, deps: [{ token: DOCUMENT }], target: i0.\u0275\u0275FactoryTarget.Injectable });
  }
  static {
    this.\u0275prov = i0.\u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _KeyEventsPlugin });
  }
};
i0.\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: KeyEventsPlugin, decorators: [{
  type: Injectable
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: Inject,
  args: [DOCUMENT]
}] }] });
function bootstrapApplication(rootComponent, options) {
  return \u0275internalCreateApplication({ rootComponent, ...createProvidersConfig(options) });
}
function createApplication(options) {
  return \u0275internalCreateApplication(createProvidersConfig(options));
}
function createProvidersConfig(options) {
  return {
    appProviders: [
      ...BROWSER_MODULE_PROVIDERS,
      ...options?.providers ?? []
    ],
    platformProviders: INTERNAL_BROWSER_PLATFORM_PROVIDERS
  };
}
function provideProtractorTestingSupport() {
  return [...TESTABILITY_PROVIDERS];
}
function initDomAdapter() {
  BrowserDomAdapter.makeCurrent();
}
function errorHandler() {
  return new ErrorHandler();
}
function _document() {
  \u0275setDocument(document);
  return document;
}
var INTERNAL_BROWSER_PLATFORM_PROVIDERS = [
  { provide: PLATFORM_ID, useValue: \u0275PLATFORM_BROWSER_ID },
  { provide: PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true },
  { provide: DOCUMENT, useFactory: _document, deps: [] }
];
var platformBrowser = createPlatformFactory(platformCore, "browser", INTERNAL_BROWSER_PLATFORM_PROVIDERS);
var BROWSER_MODULE_PROVIDERS_MARKER = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "BrowserModule Providers Marker" : "");
var TESTABILITY_PROVIDERS = [
  {
    provide: \u0275TESTABILITY_GETTER,
    useClass: BrowserGetTestability,
    deps: []
  },
  {
    provide: \u0275TESTABILITY,
    useClass: Testability,
    deps: [NgZone2, TestabilityRegistry, \u0275TESTABILITY_GETTER]
  },
  {
    provide: Testability,
    useClass: Testability,
    deps: [NgZone2, TestabilityRegistry, \u0275TESTABILITY_GETTER]
  }
];
var BROWSER_MODULE_PROVIDERS = [
  { provide: \u0275INJECTOR_SCOPE, useValue: "root" },
  { provide: ErrorHandler, useFactory: errorHandler, deps: [] },
  {
    provide: EVENT_MANAGER_PLUGINS,
    useClass: DomEventsPlugin,
    multi: true,
    deps: [DOCUMENT, NgZone2, PLATFORM_ID]
  },
  { provide: EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, multi: true, deps: [DOCUMENT] },
  DomRendererFactory2,
  SharedStylesHost,
  EventManager,
  { provide: RendererFactory2, useExisting: DomRendererFactory2 },
  { provide: XhrFactory, useClass: BrowserXhr, deps: [] },
  typeof ngDevMode === "undefined" || ngDevMode ? { provide: BROWSER_MODULE_PROVIDERS_MARKER, useValue: true } : []
];
var BrowserModule = class _BrowserModule {
  constructor(providersAlreadyPresent) {
    if ((typeof ngDevMode === "undefined" || ngDevMode) && providersAlreadyPresent) {
      throw new \u0275RuntimeError(5100, `Providers from the \`BrowserModule\` have already been loaded. If you need access to common directives such as NgIf and NgFor, import the \`CommonModule\` instead.`);
    }
  }
  /**
   * Configures a browser-based app to transition from a server-rendered app, if
   * one is present on the page.
   *
   * @param params An object containing an identifier for the app to transition.
   * The ID must match between the client and server versions of the app.
   * @returns The reconfigured `BrowserModule` to import into the app's root `AppModule`.
   *
   * @deprecated Use {@link APP_ID} instead to set the application ID.
   */
  static withServerTransition(params) {
    return {
      ngModule: _BrowserModule,
      providers: [
        { provide: APP_ID, useValue: params.appId }
      ]
    };
  }
  static {
    this.\u0275fac = i0.\u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _BrowserModule, deps: [{ token: BROWSER_MODULE_PROVIDERS_MARKER, optional: true, skipSelf: true }], target: i0.\u0275\u0275FactoryTarget.NgModule });
  }
  static {
    this.\u0275mod = i0.\u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.3", ngImport: i0, type: _BrowserModule, exports: [CommonModule, ApplicationModule] });
  }
  static {
    this.\u0275inj = i0.\u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _BrowserModule, providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS], imports: [CommonModule, ApplicationModule] });
  }
};
i0.\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: BrowserModule, decorators: [{
  type: NgModule,
  args: [{
    providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS],
    exports: [CommonModule, ApplicationModule]
  }]
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: Optional
}, {
  type: SkipSelf
}, {
  type: Inject,
  args: [BROWSER_MODULE_PROVIDERS_MARKER]
}] }] });
function createMeta() {
  return new Meta(\u0275\u0275inject(DOCUMENT));
}
var Meta = class _Meta {
  constructor(_doc) {
    this._doc = _doc;
    this._dom = \u0275getDOM();
  }
  /**
   * Retrieves or creates a specific `<meta>` tag element in the current HTML document.
   * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
   * values in the provided tag definition, and verifies that all other attribute values are equal.
   * If an existing element is found, it is returned and is not modified in any way.
   * @param tag The definition of a `<meta>` element to match or create.
   * @param forceCreation True to create a new element without checking whether one already exists.
   * @returns The existing element with the same attributes and values if found,
   * the new element if no match is found, or `null` if the tag parameter is not defined.
   */
  addTag(tag, forceCreation = false) {
    if (!tag)
      return null;
    return this._getOrCreateElement(tag, forceCreation);
  }
  /**
   * Retrieves or creates a set of `<meta>` tag elements in the current HTML document.
   * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
   * values in the provided tag definition, and verifies that all other attribute values are equal.
   * @param tags An array of tag definitions to match or create.
   * @param forceCreation True to create new elements without checking whether they already exist.
   * @returns The matching elements if found, or the new elements.
   */
  addTags(tags, forceCreation = false) {
    if (!tags)
      return [];
    return tags.reduce((result, tag) => {
      if (tag) {
        result.push(this._getOrCreateElement(tag, forceCreation));
      }
      return result;
    }, []);
  }
  /**
   * Retrieves a `<meta>` tag element in the current HTML document.
   * @param attrSelector The tag attribute and value to match against, in the format
   * `"tag_attribute='value string'"`.
   * @returns The matching element, if any.
   */
  getTag(attrSelector) {
    if (!attrSelector)
      return null;
    return this._doc.querySelector(`meta[${attrSelector}]`) || null;
  }
  /**
   * Retrieves a set of `<meta>` tag elements in the current HTML document.
   * @param attrSelector The tag attribute and value to match against, in the format
   * `"tag_attribute='value string'"`.
   * @returns The matching elements, if any.
   */
  getTags(attrSelector) {
    if (!attrSelector)
      return [];
    const list = this._doc.querySelectorAll(`meta[${attrSelector}]`);
    return list ? [].slice.call(list) : [];
  }
  /**
   * Modifies an existing `<meta>` tag element in the current HTML document.
   * @param tag The tag description with which to replace the existing tag content.
   * @param selector A tag attribute and value to match against, to identify
   * an existing tag. A string in the format `"tag_attribute=`value string`"`.
   * If not supplied, matches a tag with the same `name` or `property` attribute value as the
   * replacement tag.
   * @return The modified element.
   */
  updateTag(tag, selector) {
    if (!tag)
      return null;
    selector = selector || this._parseSelector(tag);
    const meta = this.getTag(selector);
    if (meta) {
      return this._setMetaElementAttributes(tag, meta);
    }
    return this._getOrCreateElement(tag, true);
  }
  /**
   * Removes an existing `<meta>` tag element from the current HTML document.
   * @param attrSelector A tag attribute and value to match against, to identify
   * an existing tag. A string in the format `"tag_attribute=`value string`"`.
   */
  removeTag(attrSelector) {
    this.removeTagElement(this.getTag(attrSelector));
  }
  /**
   * Removes an existing `<meta>` tag element from the current HTML document.
   * @param meta The tag definition to match against to identify an existing tag.
   */
  removeTagElement(meta) {
    if (meta) {
      this._dom.remove(meta);
    }
  }
  _getOrCreateElement(meta, forceCreation = false) {
    if (!forceCreation) {
      const selector = this._parseSelector(meta);
      const elem = this.getTags(selector).filter((elem2) => this._containsAttributes(meta, elem2))[0];
      if (elem !== void 0)
        return elem;
    }
    const element = this._dom.createElement("meta");
    this._setMetaElementAttributes(meta, element);
    const head = this._doc.getElementsByTagName("head")[0];
    head.appendChild(element);
    return element;
  }
  _setMetaElementAttributes(tag, el) {
    Object.keys(tag).forEach((prop) => el.setAttribute(this._getMetaKeyMap(prop), tag[prop]));
    return el;
  }
  _parseSelector(tag) {
    const attr = tag.name ? "name" : "property";
    return `${attr}="${tag[attr]}"`;
  }
  _containsAttributes(tag, elem) {
    return Object.keys(tag).every((key) => elem.getAttribute(this._getMetaKeyMap(key)) === tag[key]);
  }
  _getMetaKeyMap(prop) {
    return META_KEYS_MAP[prop] || prop;
  }
  static {
    this.\u0275fac = i0.\u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _Meta, deps: [{ token: DOCUMENT }], target: i0.\u0275\u0275FactoryTarget.Injectable });
  }
  static {
    this.\u0275prov = i0.\u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _Meta, providedIn: "root", useFactory: createMeta, deps: [] });
  }
};
i0.\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: Meta, decorators: [{
  type: Injectable,
  args: [{ providedIn: "root", useFactory: createMeta, deps: [] }]
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: Inject,
  args: [DOCUMENT]
}] }] });
var META_KEYS_MAP = {
  httpEquiv: "http-equiv"
};
function createTitle() {
  return new Title(\u0275\u0275inject(DOCUMENT));
}
var Title = class _Title {
  constructor(_doc) {
    this._doc = _doc;
  }
  /**
   * Get the title of the current HTML document.
   */
  getTitle() {
    return this._doc.title;
  }
  /**
   * Set the title of the current HTML document.
   * @param newTitle
   */
  setTitle(newTitle) {
    this._doc.title = newTitle || "";
  }
  static {
    this.\u0275fac = i0.\u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _Title, deps: [{ token: DOCUMENT }], target: i0.\u0275\u0275FactoryTarget.Injectable });
  }
  static {
    this.\u0275prov = i0.\u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _Title, providedIn: "root", useFactory: createTitle, deps: [] });
  }
};
i0.\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: Title, decorators: [{
  type: Injectable,
  args: [{ providedIn: "root", useFactory: createTitle, deps: [] }]
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: Inject,
  args: [DOCUMENT]
}] }] });
function exportNgVar(name, value) {
  if (typeof COMPILED === "undefined" || !COMPILED) {
    const ng = \u0275global["ng"] = \u0275global["ng"] || {};
    ng[name] = value;
  }
}
var win = typeof window !== "undefined" && window || {};
var ChangeDetectionPerfRecord = class {
  constructor(msPerTick, numTicks) {
    this.msPerTick = msPerTick;
    this.numTicks = numTicks;
  }
};
var AngularProfiler = class {
  constructor(ref) {
    this.appRef = ref.injector.get(ApplicationRef);
  }
  // tslint:disable:no-console
  /**
   * Exercises change detection in a loop and then prints the average amount of
   * time in milliseconds how long a single round of change detection takes for
   * the current state of the UI. It runs a minimum of 5 rounds for a minimum
   * of 500 milliseconds.
   *
   * Optionally, a user may pass a `config` parameter containing a map of
   * options. Supported options are:
   *
   * `record` (boolean) - causes the profiler to record a CPU profile while
   * it exercises the change detector. Example:
   *
   * ```
   * ng.profiler.timeChangeDetection({record: true})
   * ```
   */
  timeChangeDetection(config) {
    const record = config && config["record"];
    const profileName = "Change Detection";
    const isProfilerAvailable = win.console.profile != null;
    if (record && isProfilerAvailable) {
      win.console.profile(profileName);
    }
    const start = performanceNow();
    let numTicks = 0;
    while (numTicks < 5 || performanceNow() - start < 500) {
      this.appRef.tick();
      numTicks++;
    }
    const end = performanceNow();
    if (record && isProfilerAvailable) {
      win.console.profileEnd(profileName);
    }
    const msPerTick = (end - start) / numTicks;
    win.console.log(`ran ${numTicks} change detection cycles`);
    win.console.log(`${msPerTick.toFixed(2)} ms per check`);
    return new ChangeDetectionPerfRecord(msPerTick, numTicks);
  }
};
function performanceNow() {
  return win.performance && win.performance.now ? win.performance.now() : (/* @__PURE__ */ new Date()).getTime();
}
var PROFILER_GLOBAL_NAME = "profiler";
function enableDebugTools(ref) {
  exportNgVar(PROFILER_GLOBAL_NAME, new AngularProfiler(ref));
  return ref;
}
function disableDebugTools() {
  exportNgVar(PROFILER_GLOBAL_NAME, null);
}
var By = class {
  /**
   * Match all nodes.
   *
   * @usageNotes
   * ### Example
   *
   * {@example platform-browser/dom/debug/ts/by/by.ts region='by_all'}
   */
  static all() {
    return () => true;
  }
  /**
   * Match elements by the given CSS selector.
   *
   * @usageNotes
   * ### Example
   *
   * {@example platform-browser/dom/debug/ts/by/by.ts region='by_css'}
   */
  static css(selector) {
    return (debugElement) => {
      return debugElement.nativeElement != null ? elementMatches(debugElement.nativeElement, selector) : false;
    };
  }
  /**
   * Match nodes that have the given directive present.
   *
   * @usageNotes
   * ### Example
   *
   * {@example platform-browser/dom/debug/ts/by/by.ts region='by_directive'}
   */
  static directive(type) {
    return (debugNode) => debugNode.providerTokens.indexOf(type) !== -1;
  }
};
function elementMatches(n, selector) {
  if (\u0275getDOM().isElementNode(n)) {
    return n.matches && n.matches(selector) || n.msMatchesSelector && n.msMatchesSelector(selector) || n.webkitMatchesSelector && n.webkitMatchesSelector(selector);
  }
  return false;
}
var EVENT_NAMES = {
  // pan
  "pan": true,
  "panstart": true,
  "panmove": true,
  "panend": true,
  "pancancel": true,
  "panleft": true,
  "panright": true,
  "panup": true,
  "pandown": true,
  // pinch
  "pinch": true,
  "pinchstart": true,
  "pinchmove": true,
  "pinchend": true,
  "pinchcancel": true,
  "pinchin": true,
  "pinchout": true,
  // press
  "press": true,
  "pressup": true,
  // rotate
  "rotate": true,
  "rotatestart": true,
  "rotatemove": true,
  "rotateend": true,
  "rotatecancel": true,
  // swipe
  "swipe": true,
  "swipeleft": true,
  "swiperight": true,
  "swipeup": true,
  "swipedown": true,
  // tap
  "tap": true,
  "doubletap": true
};
var HAMMER_GESTURE_CONFIG = new InjectionToken("HammerGestureConfig");
var HAMMER_LOADER = new InjectionToken("HammerLoader");
var HammerGestureConfig = class _HammerGestureConfig {
  constructor() {
    this.events = [];
    this.overrides = {};
  }
  /**
   * Creates a [HammerJS Manager](https://hammerjs.github.io/api/#hammermanager)
   * and attaches it to a given HTML element.
   * @param element The element that will recognize gestures.
   * @returns A HammerJS event-manager object.
   */
  buildHammer(element) {
    const mc = new Hammer(element, this.options);
    mc.get("pinch").set({ enable: true });
    mc.get("rotate").set({ enable: true });
    for (const eventName in this.overrides) {
      mc.get(eventName).set(this.overrides[eventName]);
    }
    return mc;
  }
  static {
    this.\u0275fac = i0.\u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _HammerGestureConfig, deps: [], target: i0.\u0275\u0275FactoryTarget.Injectable });
  }
  static {
    this.\u0275prov = i0.\u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _HammerGestureConfig });
  }
};
i0.\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: HammerGestureConfig, decorators: [{
  type: Injectable
}] });
var HammerGesturesPlugin = class _HammerGesturesPlugin extends EventManagerPlugin {
  constructor(doc, _config, console, loader) {
    super(doc);
    this._config = _config;
    this.console = console;
    this.loader = loader;
    this._loaderPromise = null;
  }
  supports(eventName) {
    if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
      return false;
    }
    if (!window.Hammer && !this.loader) {
      if (typeof ngDevMode === "undefined" || ngDevMode) {
        this.console.warn(`The "${eventName}" event cannot be bound because Hammer.JS is not loaded and no custom loader has been specified.`);
      }
      return false;
    }
    return true;
  }
  addEventListener(element, eventName, handler) {
    const zone = this.manager.getZone();
    eventName = eventName.toLowerCase();
    if (!window.Hammer && this.loader) {
      this._loaderPromise = this._loaderPromise || zone.runOutsideAngular(() => this.loader());
      let cancelRegistration = false;
      let deregister = () => {
        cancelRegistration = true;
      };
      zone.runOutsideAngular(() => this._loaderPromise.then(() => {
        if (!window.Hammer) {
          if (typeof ngDevMode === "undefined" || ngDevMode) {
            this.console.warn(`The custom HAMMER_LOADER completed, but Hammer.JS is not present.`);
          }
          deregister = () => {
          };
          return;
        }
        if (!cancelRegistration) {
          deregister = this.addEventListener(element, eventName, handler);
        }
      }).catch(() => {
        if (typeof ngDevMode === "undefined" || ngDevMode) {
          this.console.warn(`The "${eventName}" event cannot be bound because the custom Hammer.JS loader failed.`);
        }
        deregister = () => {
        };
      }));
      return () => {
        deregister();
      };
    }
    return zone.runOutsideAngular(() => {
      const mc = this._config.buildHammer(element);
      const callback = function(eventObj) {
        zone.runGuarded(function() {
          handler(eventObj);
        });
      };
      mc.on(eventName, callback);
      return () => {
        mc.off(eventName, callback);
        if (typeof mc.destroy === "function") {
          mc.destroy();
        }
      };
    });
  }
  isCustomEvent(eventName) {
    return this._config.events.indexOf(eventName) > -1;
  }
  static {
    this.\u0275fac = i0.\u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _HammerGesturesPlugin, deps: [{ token: DOCUMENT }, { token: HAMMER_GESTURE_CONFIG }, { token: i0.\u0275Console }, { token: HAMMER_LOADER, optional: true }], target: i0.\u0275\u0275FactoryTarget.Injectable });
  }
  static {
    this.\u0275prov = i0.\u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _HammerGesturesPlugin });
  }
};
i0.\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: HammerGesturesPlugin, decorators: [{
  type: Injectable
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: Inject,
  args: [DOCUMENT]
}] }, { type: HammerGestureConfig, decorators: [{
  type: Inject,
  args: [HAMMER_GESTURE_CONFIG]
}] }, { type: i0.\u0275Console }, { type: void 0, decorators: [{
  type: Optional
}, {
  type: Inject,
  args: [HAMMER_LOADER]
}] }] });
var HammerModule = class _HammerModule {
  static {
    this.\u0275fac = i0.\u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _HammerModule, deps: [], target: i0.\u0275\u0275FactoryTarget.NgModule });
  }
  static {
    this.\u0275mod = i0.\u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.3", ngImport: i0, type: _HammerModule });
  }
  static {
    this.\u0275inj = i0.\u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _HammerModule, providers: [
      {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: HammerGesturesPlugin,
        multi: true,
        deps: [DOCUMENT, HAMMER_GESTURE_CONFIG, \u0275Console2, [new Optional(), HAMMER_LOADER]]
      },
      { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig, deps: [] }
    ] });
  }
};
i0.\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: HammerModule, decorators: [{
  type: NgModule,
  args: [{
    providers: [
      {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: HammerGesturesPlugin,
        multi: true,
        deps: [DOCUMENT, HAMMER_GESTURE_CONFIG, \u0275Console2, [new Optional(), HAMMER_LOADER]]
      },
      { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig, deps: [] }
    ]
  }]
}] });
var DomSanitizer = class _DomSanitizer {
  static {
    this.\u0275fac = i0.\u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _DomSanitizer, deps: [], target: i0.\u0275\u0275FactoryTarget.Injectable });
  }
  static {
    this.\u0275prov = i0.\u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _DomSanitizer, providedIn: "root", useExisting: i0.forwardRef(() => DomSanitizerImpl) });
  }
};
i0.\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: DomSanitizer, decorators: [{
  type: Injectable,
  args: [{ providedIn: "root", useExisting: forwardRef2(() => DomSanitizerImpl) }]
}] });
function domSanitizerImplFactory(injector) {
  return new DomSanitizerImpl(injector.get(DOCUMENT));
}
var DomSanitizerImpl = class _DomSanitizerImpl extends DomSanitizer {
  constructor(_doc) {
    super();
    this._doc = _doc;
  }
  sanitize(ctx, value) {
    if (value == null)
      return null;
    switch (ctx) {
      case SecurityContext.NONE:
        return value;
      case SecurityContext.HTML:
        if (\u0275allowSanitizationBypassAndThrow(
          value,
          "HTML"
          /* BypassType.Html */
        )) {
          return \u0275unwrapSafeValue(value);
        }
        return \u0275_sanitizeHtml(this._doc, String(value)).toString();
      case SecurityContext.STYLE:
        if (\u0275allowSanitizationBypassAndThrow(
          value,
          "Style"
          /* BypassType.Style */
        )) {
          return \u0275unwrapSafeValue(value);
        }
        return value;
      case SecurityContext.SCRIPT:
        if (\u0275allowSanitizationBypassAndThrow(
          value,
          "Script"
          /* BypassType.Script */
        )) {
          return \u0275unwrapSafeValue(value);
        }
        throw new \u0275RuntimeError(5200, (typeof ngDevMode === "undefined" || ngDevMode) && "unsafe value used in a script context");
      case SecurityContext.URL:
        if (\u0275allowSanitizationBypassAndThrow(
          value,
          "URL"
          /* BypassType.Url */
        )) {
          return \u0275unwrapSafeValue(value);
        }
        return \u0275_sanitizeUrl(String(value));
      case SecurityContext.RESOURCE_URL:
        if (\u0275allowSanitizationBypassAndThrow(
          value,
          "ResourceURL"
          /* BypassType.ResourceUrl */
        )) {
          return \u0275unwrapSafeValue(value);
        }
        throw new \u0275RuntimeError(5201, (typeof ngDevMode === "undefined" || ngDevMode) && `unsafe value used in a resource URL context (see ${\u0275XSS_SECURITY_URL})`);
      default:
        throw new \u0275RuntimeError(5202, (typeof ngDevMode === "undefined" || ngDevMode) && `Unexpected SecurityContext ${ctx} (see ${\u0275XSS_SECURITY_URL})`);
    }
  }
  bypassSecurityTrustHtml(value) {
    return \u0275bypassSanitizationTrustHtml(value);
  }
  bypassSecurityTrustStyle(value) {
    return \u0275bypassSanitizationTrustStyle(value);
  }
  bypassSecurityTrustScript(value) {
    return \u0275bypassSanitizationTrustScript(value);
  }
  bypassSecurityTrustUrl(value) {
    return \u0275bypassSanitizationTrustUrl(value);
  }
  bypassSecurityTrustResourceUrl(value) {
    return \u0275bypassSanitizationTrustResourceUrl(value);
  }
  static {
    this.\u0275fac = i0.\u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _DomSanitizerImpl, deps: [{ token: DOCUMENT }], target: i0.\u0275\u0275FactoryTarget.Injectable });
  }
  static {
    this.\u0275prov = i0.\u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: _DomSanitizerImpl, providedIn: "root", useFactory: domSanitizerImplFactory, deps: [{ token: Injector }] });
  }
};
i0.\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: DomSanitizerImpl, decorators: [{
  type: Injectable,
  args: [{ providedIn: "root", useFactory: domSanitizerImplFactory, deps: [Injector] }]
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: Inject,
  args: [DOCUMENT]
}] }] });
function hydrationFeature(\u0275kind, \u0275providers = [], \u0275options = {}) {
  return { \u0275kind, \u0275providers };
}
function withNoHttpTransferCache() {
  return hydrationFeature(
    0
    /* HydrationFeatureKind.NoHttpTransferCache */
  );
}
function withHttpTransferCacheOptions(options) {
  return hydrationFeature(1, \u0275withHttpTransferCache(options));
}
function provideZoneJsCompatibilityDetector() {
  return [{
    provide: ENVIRONMENT_INITIALIZER,
    useValue: () => {
      const ngZone = inject(NgZone2);
      if (ngZone.constructor !== NgZone2) {
        const console = inject(\u0275Console2);
        const message = \u0275formatRuntimeError(-5e3, "Angular detected that hydration was enabled for an application that uses a custom or a noop Zone.js implementation. This is not yet a fully supported configuration.");
        console.warn(message);
      }
    },
    multi: true
  }];
}
function provideClientHydration(...features) {
  const providers = [];
  const featuresKind = /* @__PURE__ */ new Set();
  const hasHttpTransferCacheOptions = featuresKind.has(
    1
    /* HydrationFeatureKind.HttpTransferCacheOptions */
  );
  for (const { \u0275providers, \u0275kind } of features) {
    featuresKind.add(\u0275kind);
    if (\u0275providers.length) {
      providers.push(\u0275providers);
    }
  }
  if (typeof ngDevMode !== "undefined" && ngDevMode && featuresKind.has(
    0
    /* HydrationFeatureKind.NoHttpTransferCache */
  ) && hasHttpTransferCacheOptions) {
    throw new Error("Configuration error: found both withHttpTransferCacheOptions() and withNoHttpTransferCache() in the same call to provideClientHydration(), which is a contradiction.");
  }
  return makeEnvironmentProviders([
    typeof ngDevMode !== "undefined" && ngDevMode ? provideZoneJsCompatibilityDetector() : [],
    \u0275withDomHydration(),
    featuresKind.has(
      0
      /* HydrationFeatureKind.NoHttpTransferCache */
    ) || hasHttpTransferCacheOptions ? [] : \u0275withHttpTransferCache({}),
    providers
  ]);
}
var VERSION = new Version("17.0.3");
var makeStateKey = makeStateKey$1;
var TransferState = TransferState$1;
export {
  BrowserModule,
  By,
  DomSanitizer,
  EVENT_MANAGER_PLUGINS,
  EventManager,
  EventManagerPlugin,
  HAMMER_GESTURE_CONFIG,
  HAMMER_LOADER,
  HammerGestureConfig,
  HammerModule,
  Meta,
  REMOVE_STYLES_ON_COMPONENT_DESTROY,
  Title,
  TransferState,
  VERSION,
  bootstrapApplication,
  createApplication,
  disableDebugTools,
  enableDebugTools,
  makeStateKey,
  platformBrowser,
  provideClientHydration,
  provideProtractorTestingSupport,
  withHttpTransferCacheOptions,
  withNoHttpTransferCache,
  BrowserDomAdapter as \u0275BrowserDomAdapter,
  BrowserGetTestability as \u0275BrowserGetTestability,
  DomEventsPlugin as \u0275DomEventsPlugin,
  DomRendererFactory2 as \u0275DomRendererFactory2,
  DomSanitizerImpl as \u0275DomSanitizerImpl,
  HammerGesturesPlugin as \u0275HammerGesturesPlugin,
  INTERNAL_BROWSER_PLATFORM_PROVIDERS as \u0275INTERNAL_BROWSER_PLATFORM_PROVIDERS,
  KeyEventsPlugin as \u0275KeyEventsPlugin,
  SharedStylesHost as \u0275SharedStylesHost,
  \u0275getDOM2 as \u0275getDOM,
  initDomAdapter as \u0275initDomAdapter
};
/*! Bundled license information:

@angular/platform-browser/fesm2022/platform-browser.mjs:
  (**
   * @license Angular v17.0.3
   * (c) 2010-2022 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=platform-browser.development.mjs.map