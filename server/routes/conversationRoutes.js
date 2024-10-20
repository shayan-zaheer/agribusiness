const express = require('express');
const { Message, Conversation } = require('../models/conversationModel');

const router = express.Router();

router.post('/conversations', async (req, res) => {
    const { sender, receiver, text, imageUrl } = req.body;

    try {
        const newMessage = await Message.create({ text, imageUrl, sender, receiver });

        const conversation = await Conversation.findOneAndUpdate(
            {
                $or: [
                    { sender, receiver },
                    { sender: receiver, receiver: sender }
                ],
            },
            {
                $push: { messages: newMessage._id },
            },
            { new: true, upsert: true }
        );

        res.status(200).json({ conversation, message: newMessage });
    } catch (error) {
        console.error("Error creating conversation:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all messages for a conversation
router.get('/conversations/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const conversations = await Conversation.find({
            $or: [{ sender: userId }, { receiver: userId }]
        })
            .populate('messages') // Populate messages with details
            .populate('sender', 'name') // Optionally populate sender details
            .populate('receiver', 'name'); // Optionally populate receiver details

        res.status(200).json(conversations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching conversations." });
    }
});

// Mark a message as seen (optional)
router.put('/conversations/seen/:messageId', async (req, res) => {
    const { messageId } = req.params;

    try {
        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            { seen: true },
            { new: true }
        );

        res.status(200).json(updatedMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error marking message as seen." });
    }
});

module.exports = router;
