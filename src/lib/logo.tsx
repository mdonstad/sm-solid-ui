
import { Component } from "solid-js";
import LogoText from '../cmp/Misc/LogoText'
import { useRouter } from "../cmp/Router";
const AppLogo: Component<{size:string,children:any}> = ({size,children}) => {
    const r=useRouter();
  return (<LogoText size={size} onClick={(e) => {e.preventDefault();r.goBack()}}><span>Smart</span>Mixers
  {children}</LogoText>
  );
};

export default AppLogo;