!function(){"use strict";function e(e,t,n,r,o,l){return{tag:e,key:t,attrs:n,children:r,text:o,dom:l,domSize:void 0,state:void 0,events:void 0,instance:void 0}}e.normalize=function(t){return Array.isArray(t)?e("[",void 0,void 0,e.normalizeChildren(t),void 0,void 0):null==t||"boolean"==typeof t?null:"object"==typeof t?t:e("#",void 0,void 0,String(t),void 0,void 0)},e.normalizeChildren=function(t){var n=[];if(t.length){for(var r=null!=t[0]&&null!=t[0].key,o=1;o<t.length;o++)if((null!=t[o]&&null!=t[o].key)!==r)throw new TypeError(!r||null==t[o]&&"boolean"!=typeof t[o]?"In fragments, vnodes must either all have keys or none have keys.":"In fragments, vnodes must either all have keys or none have keys. You may wish to consider using an explicit keyed empty fragment, m.fragment({key: ...}), instead of a hole.");for(o=0;o<t.length;o++)n[o]=e.normalize(t[o])}return n};var t=function(){var t,n=arguments[this],r=this+1;if(null==n?n={}:("object"!=typeof n||null!=n.tag||Array.isArray(n))&&(n={},r=this),arguments.length===r+1)t=arguments[r],Array.isArray(t)||(t=[t]);else for(t=[];r<arguments.length;)t.push(arguments[r++]);return e("",n.key,n,t)},n={}.hasOwnProperty,r=/(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,o={};function l(e){for(var t in e)if(n.call(e,t))return!1;return!0}function i(e){for(var t,n="div",l=[],i={};t=r.exec(e);){var a=t[1],u=t[2];if(""===a&&""!==u)n=u;else if("#"===a)i.id=u;else if("."===a)l.push(u);else if("["===t[3][0]){var s=t[6];s&&(s=s.replace(/\\(["'])/g,"$1").replace(/\\\\/g,"\\")),"class"===t[4]?l.push(s):i[t[4]]=""===s?s:s||!0}}return l.length>0&&(i.className=l.join(" ")),o[e]={tag:n,attrs:i}}function a(e,t){var r=t.attrs,o=n.call(r,"class"),i=o?r.class:r.className;if(t.tag=e.tag,t.attrs={},!l(e.attrs)&&!l(r)){var a={};for(var u in r)n.call(r,u)&&(a[u]=r[u]);r=a}for(var u in e.attrs)n.call(e.attrs,u)&&"className"!==u&&!n.call(r,u)&&(r[u]=e.attrs[u]);for(var u in null==i&&null==e.attrs.className||(r.className=null!=i?null!=e.attrs.className?String(e.attrs.className)+" "+String(i):i:null!=e.attrs.className?e.attrs.className:null),o&&(r.class=null),r)if(n.call(r,u)&&"key"!==u){t.attrs=r;break}return t}function u(n){if(null==n||"string"!=typeof n&&"function"!=typeof n&&"function"!=typeof n.view)throw Error("The selector must be either a string or a component.");var r=t.apply(1,arguments);return"string"==typeof n&&(r.children=e.normalizeChildren(r.children),"["!==n)?a(o[n]||i(n),r):(r.tag=n,r)}u.trust=function(t){return null==t&&(t=""),e("<",void 0,void 0,t,void 0,void 0)},u.fragment=function(){var n=t.apply(0,arguments);return n.tag="[",n.children=e.normalizeChildren(n.children),n};var s=new WeakMap;var f={delayedRemoval:s,domFor:function*({dom:e,domSize0:t},{generation0:n}={}){if(null!=e)do{const{nextSibling:r}=e;s.get(e)===n&&(yield e,t--),e=r}while(t)}},c=f.delayedRemoval,d=f.domFor,p=function(t){var n,r,o=t&&t.document,l={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"};function i(e){return e.attrs&&e.attrs.xmlns||l[e.tag]}function a(e,t){if(e.state!==t)throw new Error("'vnode.state' must not be modified.")}function u(e){var t=e.state;try{return this.apply(t,arguments)}finally{a(e,t)}}function s(){try{return o.activeElement}catch(e){return null}}function f(e,t,n,r,o,l,i){for(var a=n;a<r;a++){var u=t[a];null!=u&&p(e,u,o,i,l)}}function p(t,n,r,l,a){var s=n.tag;if("string"==typeof s)switch(n.state={},null!=n.attrs&&D(n.attrs,n,r),s){case"#":!function(e,t,n){t.dom=o.createTextNode(t.children),k(e,t.dom,n)}(t,n,a);break;case"<":v(t,n,l,a);break;case"[":!function(e,t,n,r,l){var i=o.createDocumentFragment();if(null!=t.children){var a=t.children;f(i,a,0,a.length,n,null,r)}t.dom=i.firstChild,t.domSize=i.childNodes.length,k(e,i,l)}(t,n,r,l,a);break;default:!function(e,t,n,r,l){var a=t.tag,u=t.attrs,s=u&&u.is,c=(r=i(t)||r)?s?o.createElementNS(r,a,{is:s}):o.createElementNS(r,a):s?o.createElement(a,{is:s}):o.createElement(a);t.dom=c,null!=u&&function(e,t,n){"input"===e.tag&&null!=t.type&&e.dom.setAttribute("type",t.type);var r=null!=t&&"input"===e.tag&&"file"===t.type;for(var o in t)C(e,o,null,t[o],n,r)}(t,u,r);if(k(e,c,l),!S(t)&&null!=t.children){var d=t.children;f(c,d,0,d.length,n,null,r),"select"===t.tag&&null!=u&&function(e,t){if("value"in t)if(null===t.value)-1!==e.dom.selectedIndex&&(e.dom.value=null);else{var n=""+t.value;e.dom.value===n&&-1!==e.dom.selectedIndex||(e.dom.value=n)}"selectedIndex"in t&&C(e,"selectedIndex",null,t.selectedIndex,void 0)}(t,u)}}(t,n,r,l,a)}else!function(t,n,r,o,l){(function(t,n){var r;if("function"==typeof t.tag.view){if(t.state=Object.create(t.tag),null!=(r=t.state.view).$$reentrantLock$$)return;r.$$reentrantLock$$=!0}else{if(t.state=void 0,null!=(r=t.tag).$$reentrantLock$$)return;r.$$reentrantLock$$=!0,t.state=null!=t.tag.prototype&&"function"==typeof t.tag.prototype.view?new t.tag(t):t.tag(t)}D(t.state,t,n),null!=t.attrs&&D(t.attrs,t,n);if(t.instance=e.normalize(u.call(t.state.view,t)),t.instance===t)throw Error("A view cannot return the vnode it received as argument");r.$$reentrantLock$$=null})(n,r),null!=n.instance?(p(t,n.instance,r,o,l),n.dom=n.instance.dom,n.domSize=null!=n.dom?n.instance.domSize:0):n.domSize=0}(t,n,r,l,a)}var m={caption:"table",thead:"table",tbody:"table",tfoot:"table",tr:"tbody",th:"tr",td:"tr",colgroup:"table",col:"colgroup"};function v(e,t,n,r){var l=t.children.match(/^\s*?<(\w+)/im)||[],i=o.createElement(m[l[1]]||"div");"http://www.w3.org/2000/svg"===n?(i.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+t.children+"</svg>",i=i.firstChild):i.innerHTML=t.children,t.dom=i.firstChild,t.domSize=i.childNodes.length;for(var a,u=o.createDocumentFragment();a=i.firstChild;)u.appendChild(a);k(e,u,r)}function h(e,t,n,r,o,l){if(t!==n&&(null!=t||null!=n))if(null==t||0===t.length)f(e,n,0,n.length,r,o,l);else if(null==n||0===n.length)E(e,t,0,t.length);else{var i=null!=t[0]&&null!=t[0].key,a=null!=n[0]&&null!=n[0].key,u=0,s=0;if(!i)for(;s<t.length&&null==t[s];)s++;if(!a)for(;u<n.length&&null==n[u];)u++;if(i!==a)E(e,t,s,t.length),f(e,n,u,n.length,r,o,l);else if(a){for(var c,d,m,v,h,k=t.length-1,S=n.length-1;k>=s&&S>=u&&(m=t[k],v=n[S],m.key===v.key);)m!==v&&y(e,m,v,r,o,l),null!=v.dom&&(o=v.dom),k--,S--;for(;k>=s&&S>=u&&(c=t[s],d=n[u],c.key===d.key);)s++,u++,c!==d&&y(e,c,d,r,b(t,s,o),l);for(;k>=s&&S>=u&&u!==S&&c.key===v.key&&m.key===d.key;)x(e,m,h=b(t,s,o)),m!==d&&y(e,m,d,r,h,l),++u<=--S&&x(e,c,o),c!==v&&y(e,c,v,r,o,l),null!=v.dom&&(o=v.dom),s++,m=t[--k],v=n[S],c=t[s],d=n[u];for(;k>=s&&S>=u&&m.key===v.key;)m!==v&&y(e,m,v,r,o,l),null!=v.dom&&(o=v.dom),S--,m=t[--k],v=n[S];if(u>S)E(e,t,s,k+1);else if(s>k)f(e,n,u,S+1,r,o,l);else{var j,A,C=o,O=S-u+1,T=new Array(O),N=0,$=0,L=2147483647,R=0;for($=0;$<O;$++)T[$]=-1;for($=S;$>=u;$--){null==j&&(j=g(t,s,k+1));var I=j[(v=n[$]).key];null!=I&&(L=I<L?I:-1,T[$-u]=I,m=t[I],t[I]=null,m!==v&&y(e,m,v,r,o,l),null!=v.dom&&(o=v.dom),R++)}if(o=C,R!==k-s+1&&E(e,t,s,k+1),0===R)f(e,n,u,S+1,r,o,l);else if(-1===L)for(N=(A=function(e){var t=[0],n=0,r=0,o=0,l=w.length=e.length;for(o=0;o<l;o++)w[o]=e[o];for(o=0;o<l;++o)if(-1!==e[o]){var i=t[t.length-1];if(e[i]<e[o])w[o]=i,t.push(o);else{for(n=0,r=t.length-1;n<r;){var a=(n>>>1)+(r>>>1)+(n&r&1);e[t[a]]<e[o]?n=a+1:r=a}e[o]<e[t[n]]&&(n>0&&(w[o]=t[n-1]),t[n]=o)}}n=t.length,r=t[n-1];for(;n-- >0;)t[n]=r,r=w[r];return w.length=0,t}(T)).length-1,$=S;$>=u;$--)d=n[$],-1===T[$-u]?p(e,d,r,l,o):A[N]===$-u?N--:x(e,d,o),null!=d.dom&&(o=n[$].dom);else for($=S;$>=u;$--)d=n[$],-1===T[$-u]&&p(e,d,r,l,o),null!=d.dom&&(o=n[$].dom)}}else{var P=t.length<n.length?t.length:n.length;for(u=u<s?u:s;u<P;u++)(c=t[u])===(d=n[u])||null==c&&null==d||(null==c?p(e,d,r,l,b(t,u+1,o)):null==d?z(e,c):y(e,c,d,r,b(t,u+1,o),l));t.length>P&&E(e,t,u,t.length),n.length>P&&f(e,n,u,n.length,r,o,l)}}}function y(t,n,r,o,l,a){var s=n.tag;if(s===r.tag){if(r.state=n.state,r.events=n.events,function(e,t){do{var n;if(null!=e.attrs&&"function"==typeof e.attrs.onbeforeupdate)if(void 0!==(n=u.call(e.attrs.onbeforeupdate,e,t))&&!n)break;if("string"!=typeof e.tag&&"function"==typeof e.state.onbeforeupdate)if(void 0!==(n=u.call(e.state.onbeforeupdate,e,t))&&!n)break;return!1}while(0);return e.dom=t.dom,e.domSize=t.domSize,e.instance=t.instance,e.attrs=t.attrs,e.children=t.children,e.text=t.text,!0}(r,n))return;if("string"==typeof s)switch(null!=r.attrs&&M(r.attrs,r,o),s){case"#":!function(e,t){e.children.toString()!==t.children.toString()&&(e.dom.nodeValue=t.children);t.dom=e.dom}(n,r);break;case"<":!function(e,t,n,r,o){t.children!==n.children?(j(e,t,void 0),v(e,n,r,o)):(n.dom=t.dom,n.domSize=t.domSize)}(t,n,r,a,l);break;case"[":!function(e,t,n,r,o,l){h(e,t.children,n.children,r,o,l);var i=0,a=n.children;if(n.dom=null,null!=a){for(var u=0;u<a.length;u++){var s=a[u];null!=s&&null!=s.dom&&(null==n.dom&&(n.dom=s.dom),i+=s.domSize||1)}1!==i&&(n.domSize=i)}}(t,n,r,o,l,a);break;default:!function(e,t,n,r){var o=t.dom=e.dom;r=i(t)||r,"textarea"===t.tag&&null==t.attrs&&(t.attrs={});(function(e,t,n,r){t&&t===n&&console.warn("Don't reuse attrs object, use new object for every redraw, this will throw in next major");if(null!=n){"input"===e.tag&&null!=n.type&&e.dom.setAttribute("type",n.type);var o="input"===e.tag&&"file"===n.type;for(var l in n)C(e,l,t&&t[l],n[l],r,o)}var i;if(null!=t)for(var l in t)null==(i=t[l])||null!=n&&null!=n[l]||O(e,l,i,r)})(t,e.attrs,t.attrs,r),S(t)||h(o,e.children,t.children,n,null,r)}(n,r,o,a)}else!function(t,n,r,o,l,i){if(r.instance=e.normalize(u.call(r.state.view,r)),r.instance===r)throw Error("A view cannot return the vnode it received as argument");M(r.state,r,o),null!=r.attrs&&M(r.attrs,r,o);null!=r.instance?(null==n.instance?p(t,r.instance,o,i,l):y(t,n.instance,r.instance,o,l,i),r.dom=r.instance.dom,r.domSize=r.instance.domSize):null!=n.instance?(z(t,n.instance),r.dom=void 0,r.domSize=0):(r.dom=n.dom,r.domSize=n.domSize)}(t,n,r,o,l,a)}else z(t,n),p(t,r,o,a,l)}function g(e,t,n){for(var r=Object.create(null);t<n;t++){var o=e[t];if(null!=o){var l=o.key;null!=l&&(r[l]=t)}}return r}var w=[];function b(e,t,n){for(;t<e.length;t++)if(null!=e[t]&&null!=e[t].dom)return e[t].dom;return n}function x(e,t,n){if(null!=t.dom){var r;if(null==t.domSize)r=t.dom;else for(var l of(r=o.createDocumentFragment(),d(t)))r.appendChild(l);k(e,r,n)}}function k(e,t,n){null!=n?e.insertBefore(t,n):e.appendChild(t)}function S(e){if(null==e.attrs||null==e.attrs.contenteditable&&null==e.attrs.contentEditable)return!1;var t=e.children;if(null!=t&&1===t.length&&"<"===t[0].tag){var n=t[0].children;e.dom.innerHTML!==n&&(e.dom.innerHTML=n)}else if(null!=t&&0!==t.length)throw new Error("Child node of a contenteditable must be trusted.");return!0}function E(e,t,n,r){for(var o=n;o<r;o++){var l=t[o];null!=l&&z(e,l)}}function z(e,t){var n,o,l,i,s=0,f=t.state;"string"!=typeof t.tag&&"function"==typeof t.state.onbeforeremove&&(null!=(l=u.call(t.state.onbeforeremove,t))&&"function"==typeof l.then&&(s=1,n=l));t.attrs&&"function"==typeof t.attrs.onbeforeremove&&(null!=(l=u.call(t.attrs.onbeforeremove,t))&&"function"==typeof l.then&&(s|=2,o=l));if(a(t,f),s){for(var p of(i=r,d(t)))c.set(p,i);null!=n&&n.finally((function(){1&s&&((s&=2)||(a(t,f),A(t),j(e,t,i)))})),null!=o&&o.finally((function(){2&s&&((s&=1)||(a(t,f),A(t),j(e,t,i)))}))}else A(t),j(e,t,i)}function j(e,t,n){if(null!=t.dom)if(null==t.domSize)c.get(t.dom)===n&&e.removeChild(t.dom);else for(var r of d(t,{generation:n}))e.removeChild(r)}function A(e){if("string"!=typeof e.tag&&"function"==typeof e.state.onremove&&u.call(e.state.onremove,e),e.attrs&&"function"==typeof e.attrs.onremove&&u.call(e.attrs.onremove,e),"string"!=typeof e.tag)null!=e.instance&&A(e.instance);else{var t=e.children;if(Array.isArray(t))for(var n=0;n<t.length;n++){var r=t[n];null!=r&&A(r)}}}function C(e,t,n,r,l,i){if(!("key"===t||"is"===t||null==r||T(t)||n===r&&!function(e,t){return"value"===t||"checked"===t||"selectedIndex"===t||"selected"===t&&e.dom===s()||"option"===e.tag&&e.dom.parentNode===o.activeElement}(e,t)&&"object"!=typeof r||"type"===t&&"input"===e.tag)){if("o"===t[0]&&"n"===t[1])return _(e,t,r);if("xlink:"===t.slice(0,6))e.dom.setAttributeNS("http://www.w3.org/1999/xlink",t.slice(6),r);else if("style"===t)P(e.dom,n,r);else if(N(e,t,l)){if("value"===t){if(("input"===e.tag||"textarea"===e.tag)&&e.dom.value===""+r&&(i||e.dom===s()))return;if("select"===e.tag&&null!==n&&e.dom.value===""+r)return;if("option"===e.tag&&null!==n&&e.dom.value===""+r)return;if(i&&""+r!="")return void console.error("`value` is read-only on file inputs!")}e.dom[t]=r}else"boolean"==typeof r?r?e.dom.setAttribute(t,""):e.dom.removeAttribute(t):e.dom.setAttribute("className"===t?"class":t,r)}}function O(e,t,n,r){if("key"!==t&&"is"!==t&&null!=n&&!T(t))if("o"===t[0]&&"n"===t[1])_(e,t,void 0);else if("style"===t)P(e.dom,n,null);else if(!N(e,t,r)||"className"===t||"title"===t||"value"===t&&("option"===e.tag||"select"===e.tag&&-1===e.dom.selectedIndex&&e.dom===s())||"input"===e.tag&&"type"===t){var o=t.indexOf(":");-1!==o&&(t=t.slice(o+1)),!1!==n&&e.dom.removeAttribute("className"===t?"class":t)}else e.dom[t]=null}function T(e){return"oninit"===e||"oncreate"===e||"onupdate"===e||"onremove"===e||"onbeforeremove"===e||"onbeforeupdate"===e}function N(e,t,n){return void 0===n&&(e.tag.indexOf("-")>-1||null!=e.attrs&&e.attrs.is||"href"!==t&&"list"!==t&&"form"!==t&&"width"!==t&&"height"!==t)&&t in e.dom}var $,L=/[A-Z]/g;function R(e){return"-"+e.toLowerCase()}function I(e){return"-"===e[0]&&"-"===e[1]?e:"cssFloat"===e?"float":e.replace(L,R)}function P(e,t,n){if(t===n);else if(null==n)e.style="";else if("object"!=typeof n)e.style=n;else if(null==t||"object"!=typeof t)for(var r in e.style.cssText="",n){null!=(o=n[r])&&e.style.setProperty(I(r),String(o))}else{for(var r in n){var o;null!=(o=n[r])&&(o=String(o))!==String(t[r])&&e.style.setProperty(I(r),o)}for(var r in t)null!=t[r]&&null==n[r]&&e.style.removeProperty(I(r))}}function F(){this._=n}function _(e,t,r){if(null!=e.events){if(e.events._=n,e.events[t]===r)return;null==r||"function"!=typeof r&&"object"!=typeof r?(null!=e.events[t]&&e.dom.removeEventListener(t.slice(2),e.events,!1),e.events[t]=void 0):(null==e.events[t]&&e.dom.addEventListener(t.slice(2),e.events,!1),e.events[t]=r)}else null==r||"function"!=typeof r&&"object"!=typeof r||(e.events=new F,e.dom.addEventListener(t.slice(2),e.events,!1),e.events[t]=r)}function D(e,t,n){"function"==typeof e.oninit&&u.call(e.oninit,t),"function"==typeof e.oncreate&&n.push(u.bind(e.oncreate,t))}function M(e,t,n){"function"==typeof e.onupdate&&n.push(u.bind(e.onupdate,t))}return F.prototype=Object.create(null),F.prototype.handleEvent=function(e){var t,n=this["on"+e.type];"function"==typeof n?t=n.call(e.currentTarget,e):"function"==typeof n.handleEvent&&n.handleEvent(e),this._&&!1!==e.redraw&&(0,this._)(),!1===t&&(e.preventDefault(),e.stopPropagation())},function(t,o,l){if(!t)throw new TypeError("DOM element being rendered to does not exist.");if(null!=$&&t.contains($))throw new TypeError("Node is currently being rendered to and thus is locked.");var i=n,a=$,u=[],f=s(),c=t.namespaceURI;$=t,n="function"==typeof l?l:void 0,r={};try{null==t.vnodes&&(t.textContent=""),o=e.normalizeChildren(Array.isArray(o)?o:[o]),h(t,t.vnodes,o,u,null,"http://www.w3.org/1999/xhtml"===c?void 0:c),t.vnodes=o,null!=f&&s()!==f&&"function"==typeof f.focus&&f.focus();for(var d=0;d<u.length;d++)u[d]()}finally{n=i,$=a}}}("undefined"!=typeof window?window:null),m=function(t,n,r){var o=[],l=!1,i=-1;function a(){for(i=0;i<o.length;i+=2)try{t(o[i],e(o[i+1]),u)}catch(e){r.error(e)}i=-1}function u(){l||(l=!0,n((function(){l=!1,a()})))}return u.sync=a,{mount:function(n,r){if(null!=r&&null==r.view&&"function"!=typeof r)throw new TypeError("m.mount expects a component, not a vnode.");var l=o.indexOf(n);l>=0&&(o.splice(l,2),l<=i&&(i-=2),t(n,[])),null!=r&&(o.push(n,r),t(n,e(r),u))},redraw:u}}(p,"undefined"!=typeof requestAnimationFrame?requestAnimationFrame:null,"undefined"!=typeof console?console:null),v=function(e){if("[object Object]"!==Object.prototype.toString.call(e))return"";var t=[];for(var n in e)r(n,e[n]);return t.join("&");function r(e,n){if(Array.isArray(n))for(var o=0;o<n.length;o++)r(e+"["+o+"]",n[o]);else if("[object Object]"===Object.prototype.toString.call(n))for(var o in n)r(e+"["+o+"]",n[o]);else t.push(encodeURIComponent(e)+(null!=n&&""!==n?"="+encodeURIComponent(n):""))}},h=Object.assign||function(e,t){for(var r in t)n.call(t,r)&&(e[r]=t[r])},y=function(e,t){if(/:([^\/\.-]+)(\.{3})?:/.test(e))throw new SyntaxError("Template parameter names must be separated by either a '/', '-', or '.'.");if(null==t)return e;var n=e.indexOf("?"),r=e.indexOf("#"),o=r<0?e.length:r,l=n<0?o:n,i=e.slice(0,l),a={};h(a,t);var u=i.replace(/:([^\/\.-]+)(\.{3})?/g,(function(e,n,r){return delete a[n],null==t[n]?e:r?t[n]:encodeURIComponent(String(t[n]))})),s=u.indexOf("?"),f=u.indexOf("#"),c=f<0?u.length:f,d=s<0?c:s,p=u.slice(0,d);n>=0&&(p+=e.slice(n,o)),s>=0&&(p+=(n<0?"?":"&")+u.slice(s,c));var m=v(a);return m&&(p+=(n<0&&s<0?"?":"&")+m),r>=0&&(p+=e.slice(r)),f>=0&&(p+=(r<0?"":"&")+u.slice(f)),p},g=function(e,t){function r(e){return new Promise(e)}function o(e,t){for(var r in e.headers)if(n.call(e.headers,r)&&r.toLowerCase()===t)return!0;return!1}return r.prototype=Promise.prototype,r.__proto__=Promise,{request:function(l,i){"string"!=typeof l?(i=l,l=l.url):null==i&&(i={});var a=function(t,r){return new Promise((function(l,i){t=y(t,r.params);var a,u=null!=r.method?r.method.toUpperCase():"GET",s=r.body,f=(null==r.serialize||r.serialize===JSON.serialize)&&!(s instanceof e.FormData||s instanceof e.URLSearchParams),c=r.responseType||("function"==typeof r.extract?"":"json"),d=new e.XMLHttpRequest,p=!1,m=!1,v=d,h=d.abort;for(var g in d.abort=function(){p=!0,h.call(this)},d.open(u,t,!1!==r.async,"string"==typeof r.user?r.user:void 0,"string"==typeof r.password?r.password:void 0),f&&null!=s&&!o(r,"content-type")&&d.setRequestHeader("Content-Type","application/json; charset=utf-8"),"function"==typeof r.deserialize||o(r,"accept")||d.setRequestHeader("Accept","application/json, text/*"),r.withCredentials&&(d.withCredentials=r.withCredentials),r.timeout&&(d.timeout=r.timeout),d.responseType=c,r.headers)n.call(r.headers,g)&&d.setRequestHeader(g,r.headers[g]);d.onreadystatechange=function(e){if(!p&&4===e.target.readyState)try{var n,o=e.target.status>=200&&e.target.status<300||304===e.target.status||/^file:\/\//i.test(t),a=e.target.response;if("json"===c){if(!e.target.responseType&&"function"!=typeof r.extract)try{a=JSON.parse(e.target.responseText)}catch(e){a=null}}else c&&"text"!==c||null==a&&(a=e.target.responseText);if("function"==typeof r.extract?(a=r.extract(e.target,r),o=!0):"function"==typeof r.deserialize&&(a=r.deserialize(a)),o){if("function"==typeof r.type)if(Array.isArray(a))for(var u=0;u<a.length;u++)a[u]=new r.type(a[u]);else a=new r.type(a);l(a)}else{var s=function(){try{n=e.target.responseText}catch(e){n=a}var t=new Error(n);t.code=e.target.status,t.response=a,i(t)};0===d.status?setTimeout((function(){m||s()})):s()}}catch(e){i(e)}},d.ontimeout=function(e){m=!0;var t=new Error("Request timed out");t.code=e.target.status,i(t)},"function"==typeof r.config&&(d=r.config(d,r,t)||d)!==v&&(a=d.abort,d.abort=function(){p=!0,a.call(this)}),null==s?d.send():"function"==typeof r.serialize?d.send(r.serialize(s)):s instanceof e.FormData||s instanceof e.URLSearchParams?d.send(s):d.send(JSON.stringify(s))}))}(l,i);if(!0===i.background)return a;var u=0;function s(){0==--u&&"function"==typeof t&&t()}return function e(t){var n=t.then;return t.constructor=r,t.then=function(){u++;var r=n.apply(t,arguments);return r.then(s,(function(e){if(s(),0===u)throw e})),e(r)},t}(a)}}}("undefined"!=typeof window?window:null,m.redraw),w=m,b=f,x=function(){return u.apply(this,arguments)};x.m=u,x.trust=u.trust,x.fragment=u.fragment,x.Fragment="[",x.mount=w.mount;var k=u;function S(e){try{return decodeURIComponent(e)}catch(t){return e}}var E=function(e){if(""===e||null==e)return{};"?"===e.charAt(0)&&(e=e.slice(1));for(var t=e.split("&"),n={},r={},o=0;o<t.length;o++){var l=t[o].split("="),i=S(l[0]),a=2===l.length?S(l[1]):"";"true"===a?a=!0:"false"===a&&(a=!1);var u=i.split(/\]\[?|\[/),s=r;i.indexOf("[")>-1&&u.pop();for(var f=0;f<u.length;f++){var c=u[f],d=u[f+1],p=""==d||!isNaN(parseInt(d,10));if(""===c)null==n[i=u.slice(0,f).join()]&&(n[i]=Array.isArray(s)?s.length:0),c=n[i]++;else if("__proto__"===c)break;if(f===u.length-1)s[c]=a;else{var m=Object.getOwnPropertyDescriptor(s,c);null!=m&&(m=m.value),null==m&&(s[c]=m=p?[]:{}),s=m}}}return r},z=function(e){var t=e.indexOf("?"),n=e.indexOf("#"),r=n<0?e.length:n,o=t<0?r:t,l=e.slice(0,o).replace(/\/{2,}/g,"/");return l?"/"!==l[0]&&(l="/"+l):l="/",{path:l,params:t<0?{}:E(e.slice(t+1,r))}},j=new RegExp("^(?:key|oninit|oncreate|onbeforeupdate|onupdate|onbeforeremove|onremove)$"),A=function(e,t){var r={};if(null!=t)for(var o in e)n.call(e,o)&&!j.test(o)&&t.indexOf(o)<0&&(r[o]=e[o]);else for(var o in e)n.call(e,o)&&!j.test(o)&&(r[o]=e[o]);return r},C={};function O(e){try{return decodeURIComponent(e)}catch(t){return e}}x.route=function(t,n){var r,o,l,i,a,u,s=null==t?null:"function"==typeof t.setImmediate?t.setImmediate:t.setTimeout,f=Promise.resolve(),c=!1,d=!1,p=0,m=C,v={onbeforeupdate:function(){return!(!(p=p?2:1)||C===m)},onremove:function(){t.removeEventListener("popstate",b,!1),t.removeEventListener("hashchange",w,!1)},view:function(){if(p&&C!==m){var t=[e(l,i.key,i)];return m&&(t=m.render(t[0])),t}}},g=S.SKIP={};function w(){c=!1;var e=t.location.hash;"#"!==S.prefix[0]&&(e=t.location.search+e,"?"!==S.prefix[0]&&"/"!==(e=t.location.pathname+e)[0]&&(e="/"+e));var s=e.concat().replace(/(?:%[a-f89][a-f0-9])+/gim,O).slice(S.prefix.length),d=z(s);function v(e){console.error(e),x(o,null,{replace:!0})}h(d.params,t.history.state),function e(t){for(;t<r.length;t++)if(r[t].check(d)){var c=r[t].component,h=r[t].route,y=c,w=u=function(r){if(w===u){if(r===g)return e(t+1);l=null==r||"function"!=typeof r.view&&"function"!=typeof r?"div":r,i=d.params,a=s,u=null,m=c.render?c:null,2===p?n.redraw():(p=2,n.redraw.sync())}};return void(c.view||"function"==typeof c?(c={},w(y)):c.onmatch?f.then((function(){return c.onmatch(d.params,s,h)})).then(w,s===o?null:v):w("div"))}if(s===o)throw new Error("Could not resolve default route "+o+".");x(o,null,{replace:!0})}(0)}function b(){c||(c=!0,s(w))}function x(e,n,r){if(e=y(e,n),d){b();var o=r?r.state:null,l=r?r.title:null;r&&r.replace?t.history.replaceState(o,l,S.prefix+e):t.history.pushState(o,l,S.prefix+e)}else t.location.href=S.prefix+e}function S(e,l,i){if(!e)throw new TypeError("DOM element being rendered to does not exist.");if(r=Object.keys(i).map((function(e){if("/"!==e[0])throw new SyntaxError("Routes must start with a '/'.");if(/:([^\/\.-]+)(\.{3})?:/.test(e))throw new SyntaxError("Route parameter names must be separated with either '/', '.', or '-'.");return{route:e,component:i[e],check:(t=e,n=z(t),r=Object.keys(n.params),o=[],l=new RegExp("^"+n.path.replace(/:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,(function(e,t,n){return null==t?"\\"+e:(o.push({k:t,r:"..."===n}),"..."===n?"(.*)":"."===n?"([^/]+)\\.":"([^/]+)"+(n||""))}))+"$"),function(e){for(var t=0;t<r.length;t++)if(n.params[r[t]]!==e.params[r[t]])return!1;if(!o.length)return l.test(e.path);var i=l.exec(e.path);if(null==i)return!1;for(t=0;t<o.length;t++)e.params[o[t].k]=o[t].r?i[t+1]:decodeURIComponent(i[t+1]);return!0})};var t,n,r,o,l})),o=l,null!=l){var a=z(l);if(!r.some((function(e){return e.check(a)})))throw new ReferenceError("Default route doesn't match any known routes.")}"function"==typeof t.history.pushState?t.addEventListener("popstate",b,!1):"#"===S.prefix[0]&&t.addEventListener("hashchange",w,!1),d=!0,n.mount(e,v),w()}return S.set=function(e,t,n){null!=u&&((n=n||{}).replace=!0),u=null,x(e,t,n)},S.get=function(){return a},S.prefix="#!",S.Link={view:function(e){var t,n,r,o=k(e.attrs.selector||"a",A(e.attrs,["options","params","selector","onclick"]),e.children);return(o.attrs.disabled=Boolean(o.attrs.disabled))?(o.attrs.href=null,o.attrs["aria-disabled"]="true"):(t=e.attrs.options,n=e.attrs.onclick,r=y(o.attrs.href,e.attrs.params),o.attrs.href=S.prefix+r,o.attrs.onclick=function(e){var o;"function"==typeof n?o=n.call(e.currentTarget,e):null==n||"object"!=typeof n||"function"==typeof n.handleEvent&&n.handleEvent(e),!1===o||e.defaultPrevented||0!==e.button&&0!==e.which&&1!==e.which||e.currentTarget.target&&"_self"!==e.currentTarget.target||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||(e.preventDefault(),e.redraw=!1,S.set(r,null,t))}),o}},S.param=function(e){return i&&null!=e?i[e]:i},S}("undefined"!=typeof window?window:null,w),x.render=p,x.redraw=w.redraw,x.request=g.request,x.parseQueryString=E,x.buildQueryString=v,x.parsePathname=z,x.buildPathname=y,x.vnode=e,x.censor=A,x.domFor=b.domFor,"undefined"!=typeof module?module.exports=x:window.m=x}();