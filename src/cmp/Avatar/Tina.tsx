import { Component } from "solid-js";
import styles from './tina.module.css'
import Avatar from '../../assets/sm-avatar.svg'
const AvatarTina: Component<{size:string}> = ({size="175px"}) => {
return( 
    <sl-avatar label="My name is Tina" style={`--size: ${size}`} image={Avatar}></sl-avatar>
)};

export default AvatarTina;