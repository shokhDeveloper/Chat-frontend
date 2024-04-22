"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const elFormChat = document.querySelector(".js-form");
const elTextArea = document.querySelector(".js-message-textarea");
const elMyMessageTemp = document.querySelector(".js-user-message-temp").content;
const elInComingMessageTemp = document.querySelector(".js-incoming-message-temp").content;
const elMessageList = document.querySelector(".js-message-list");
const handleSubChat = (evt) => __awaiter(void 0, void 0, void 0, function* () {
    evt.preventDefault();
    if (sendUser && sendUser.userId) {
        let sendMessage = {
            message: elTextArea.value,
            authorUserId: defUser.userId,
            userId: sendUser.userId
        };
        yield request(`/message?userId=${sendUser.userId}`, "POST", sendMessage, undefined);
        handleGetMyMessage();
        elTextArea.value = '';
    }
    else
        alert("Who do you want to message ?");
});
function handleGetMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        const messages = yield request("/data/messages", "GET");
        console.log(messages);
        return messages;
    });
}
let result = handleGetMessages();
handleRenderUsers(result, "messages");
const handleRenderMyMessage = (arr) => {
    elMessageList.innerHTML = '';
    arr.map((message) => {
        if (message.userId == defUser.userId) {
            const clone = elInComingMessageTemp.cloneNode(true);
            clone.querySelector(".js-incoming-message-info").textContent = message.message;
            elMessageList.append(clone);
        }
        if (message.authorUserId == defUser.userId) {
            const clone = elMyMessageTemp.cloneNode(true);
            clone.querySelector(".js-my-message-info").textContent = message.message;
            elMessageList.append(clone);
        }
    });
};
function handleGetMyMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        if (sendUser.userId) {
            const res = yield request(`/data/myMessages?userId=${sendUser.userId}`, "GET");
            handleRenderMyMessage(res);
        }
    });
}
setInterval(() => {
    handleGetMyMessage();
}, 1000);
elFormChat.addEventListener("submit", handleSubChat);
