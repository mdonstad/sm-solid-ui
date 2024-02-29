import { Component } from "solid-js";
import Icon from '../Icon/Icon'
import styles from './Button.module.css';


//const onClick = (m) => {
//    m.setShow(!m.isShown());
//}

const ButtonToggle: Component<{icon:string,label:string,isShown:any,onClick:any}> = ({icon="bars",label="Menu",isShown,onClick}) => {
return <button  onClick={onClick} class={styles.ButtonToggle} style={isShown() ? 'rotate:180deg' : undefined} type="button" aria-label={label} aria-disabled={label.length == 0}>
    <Icon icon={icon} />
    </button>
};

export default ButtonToggle;