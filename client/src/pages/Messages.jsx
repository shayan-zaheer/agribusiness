// import { useParams, useOutletContext } from "react-router-dom";
// import Message from "../components/Message";
// import MessageInput from "../components/MessageInput";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";

// function Messages() {
//     const { id } = useParams();
//     const { _id: currentUserId } = useSelector(store => store.user);
//     const { socketConnection } = useOutletContext();
//     const [messages, setMessages] = useState([]);
//     const [contacts, setContacts] = useState([]); // New state for contacts
//     const [receiverName, setReceiverName] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchUserDetails = async () => {
//             try {
//                 const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`);
//                 setReceiverName(response.data.user.name);
//             } catch (error) {
//                 console.error("Error fetching user details:", error);
//                 setError("Failed to load user details.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserDetails();
//     }, [id]);

//     useEffect(() => {
//         const fetchConversations = async () => {
//             if (!currentUserId) return;

//             try {
//                 const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/conversations/${currentUserId}`);
//                 const conversation = response.data.find(conv =>
//                     (conv.sender?._id === currentUserId && conv.receiver?._id === id) ||
//                     (conv.receiver?._id === currentUserId && conv.sender?._id === id)
//                 );

//                 setMessages(conversation?.messages || []);

//                 // Extract unique contacts from conversations
//                 const uniqueContacts = response.data.map(conv => 
//                     conv.sender?._id === currentUserId ? conv.receiver : conv.sender
//                 ).filter((value, index, self) => 
//                     self.findIndex(user => user?._id === value?._id) === index // Remove duplicates
//                 );

//                 setContacts(uniqueContacts);
//             } catch (error) {
//                 console.error("Error fetching conversations:", error);
//                 setError("Failed to load conversations.");
//             }
//         };

//         fetchConversations();
//     }, [currentUserId, id]);

//     useEffect(() => {
//         if (socketConnection) {
//             socketConnection.emit("message-page", id);

//             socketConnection.on("receive-message", (messageData) => {
//                 setMessages((prevMessages) => [...prevMessages, messageData]);
//             });

//             socketConnection.on("load-messages", (loadedMessages) => {
//                 setMessages(loadedMessages);
//             });
//         }

//         return () => {
//             if (socketConnection) {
//                 socketConnection.off("receive-message");
//                 socketConnection.off("load-messages");
//             }
//         };
//     }, [socketConnection, id]);

//     const handleSendMessage = async (text, imageUrl) => {
//         if (!text && !imageUrl) return;

//         const messageData = {
//             sender: currentUserId,
//             receiver: id,
//             text,
//             imageUrl
//         };

//         try {
//             await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/conversations`, messageData);
//             socketConnection.emit("send-message", messageData);
//             setMessages((prevMessages) => [...prevMessages, { ...messageData, createdAt: new Date() }]);
//         } catch (error) {
//             console.error("Error sending message:", error);
//             setError("Failed to send message.");
//         }
//     };

//     return (
//         <div className="flex h-screen bg-gray-100">
//             <div className="w-1/4 bg-white border-r border-gray-300">
//                 <div className="flex items-center justify-center h-14 bg-slate-300">
//                     <h2 className="font-bold text-2xl">Contacts</h2>
//                 </div>
//                 <div className="p-4 overflow-y-auto">
//                     {contacts.map(contact => (
//                         <div key={contact._id} className="py-2 px-3 border-b border-gray-300">
//                             <span className="font-semibold">{contact.name}</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="flex-1 flex flex-col">
//                 <div className="flex items-center justify-center w-full h-14 bg-slate-300">
//                     <h2 className="font-bold text-2xl">{loading ? "Loading..." : receiverName}</h2>
//                 </div>

//                 <div className="flex-1 overflow-y-auto p-4">
//                     {error && <div className="text-red-500">{error}</div>} {/* Error message */}
//                     {messages && messages.map((msg, index) => (
//                         <Message key={msg._id || index} text={msg.text} isSender={msg.sender === currentUserId} />
//                     ))}
//                 </div>

//                 <MessageInput onSend={handleSendMessage} />
//             </div>
//         </div>
//     );
// }

// export default Messages;

import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import axios from "axios";
import { useSelector } from "react-redux";

function Messages({contactId}) {
    const { _id: currentUserId } = useSelector(store => store.user);
    const { socketConnection } = useOutletContext();
    const [messages, setMessages] = useState([]);
    const [contacts, setContacts] = useState([]); // New state for contacts
    const [receiverName, setReceiverName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

        useEffect(() => {
            const fetchUserDetails = async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${contactId}`);
                    setReceiverName(response.data.user.name);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                    setError("Failed to load user details.");
                } finally {
                    setLoading(false);
                }
            };
    
            fetchUserDetails();
        }, [contactId]);
    
        useEffect(() => {
            const fetchConversations = async () => {
                if (!currentUserId) return;
    
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/conversations/${currentUserId}`);
                    const conversation = response.data.find(conv =>
                        (conv.sender?._id === currentUserId && conv.receiver?._id === contactId) ||
                        (conv.receiver?._id === currentUserId && conv.sender?._id === contactId)
                    );
    
                    setMessages(conversation?.messages || []);
    
                    // Extract unique contacts from conversations
                    const uniqueContacts = response.data.map(conv => 
                        conv.sender?._id === currentUserId ? conv.receiver : conv.sender
                    ).filter((value, index, self) => 
                        self.findIndex(user => user?._id === value?._id) === index // Remove duplicates
                    );
    
                    setContacts(uniqueContacts);
                } catch (error) {
                    console.error("Error fetching conversations:", error);
                    setError("Failed to load conversations.");
                }
            };
    
            fetchConversations();
        }, [currentUserId, contactId]);
    
        useEffect(() => {
            if (socketConnection) {
                socketConnection.emit("message-page", contactId);
    
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
        }, [socketConnection, contactId]);
    
        const handleSendMessage = async (text, imageUrl) => {
            if (!text && !imageUrl) return;
    
            const messageData = {
                sender: currentUserId,
                receiver: contactId,
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

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4">
                {error && <div className="text-red-500">{error}</div>}
                {loading ? (
                    <div>Loading messages...</div>
                ) : (
                    messages.map((msg, index) => (
                        <Message key={msg._id || index} text={msg.text} isSender={msg.sender === currentUserId} />
                    ))
                )}
            </div>
            <MessageInput onSend={handleSendMessage} />
        </div>
    );
}

export default Messages;
