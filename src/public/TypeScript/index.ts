const defUser = JSON.parse(getItem("chat-user")!) as User;
const elUserTemp = (document.querySelector(".js-user-temp") as HTMLTemplateElement).content;
const elUserList = document.querySelector(".js-users-list") as HTMLElement;
const elUserImage = document.querySelector(".js-user-profile-image") as HTMLImageElement;
const elSendMessageBlock = document.querySelector(".js-send-message-block") as HTMLElement;
const elConversation = document.querySelector(".js-conversation") as HTMLDivElement;
const elSearchInput = document.querySelector(".js-search-user-input") as HTMLInputElement;
const elContactList = document.querySelector(".js-contact-list") as HTMLElement;
const elContactSearchInput = document.querySelector(".js-search-contact") as HTMLInputElement;
let sendUser:User = {};
if(!getItem("chat-token")){
    window.location.replace("/register")
}
if(!(sendUser && sendUser.userId)){
    elSendMessageBlock.classList.add("hide")
}
if(defUser && defUser.avatar){
    elUserImage.src = BECKEND_URL + "/avatar/" + defUser.avatar
}
const handleRenderSendMessage = () => {
    if(sendUser && sendUser.userId){
        elSendMessageBlock.classList.remove("hide");
        elConversation.classList.add("hide")
    };
    let elUserName = elSendMessageBlock.querySelector(".js-username") as HTMLLinkElement;
    let elUserImage = elSendMessageBlock.querySelector(".js-user-image") as HTMLImageElement;
    if(elUserName){
        elUserName.textContent = sendUser.username as string;
    };
    if(elUserImage){
        elUserImage.src = BECKEND_URL + "/avatar/" + sendUser.avatar
    }
}
const handleRenderUsers = async (arr: User[] | Promise<User[]>, type:string):Promise<void> => {
    if(arr instanceof Promise){
        arr = await arr
    }
        arr = arr as User[]
        const userDocFragment = document.createDocumentFragment();
        if(type == "contact") elContactList.innerHTML = '';
        if(type == "messages") elUserList.innerHTML = '';
        arr.map((user:User) => {
            const clone = elUserTemp.cloneNode(true) as DocumentFragment;
            (clone.querySelector(".js-user-image") as HTMLImageElement).src = BECKEND_URL + "/avatar/" + user.avatar;
            (clone.querySelector(".js-username") as HTMLSpanElement).textContent = user.username as string;
            (clone.querySelectorAll(".js-user").forEach((item) => {
                (item as HTMLElement).dataset.id = user.userId as string;
            }))
            userDocFragment.append(clone)
        })
        if(type == "contact"){
            elContactList.append(userDocFragment);
        } 

        if(type == "messages"){
            elUserList.append(userDocFragment);
        }
    }
const handleGetUsers = async ():Promise<void> => {
    let users = await request("/data/users", "GET");
    if((users as User[]).length){
        users = users.filter((user:User) => user.userId !== defUser.userId)
        handleRenderUsers(users, "contact")
    }
}
const handleClick = async (evt:Event):Promise<void> => {
    const elTarget = evt.target as HTMLElement;
    if(elTarget.matches(".js-user")){
        const id = elTarget.dataset.id;
        let user = await request(`/data/users/${id}`, "GET") as SearchServerInterface;
        if(user.result) sendUser = user.result;
        console.log(sendUser)
        handleRenderSendMessage();
        handleGetMyMessage();
    }
}
const handleSearchUser = async (evt:Event):Promise<void> => {
    const elTarget = evt.target as HTMLInputElement;
    console.log(elTarget.id)
    if(elTarget.value.length){
        if(elTarget.id == "contact"){
            let res = await request(`/data/users?username=${elTarget.value}`, "GET") as SearchServerInterface;
            if(res && res.result){
                let result = (res.result as User[]).filter((user:User) => user.userId !== defUser.userId)
                handleRenderUsers(result, elTarget.id)
            }
        }
        if(elTarget.id == "messages"){
            const regex = new RegExp(elTarget.value, "gi");
            let res = await handleGetMessages()
            res = res.filter((user:User) => user.username?.match(regex));
            handleRenderUsers(res, elTarget.id)
        }
    }else{
        if(elTarget.id == "contact") handleGetUsers();
        if(elTarget.id == "messages") handleRenderUsers(handleGetMessages(), elTarget.id)
    }
}
elContactSearchInput.addEventListener("change", handleSearchUser)
elContactList.addEventListener("click", handleClick)
elSearchInput.addEventListener("change", handleSearchUser);
elUserList.addEventListener("click", handleClick)
handleGetUsers();