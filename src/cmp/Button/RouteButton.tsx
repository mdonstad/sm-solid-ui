
import { Component,onMount } from "solid-js";
import { useRouter } from "../Router";

const RouteButton: Component<{href:string,variant?:string,size?:string,children:any}> = ({href,variant="primary",size="medium",children}) => {
    const r=useRouter();
    onMount(()=>{
        const beforeLoad=r?.preload;
        if (beforeLoad) 
        window.setTimeout(()=>{
            beforeLoad(href);
        },300);
        
    })
return( 
<sl-button onClick={() => r.navigate(href,{ replace: true })} variant={variant} size={size}>{children}</sl-button>
)};

export default RouteButton;