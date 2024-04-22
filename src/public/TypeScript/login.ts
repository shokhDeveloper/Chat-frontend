const elLoginForm = document.querySelector(".js-form") as HTMLFormElement;
const elLoginTextInputs = elLoginForm.querySelectorAll(".js-input") as NodeList;

const handleLoginSub = async (evt:SubmitEvent):Promise<void> => {
    evt.preventDefault();
    try{
        if(!userData.username) throw new Error("Username is required !");
        if(!userData.password) throw new Error("Password is required !");

        const res = await request("/auth/login", "POST", userData, undefined) as UserSignedResponse;
        if(res.accessToken && res.user){
            setItem("chat-token", res.accessToken);
            setItem("chat-user", res.user);
            window.location.replace("/")
        }

    }catch(error){
        elErrorInfo.textContent = (error as Error).message
    }
}
console.log(elLoginTextInputs)
elLoginTextInputs.forEach((input) => {
    input.addEventListener("blur", handleChange);
    input.addEventListener("keyup", handleChange)
})
elLoginForm.addEventListener("submit", handleLoginSub)
toCheckToken()