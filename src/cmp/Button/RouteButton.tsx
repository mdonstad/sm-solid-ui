
import { Component,onMount } from "solid-js";
import { useRouter } from "../Router";

const RouteButton: Component<{href:string,variant?:string,size?:string,replaceHistory?:boolean,full?:boolean,children:any}> = ({href,variant="primary",size="medium",replaceHistory=false,full=true,children}) => {
    const r=useRouter();
    onMount(()=>{
        const beforeLoad=r?.preload;
        if (beforeLoad) 
        window.setTimeout(()=>{
            beforeLoad(href);
        },500);
        
    })
return( 
<sl-button style={full ? 'width:100%' : undefined} onClick={() => r.navigate(href,{ replace: replaceHistory })} variant={variant} size={size}>{children}</sl-button>
)};

export default RouteButton;