const elForm = document.querySelector(".js-form") as HTMLFormElement;
const elFileInput = document.querySelector(".js-file-input") as HTMLInputElement;
const elTextInputs = document.querySelectorAll(".js-text-input")
const handleSub = async (evt:SubmitEvent):Promise<void> => {
    evt.preventDefault();
    try{
        if(!userData.avatar) throw new Error("Avatar required !")
            if(!userData.username) throw new Error("Username is required !");
        if(!userData.password) throw new Error("Password is required !");
        
        const userFormData = new FormData();
        userFormData.append("username", userData.username);
        userFormData.append("password", userData.password);
        userFormData.append("avatar", userData.avatar);
        console.log(userFormData.get("avatar"))
        const res = await request("/auth/register", "POST", undefined, userFormData) as UserSignedResponse;
        if(res.accessToken && res.user){
            setItem("chat-token", res.accessToken);
            setItem("chat-user", res.user)
            window.location.replace("/")
        }else{
            console.log(res)
        }
    }catch(error){
        elErrorInfo.textContent = (error as Error).message
    }
}
elForm.addEventListener("submit", handleSub)
const handleFileUpload = (evt:Event):void => {
    const elTarget = evt.target as HTMLInputElement;
    if(elTarget.files && elTarget.files[0]){
        userData = {...userData, avatar: elTarget.files[0]}
        elErrorInfo.textContent = ''
    }
}
elFileInput.addEventListener("change", handleFileUpload)
elTextInputs.forEach((item) => {
    item.addEventListener("blur", handleChange)
    item.addEventListener("keyup", handleChange)
})
toCheckToken()
console.log(userData)