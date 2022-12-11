import { collection, serverTimestamp, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import db from '../firebase';

export const sendMessage = (user, roomId, input) => {
    const me = collection(db, "users", user, "chats", roomId, "messages");
    const other = collection(db, "users", roomId, "chats", user, "messages");
    addDoc(me, {
        message: input,
        name: user,
        timestamp: serverTimestamp(),
    });
    addDoc(other, {
        message: input,
        name: user,
        timestamp: serverTimestamp(),
    });
}

export const getMessages = (user, roomId) => {
    const messagesColRef = collection(db, "users", user, "chats", roomId, "messages");
    const messagesQuery = query(messagesColRef, orderBy("timestamp"));
    return new Promise((resolve, reject) => {
        onSnapshot(messagesQuery, (snapshot) => {
            resolve(snapshot.docs.map((doc) => ({
                data: doc.data()
            })))
         });
    })
}