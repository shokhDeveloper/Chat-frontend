const getItem = (key:string) => window.localStorage.getItem(key);
const setItem = (key:string, value:string | object) => window.localStorage.setItem(key, typeof value == "object"? JSON.stringify(value): value)
const elErrorInfo = document.querySelector(".js-error-info") as HTMLSpanElement;
const BECKEND_URL = "http://192.168.1.107:4000";
let userData:User = {}
const toCheckToken = () => {
    if(getItem("chat-token")) return window.location.replace("/");
}
const handleChange = (evt:Event):void => {
    const elTarget = evt.target as HTMLInputElement
    if(!elTarget.value.length){
        elErrorInfo.textContent = elTarget.id.charAt(0).toUpperCase() + elTarget.id.slice(1) + " Required !" ;  
    }else {
        elErrorInfo.textContent = '';
    };
    if(elTarget.id == "username" && elTarget.value.length){
        userData = {...userData, username: elTarget.value}; 
    }
    if(elTarget.id == "password" && elTarget.value.length){
        userData = {...userData, password: elTarget.value}
    }
}