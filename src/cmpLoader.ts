import {ploadm} from './scripts/util.js'
const cmpLibMap={
    "sl": {name:'Shoelace',version: document.documentElement?.dataset.shoelaceVersion || '2.14.0',url:'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@VERSION/cdn/components/@cmp/@cmp.js/+esm'}
}
const preLoadMap=new Map<string,boolean>();

var observer = new MutationObserver((mutations) => {
    for (const { addedNodes } of mutations) {
      for (const node of addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          discover(node);
        }
      }
    }
});
function tagSupported(tag) {
    const preIdx=tag.indexOf('-');
    let supported=false;
    if (preIdx > 0){
        const prefix=tag.substring(0,preIdx);
        supported=(cmpLibMap[prefix] != null) ? true : false;
    }
    return supported;
}
async function discover(root) {
    const rootTagName = root instanceof Element ? root.tagName.toLowerCase() : "";
    if (rootTagName == null) void 0;
    const rootIsSupportedElement = tagSupported(rootTagName);
    const tags = [...root.querySelectorAll(":not(:defined)")].map((el) => el.tagName.toLowerCase()).filter((tag) => tagSupported(tag));
    if (rootIsSupportedElement) tags.push(rootTagName);
    const tagsToRegister = [...new Set(tags)];
    await Promise.allSettled(tagsToRegister.map((tagName) => register(tagName)));
  }
  function getCompUrlByTag(tag:string) {
    const preIdx=tag.indexOf('-');
    const prefix=tag.substring(0,preIdx);
    const tagWithoutPrefix = tag.substring(preIdx+1);
    const cmp=cmpLibMap[prefix];
    const path=cmp.url.replace('VERSION',cmp.version || '').replaceAll('@cmp',tagWithoutPrefix);
    return path;
  }
  function preloadCmp(tag:string) {
    tag=tag.toLowerCase();
    if (preLoadMap.has(tag) || customElements.get(tag)) return;
    const path=getCompUrlByTag(tag);
    ploadm(path);
    preLoadMap.set(tag,true);
  }
  function register(tagName) {
    if (customElements.get(tagName)) {
      return Promise.resolve();
    }
    const path= getCompUrlByTag(tagName);
    return new Promise((resolve, reject) => {
      import(path).then(() => resolve(customElements.whenDefined(tagName))).catch(() => reject(new Error(`Unable to autoload <${tagName}> from ${path}`)));
    });
  }
  window.setTimeout(async()=>{
    await discover(document.body); const csContent=document.getElementById('cs-content-root');csContent?.classList?.add('ready');
    observer.observe(document.documentElement, { subtree: true, childList: true });
  },1400);

  export {
    discover, preloadCmp
  };