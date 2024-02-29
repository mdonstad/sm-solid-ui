

export function _forms() {
    const _formMap=new Map<string,Object>();

    return {
        get: (id) => {
            return _formMap.has(id) ? _formMap.get(id) : null;
        },
        save: (id,obj) => {
            _formMap.set(id,obj);
        }
    }
}