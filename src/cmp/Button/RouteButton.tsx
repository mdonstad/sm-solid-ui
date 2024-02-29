
import { Component } from "solid-js";
import { useRouter } from "../Router";

const RouteButton: Component<{href:string,variant?:string,size?:string,children:any}> = ({href,variant="primary",size="medium",children}) => {
    const r=useRouter();
return( 
<sl-button onClick={() => r.navigate(href,{ replace: true })} variant={variant} size={size}
onMouseOver={() => r.preMod(href)}
>{children}</sl-button>
)};

export default RouteButton;