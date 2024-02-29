import { createSignal, createContext, useContext } from "solid-js";
const AppContext = createContext();

export function AppConfigProvider(props) {
    const [loggedIn, setLoggedIn] = createSignal(false);
    const [session, setSession] = createSignal();

    //const mapRoutes = new Map<string,MapR>(routes.map((obj) => [obj.path, obj]));

  //  const [activeRoute,setRoute]=createSignal({});
    //const [activeRoute, setActiveRoute] = createSignal({});
    //const [pages,setPages] = createStore<Array<Component>>([]);
    const initData={name: props.name || '',theme:props.theme || 'dark',hasNavBar:true,auth:{
        isLoggedIn:loggedIn,session:session,user:null
    }};
    const [config,setConfig] = createSignal(initData),
      appConfig = [
        config,
      ];
  
    return (
      <AppContext.Provider value={appConfig}>
        {props.children}
      </AppContext.Provider>
    );
  }
  export function useAppConfig() { return useContext(AppContext); }