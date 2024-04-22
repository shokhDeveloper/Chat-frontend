const elFormChat = document.querySelector(".js-form") as HTMLFormElement;
const elTextArea = document.querySelector(".js-message-textarea") as HTMLTextAreaElement;
const elMyMessageTemp = (document.querySelector(".js-user-message-temp") as HTMLTemplateElement).content;
const elInComingMessageTemp = (document.querySelector(".js-incoming-message-temp") as HTMLTemplateElement).content;
const elMessageList = document.querySelector(".js-message-list") as HTMLElement;
const handleSubChat =  async (evt:SubmitEvent):Promise<void> => {
    evt.preventDefault();
    if(sendUser && sendUser.userId){
        let sendMessage:Message = {
            message: elTextArea.value,
            authorUserId: defUser.userId as number,
            userId: sendUser.userId as number 
        };
        await request(`/message?userId=${sendUser.userId}`, "POST", sendMessage, undefined);
        handleGetMyMessage()
        elTextArea.value = ''
    }else alert("Who do you want to message ?");
}
async function handleGetMessages ():Promise<User[]>{
    const messages = await request("/data/messages", "GET") as User[];
    console.log(messages)
    return messages
}
let result:Promise<User[]> = handleGetMessages();
handleRenderUsers(result, "messages");
const handleRenderMyMessage = (arr:Message[]) => {   
    elMessageList.innerHTML = ''
    arr.map((message) => {
        if(message.userId == defUser.userId){
            const clone = elInComingMessageTemp.cloneNode(true) as DocumentFragment;
            (clone.querySelector(".js-incoming-message-info") as HTMLElement).textContent = message.message;
            elMessageList.append(clone)
        }
        if(message.authorUserId == defUser.userId){
            const clone = elMyMessageTemp.cloneNode(true) as DocumentFragment;
            (clone.querySelector(".js-my-message-info") as HTMLElement).textContent = message.message;
            elMessageList.append(clone)
        }
    })
}
async function handleGetMyMessage():Promise<void>{
    if(sendUser.userId){
        const res = await request(`/data/myMessages?userId=${sendUser.userId}`, "GET") as Message[];
        handleRenderMyMessage(res)
    }
}
setInterval(() => {
    handleGetMyMessage()
},1000)
elFormChat.addEventListener("submit", handleSubChat)