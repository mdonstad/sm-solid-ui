export function bindEvent(target, type, handler) {
    target.addEventListener(type, handler);
    return () => {console.log("debind",{target,type}); target.removeEventListener(type, handler);}
}
export const loadm=(url,esm=false) => {
    const t=document.createElement('script');t.type="module";t.src=esm ? `${url}/+esm` : url;document.body.append(t);
}
export const loadSL=(url,assets,esm=true) => {
    const t=document.createElement('script');t.type="module";if (assets) t.dataset.shoelace=assets; t.src=esm ? `${url}/+esm` : url;document.body.append(t);
}
export const ploadm=(url) => {
    const t=document.createElement('link');t.rel="modulepreload";t.href=url;document.head.append(t);
}
