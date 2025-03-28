import Channel from "../models/ChannelModel.js";
import Message from "../models/MessagesModel.js";
import User from "../models/UserModel.js";
import mongoose from "mongoose";

export const createChannel = async (request, response, next) => {
    try {
        const { name, members } = request.body;
        const userId = request.userId;
        const admin = await User.findById(userId);
        if (!admin) {
            return response.status(400).send("Admin user not found");
        }
        const validMembers = await User.find({ _id: { $in: members } });
        if (validMembers.length !== members.length) {
            return response.status(400).send("Some members are not valid users");
        }

        const newChannel = new Channel({
            name,
            members,
            admin: userId
        })
        await newChannel.save();
        return response.status(201).send({ channel: newChannel });
    } catch (error) {
        console.log({ error });
        return response.status(500).send("Internal Server Error")
    }
}

export const getUserChannels = async (request, response, next) => {
    try {
        const userId = new mongoose.Types.ObjectId(request.userId);
        const channels = await Channel.find({
            // $or: [{ admin: userId }, { members: { $in: [userId] } }],}).sort({ updatedAt: -1 });
            $or: [{ admin: userId }, { members: userId }],
        }).sort({ updatedAt: -1 });
        return response.status(201).send({ channels });
    } catch (error) {
        console.log({ error });
        return response.status(500).send("Internal Server Error")
    }
}

export const getChannelMessages = async (request, response, next) => {
    try {
        const { channelId } = request.params;
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return response.status(404).send("Channel not found");
        }
        // Fetch messages separately and populate sender details
        const messages = await Message.find({ _id: { $in: channel.messages } })
            .populate({
                path: "sender",
                select: "firstName lastName email _id image color"
            });
        return response.status(200).json({ messages });
    } catch (error) {
        console.log({ error });
        return response.status(500).send("Internal Server Error");
    }
};
