import Icons from './icons.svg'
import type { Component } from "solid-js";
import { Show } from "solid-js";

import styles from './Icon.module.css';

type IconParams = {
    icon:string,
    width?:number,
    height?:number,
    label?:string,
    color?:string,
    secondaryColor?:string
}

const Icon: Component<IconParams> = ({width=64,height=64,icon,label,color,secondaryColor=''}) => {
return (<div class={styles.Icon} style={`--fa-secondary-color:${secondaryColor}`}><svg class={styles.svg} xmlns="http://www.w3.org/2000/svg" color={color} width={width} height={height} aria-label={label} aria-hidden={label == null}>
    <use xmlns="http://www.w3.org/2000/svg" href={`${Icons}#${icon}`}></use>
</svg>
</div>
)
}

export default Icon;

