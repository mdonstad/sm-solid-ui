import { type Component,Show } from "solid-js";
import Header from '../Page/Header'
import ThemePicker from '../ThemePicker'
const MainNavbar: Component<{children:any}> = ({children}) => {
  return (<Header appMenu={true}>
        {children}
       
        <ThemePicker></ThemePicker>
        </Header>);
};

export default MainNavbar;
