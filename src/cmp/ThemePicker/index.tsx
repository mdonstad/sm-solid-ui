import type { Component } from "solid-js";
import { createEffect, createSignal,Show,createMemo } from "solid-js";
import Icon from '../Icon/Icon'
import styles from './ThemePicker.module.css';
const LIGHT = "light";
const DARK = "dark";

const uTheme=window.localStorage && (window.localStorage.getItem("theme") || 'auto');
let defTh;
const [theme, setTheme] = createSignal(DARK);
const [newIcon, setIcon] = createSignal('moon-stars');




if (uTheme === 'auto') {
    defTh = window.matchMedia(`(prefers-color-scheme: ${DARK})`).matches ? DARK : LIGHT;
    window.matchMedia(`(prefers-color-scheme: ${DARK})`).addEventListener("change", event => {let tmp=event.matches ? DARK : LIGHT;setTheme(tmp) });
}else defTh=uTheme;
setTheme(defTh);


const ThemePicker: Component<{}> = (p) => {

    function handleClick() {
        setTheme(theme() === DARK ? LIGHT : DARK);
    }
    createEffect(() => {
        let cur=theme();
        window.localStorage.setItem("theme", cur);
        const isDark = (cur === DARK);
        if (isDark) setIcon('moon-stars');
        else setIcon('sun-bright');
        document.documentElement.classList.toggle("sl-theme-dark",isDark)
        document.documentElement.classList.toggle("sl-theme-light",!isDark);
    });

  return(
    <Show when={theme() === DARK} fallback={
        <button class={styles.ThemePicker} title="Light Mode" data-theme={"light"} onClick={handleClick}>
            <Icon icon={"sun-bright"} color="var('--sl-color-amber-500')" />
        </button>
    }>
    <button class={styles.ThemePicker} title="Dark Mode" data-theme={theme()} onClick={handleClick}>
        <Icon icon={"moon-stars"}  />
    </button></Show>)
};

export default ThemePicker;