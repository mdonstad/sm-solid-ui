export function bindEvent(target, type, handler) {
    console.log("bindEvent",{target,type,handler})
    target.addEventListener(type, handler);
    return () => {console.log("debind",{target,type}); target.removeEventListener(type, handler);}
}
export const loadm=(url) => {
    const t=document.createElement('script');t.type="module";t.src=url;document.body.append(t);
}
