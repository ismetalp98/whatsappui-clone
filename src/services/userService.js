import * as userRepo from "../repository/userRepo"

export const getUsers = () => {
    return userRepo.getUsers();
}

export const getChats = (user) => {
    return userRepo.getChats(user);
}

export const createChat = (user, roomName) => {
    return userRepo.createChat(user, roomName);
}