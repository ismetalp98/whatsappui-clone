import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import db from '../firebase';

export const sendMessage = (message, roomId, user) => {
    const me = collection(db, "users", user, "chats", roomId, "messages");
    const other = collection(db, "users", roomId, "chats", user, "messages");
    addDoc(me, message);
    addDoc(other, message);
}

export const getMessages = (user, roomId, setMessages) => {
    const messagesColRef = collection(db, "users", user, "chats", roomId, "messages");
    const messagesQuery = query(messagesColRef, orderBy("timestamp"));
    onSnapshot(messagesQuery, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({
            data: doc.data()
        })))
    });
}