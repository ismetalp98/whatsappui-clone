import db from '../firebase';
import { setDoc, doc, collection, onSnapshot } from 'firebase/firestore';

export const registerUser = (name) => {
    setDoc(doc(db, "users", name), {
        name: name,
    });
}

export const getUsers = () => {
    return new Promise((resolve, reject) => {
        onSnapshot(collection(db, "users"), (snapshot) =>
            resolve(snapshot.docs.map(doc => doc.data().name))
        )
    })
}

export const getChats = (user) => {
    return new Promise((resolve, reject) => {
        onSnapshot(collection(db, "users", user, 'chats'), (snapshot) =>
            resolve(snapshot.docs.map((doc) => ({
                data: doc.data(),
                id: doc.id,
            })))
        );
    })
}

export const createChat = (user, roomName) => {
    const me = doc(db, "users", user, "chats", roomName);
    const other = doc(db, "users", roomName, "chats", user);
    setDoc(me, {
        name: roomName,
        id: roomName,
    })
    setDoc(other, {
        name: user,
        id: user,
    })
}