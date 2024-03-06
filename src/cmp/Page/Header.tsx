
import { Component } from "solid-js";
import styles from './Header.module.css';
import {createSignal,Show} from "solid-js";
import Toggle from '../Button/ButtonToggle'
import Drawer from '../Drawer/Drawer'
import LogoText from '../Misc/LogoText'
const [isMenuShown, setMenuShow] = createSignal(false);
//import { eventListener } from "@solid-primitives/event-listener";

const openMenu = () => setMenuShow(true);
const closeMenu = () => {
    if (isMenuShown()) setMenuShow(false);
}
const Header: Component<{appMenu?:boolean,sticky?:boolean,children?:any}> = ({appMenu=false,sticky=false,children}) => {
  return <header data-app-header data-nav-sticky={sticky ? '' : undefined} class={styles.header}>
    <Show when={appMenu}>
        <div>
        <Toggle icon="bars" isShown={isMenuShown} 
        onClick={openMenu}
        />
        <Drawer open={isMenuShown}
            onClick={closeMenu}
        >
        <span slot="label"><LogoText><span>Smart</span>Mixers</LogoText></span>
        <p>This drawer slides in from the top.</p>
        </Drawer>
        </div>
    </Show>
    {children}
  </header>;
};

export default Header;