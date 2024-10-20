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

    console.log(messages);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`);
                setReceiverName(response.data.user.name);
            } catch (error) {
                console.error("Error fetching user details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                if (currentUserId) {
                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/conversations/${currentUserId}`);
                    const conversation = response.data.find(conv => 
                        (conv.sender?._id === currentUserId && conv.receiver?._id === id) ||
                        (conv.receiver?._id === currentUserId && conv.sender?._id === id)
                    );

                    console.log("CONVERSATION", conversation);

                    console.log(response);

                    setMessages(conversation?.messages);
                }
            } catch (error) {
                console.error("Error fetching conversations:", error);
            }
        };

        fetchConversations();
    }, [currentUserId, id]);

    useEffect(() => {
        if (socketConnection) {
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
        if (!text) return; 

        const messageData = {
            sender: currentUserId, 
            receiver: id,
            text,
            imageUrl
        };

        // Save message to the backend
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/conversations`, messageData);

        socketConnection.emit("send-message", messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
    };


    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-1/4 bg-white border-r border-gray-300">
                <div className="flex items-center justify-center h-14 bg-slate-300">
                    <h2 className="font-bold text-2xl">Contacts</h2>
                </div>
                <div className="p-4 overflow-y-auto">
                    {/* Contact List */}
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-center w-full h-14 bg-slate-300">
                    <h2 className="font-bold text-2xl">{loading ? "Loading..." : receiverName}</h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {messages && messages.map((msg, index) => (
                        <Message key={index} text={msg.text} isSender={msg.sender === currentUserId} />
                    ))}
                </div>

                <MessageInput onSend={handleSendMessage} />
            </div>
        </div>
    );
}

export default Messages;
