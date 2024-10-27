import { useParams, useOutletContext } from "react-router-dom";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Messages() {
    const { id } = useParams();
    const { _id: currentUserId } = useSelector(store => store.user);
    const { socketConnection } = useOutletContext();
    
    const [messages, setMessages] = useState([]);
    const [receiverName, setReceiverName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`);
                setReceiverName(response.data.user.name);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setError("Failed to load user details.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    useEffect(() => {
        const fetchConversations = async () => {
            if (!currentUserId || !id) return;

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/conversations/${currentUserId}`);
                const conversation = response.data.find(conv =>
                    (conv.sender?._id === currentUserId && conv.receiver?._id === id) ||
                    (conv.receiver?._id === currentUserId && conv.sender?._id === id)
                );

                setMessages(conversation?.messages || []);
                
            } catch (error) {
                console.error("Error fetching conversations:", error);
                setError("Failed to load conversations.");
            }
        };

        fetchConversations();
    }, [currentUserId, id]);

    useEffect(() => {
        if (socketConnection && id) {
            socketConnection.emit("message-page", id);

            socketConnection.on("receive-message", (messageData) => {
                setMessages((prevMessages) => [...prevMessages, messageData]);
            });

            socketConnection.on("load-messages", (loadedMessages) => {
                setMessages(loadedMessages);
            });
        }

        return () => {
            if (socketConnection) {
                socketConnection.off("receive-message");
                socketConnection.off("load-messages");
            }
        };
    }, [socketConnection, id]);

    const handleSendMessage = async (text, imageUrl) => {
        if (!text && !imageUrl) return;

        const messageData = {
            sender: currentUserId,
            receiver: id,
            text,
            imageUrl
        };

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/conversations`, messageData);
            socketConnection.emit("send-message", messageData);
            setMessages((prevMessages) => [...prevMessages, { ...messageData, createdAt: new Date() }]);
        } catch (error) {
            console.error("Error sending message:", error);
            setError("Failed to send message.");
        }
    };

    if (!id) {
        return (
            <div className="flex items-center justify-center w-screen h-screen text-black font-black drop-shadow-md">
                Select a Contact
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-center w-full h-14 bg-slate-300">
                <h2 className="font-bold text-2xl">{loading ? "Loading..." : receiverName}</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {error && <div className="text-red-500">{error}</div>}
                {messages && messages.map((msg, index) => (
                    <Message key={msg._id || index} text={msg.text} isSender={msg.sender === currentUserId} />
                ))}
            </div>

            <MessageInput onSend={handleSendMessage} />
        </div>
    );
}


export default Messages;
