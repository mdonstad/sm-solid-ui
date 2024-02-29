export function bindEvent(target, type, handler) {
    console.log("bindEvent",{target,type,handler})
    target.addEventListener(type, handler);
    return () => {console.log("debind",{target,type}); target.removeEventListener(type, handler);}
}
export const loadm=(url) => {
    const t=document.createElement('script');t.type="module";t.dataset.shoelace="/dist/assets/shoelace";t.src=url;document.body.append(t);
}
export const ploadm=(url) => {
    const t=document.createElement('link');t.rel="modulepreload";t.href=url;document.head.append(t);
}
