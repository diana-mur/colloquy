import { userModel } from "../models/userModel.js"

// найти пользователя по ид
export const findUserById = async (req, res) => {
    const userId = req.params.userId
    try {
        const user = await userModel.findById(userId)
        res.send(user)
    } catch (error) {
        console.log("Ошибка сервера: ", error);
        res.status(500).json({ message: error })
    }
}

// все пользователи
export const getUsers = async (req, res) => {
    try {
        const user = await userModel.find()
        res.send(user)
    } catch (error) {
        console.log("Ошибка сервера: ", error);
        res.status(500).json({ message: error })
    }
}

// подписаться на пользователя
export const subscribe = async (req, res) => {
    const { senderId, recipientId } = req.params;

    try {
        const sender = await userModel.findOne({ _id: senderId });
        const recipient = await userModel.findOne({ _id: recipientId });

        if (!sender || !recipient) {
            return res.status(404).json({ message: "Отправитель или получатель не найден" });
        }

        sender.followingId.push(recipientId);
        recipient.followersId.push(senderId);

        const respSen = await sender.save();
        const respRec = await recipient.save();

        res.send({ message: "Вы успешно подписаны.", respSen, respRec });
    } catch (error) {
        console.log("Ошибка сервера: ", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

// отписаться от пользователя
// отклонить заявку в друзья 
// тот кто подписан, и на кого
export const unsubscribe = async (req, res) => {
    const { senderId, recipientId } = req.params;

    try {
        const sender = await userModel.findOneAndUpdate(
            { _id: senderId },
            { $pull: { followingId: recipientId } }, // Удаление recipientId из списка друзей отправителя
            { new: true }
        );

        const recipient = await userModel.findOneAndUpdate(
            { _id: recipientId },
            { $pull: { followersId: senderId } }, // Удаление senderId из списка друзей получателя
            { new: true }
        );

        res.send({ sender, recipient });
    } catch (error) {
        console.log("Ошибка сервера: ", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

// добавление в друзья и удаление из списков подписчиков и подписок
export const addFriend = async (req, res) => {
    const { senderId, recipientId } = req.params;

    try {
        // Добавление в друзья
        const sender = await userModel.findOneAndUpdate(
            { _id: senderId },
            { $addToSet: { friendsId: recipientId } }, // Добавление recipientId в список друзей отправителя
            { new: true }
        );

        const recipient = await userModel.findOneAndUpdate(
            { _id: recipientId },
            { $addToSet: { friendsId: senderId } }, // Добавление senderId в список друзей получателя
            { new: true }
        );

        // Удаление из списков подписчиков и подписок
        await userModel.updateMany(
            { _id: { $in: [senderId, recipientId] } }, // Ищем обоих пользователей
            { $pull: { followersId: senderId, followingId: recipientId } }, // Удаляем senderId из списка подписчиков и recipientId из списка подписок
            { multi: true } // Указываем, что нужно обновить всех найденных пользователей
        );

        res.json({ message: "Пользователи добавлены в друзья", sender, recipient });
    } catch (error) {
        console.log("Ошибка сервера: ", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

// удаление из друзей
export const deleteFriend = async (req, res) => {
    const { senderId, recipientId } = req.body;

    try {
        const sender = await userModel.findOneAndUpdate(
            { _id: senderId },
            { $pull: { friendsId: recipientId } }, // Удаление recipientId из списка друзей отправителя
            { new: true }
        );

        const recipient = await userModel.findOneAndUpdate(
            { _id: recipientId },
            { $pull: { friendsId: senderId } }, // Удаление senderId из списка друзей получателя
            { new: true }
        );

        res.send({ sender, recipient });
    } catch (error) {
        console.log("Ошибка сервера: ", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};