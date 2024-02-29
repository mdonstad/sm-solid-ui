import {Motion,Presence} from "solid-motionone";
import {createSignal,Show,onMount} from "solid-js";
//import { useBeforeLeave } from "@solidjs/router";
import { Component } from "solid-js";


const SlideAnim: Component<{type:string,children?:any,show?:any}> = ({type,children,show}) => {
    console.log("new SlideAnim",{type,show})
    const [isShown, setShow] = createSignal(show);
    /*
    useBeforeLeave((e: BeforeLeaveEventArgs) => {
     console.log("slideAnim(),use before leave",e)
       if (!e.defaultPrevented){
           //let toUrl=e.to;
        e.preventDefault();
        setShow(false);
       window.setTimeout(()=>{
              setShow(true);
              e.retry(true);

           },200)
        }
   });
   */

  let inFrom,inTo,outFrom,outTo;
  if (type == 'slideIn'){inFrom="100vw"; inTo=0;
    }else if (type == 'slideOut'){outFrom=0; outTo="100vw";
    }
  onMount(()=>{
    console.log("new onMount SlideAnim",type)
  
    //setShow(true);
  })

console.log("from",{inFrom,children,s:isShown()})
  return (
    <Presence exitBeforeEnter>
        <Show when={isShown()}>
            <Motion.div style={"position:absolute;height:100vh;width:100vw"}
            animate={{  x: [inFrom,inTo] }}
        transition={{ duration: 0.5,ease: 'ease-in' }}
        exit={{ transition: { direction: 'reverse',duration: 0.2,ease: 'ease-out'}}}>
            {children}
            </Motion.div>
        </Show>
    </Presence>
  )
};

export default SlideAnim;