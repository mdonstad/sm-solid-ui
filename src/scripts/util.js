export function bindEvent(target, type, handler) {
    console.log("bindEvent",{target,type,handler})
    target.addEventListener(type, handler);
    return () => {console.log("debind",{target,type}); target.removeEventListener(type, handler);}
}
