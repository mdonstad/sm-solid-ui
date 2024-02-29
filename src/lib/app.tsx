import { createSignal, createContext, useContext } from "solid-js";
const AppContext = createContext();
export function AppConfigProvider(props) {
    const [loggedIn, setLoggedIn] = createSignal(false);
    const [session, setSession] = createSignal();

    //const mapRoutes = new Map<string,MapR>(routes.map((obj) => [obj.path, obj]));
    type CSAppData= {
      name:string;
      theme:string;
      hasNavBar:boolean;
      auth: {
        isLoggedIn:any,
        session: Object,
        user:Object
      },
      _formMap:Map<string,Object>
    }
  //  const [activeRoute,setRoute]=createSignal({});
    //const [activeRoute, setActiveRoute] = createSignal({});
    //const [pages,setPages] = createStore<Array<Component>>([]);
    const initData:CSAppData={name: props.name || '',theme:props.theme || 'dark',hasNavBar:true,auth:{
        isLoggedIn:loggedIn,session:session,user:null
    },_formMap:new Map<string,Object>()};
    const [config,setConfig] = createSignal(initData),
      appConfig = [
        config,
        {
          getForm(id) {
            return initData._formMap.has(id) ? initData._formMap.get(id) : null;
          },
          saveForm(id,obj) {
            initData._formMap.set(id,obj);
            setConfig(initData);
          },
          clearForm: (id) => { if (initData._formMap.has(id)) initData._formMap.delete(id); },
          clearForms: (id) => initData._formMap.clear()
        }
      ];
  
    return (
      <AppContext.Provider value={appConfig}>
        {props.children}
      </AppContext.Provider>
    );
  }
  export function useAppConfig() { return useContext(AppContext); }