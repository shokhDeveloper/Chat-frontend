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
const defUser = JSON.parse(getItem("chat-user"));
const elUserTemp = document.querySelector(".js-user-temp").content;
const elUserList = document.querySelector(".js-users-list");
const elUserImage = document.querySelector(".js-user-profile-image");
const elSendMessageBlock = document.querySelector(".js-send-message-block");
const elConversation = document.querySelector(".js-conversation");
const elSearchInput = document.querySelector(".js-search-user-input");
const elContactList = document.querySelector(".js-contact-list");
const elContactSearchInput = document.querySelector(".js-search-contact");
let sendUser = {};
if (!getItem("chat-token")) {
    window.location.replace("/register");
}
if (!(sendUser && sendUser.userId)) {
    elSendMessageBlock.classList.add("hide");
}
if (defUser && defUser.avatar) {
    elUserImage.src = BECKEND_URL + "/avatar/" + defUser.avatar;
}
const handleRenderSendMessage = () => {
    if (sendUser && sendUser.userId) {
        elSendMessageBlock.classList.remove("hide");
        elConversation.classList.add("hide");
    }
    ;
    let elUserName = elSendMessageBlock.querySelector(".js-username");
    let elUserImage = elSendMessageBlock.querySelector(".js-user-image");
    if (elUserName) {
        elUserName.textContent = sendUser.username;
    }
    ;
    if (elUserImage) {
        elUserImage.src = BECKEND_URL + "/avatar/" + sendUser.avatar;
    }
};
const handleRenderUsers = (arr, type) => __awaiter(void 0, void 0, void 0, function* () {
    if (arr instanceof Promise) {
        arr = yield arr;
    }
    arr = arr;
    const userDocFragment = document.createDocumentFragment();
    if (type == "contact")
        elContactList.innerHTML = '';
    if (type == "messages")
        elUserList.innerHTML = '';
    arr.map((user) => {
        const clone = elUserTemp.cloneNode(true);
        clone.querySelector(".js-user-image").src = BECKEND_URL + "/avatar/" + user.avatar;
        clone.querySelector(".js-username").textContent = user.username;
        (clone.querySelectorAll(".js-user").forEach((item) => {
            item.dataset.id = user.userId;
        }));
        userDocFragment.append(clone);
    });
    if (type == "contact") {
        elContactList.append(userDocFragment);
    }
    if (type == "messages") {
        elUserList.append(userDocFragment);
    }
});
const handleGetUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield request("/data/users", "GET");
    if (users.length) {
        users = users.filter((user) => user.userId !== defUser.userId);
        handleRenderUsers(users, "contact");
    }
});
const handleClick = (evt) => __awaiter(void 0, void 0, void 0, function* () {
    const elTarget = evt.target;
    if (elTarget.matches(".js-user")) {
        const id = elTarget.dataset.id;
        let user = yield request(`/data/users/${id}`, "GET");
        if (user.result)
            sendUser = user.result;
        console.log(sendUser);
        handleRenderSendMessage();
        handleGetMyMessage();
    }
});
const handleSearchUser = (evt) => __awaiter(void 0, void 0, void 0, function* () {
    const elTarget = evt.target;
    console.log(elTarget.id);
    if (elTarget.value.length) {
        if (elTarget.id == "contact") {
            let res = yield request(`/data/users?username=${elTarget.value}`, "GET");
            if (res && res.result) {
                let result = res.result.filter((user) => user.userId !== defUser.userId);
                handleRenderUsers(result, elTarget.id);
            }
        }
        if (elTarget.id == "messages") {
            const regex = new RegExp(elTarget.value, "gi");
            let res = yield handleGetMessages();
            res = res.filter((user) => { var _a; return (_a = user.username) === null || _a === void 0 ? void 0 : _a.match(regex); });
            handleRenderUsers(res, elTarget.id);
        }
    }
    else {
        if (elTarget.id == "contact")
            handleGetUsers();
        if (elTarget.id == "messages")
            handleRenderUsers(handleGetMessages(), elTarget.id);
    }
});
elContactSearchInput.addEventListener("change", handleSearchUser);
elContactList.addEventListener("click", handleClick);
elSearchInput.addEventListener("change", handleSearchUser);
elUserList.addEventListener("click", handleClick);
handleGetUsers();
