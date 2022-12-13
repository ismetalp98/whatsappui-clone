import * as chatRepo from "../repository/chatRepo";
import { serverTimestamp } from "firebase/firestore";

export const sendMessage = (user, roomId, input) => {
    const message = {
        message: input,
        name: user,
        timestamp: serverTimestamp(),
    }
    chatRepo.sendMessage(message, roomId, user);
}

export const getMessages = (user, roomId, setMessages) => {
    chatRepo.getMessages(user, roomId, setMessages);
}