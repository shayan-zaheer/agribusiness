import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Messages from "./Messages";
import { Link } from "react-router-dom";

function MessagePage() {
    const { _id: currentUserId } = useSelector(store => store.user);
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchConversations = async () => {
            if (!currentUserId) return;

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/conversations/${currentUserId}`);
                
                const uniqueContacts = (response.data || []).map(conv => 
                    conv.sender?._id === currentUserId ? conv.receiver : conv.sender
                ).filter((value, index, self) => 
                    value && self.findIndex(user => user?._id === value?._id) === index
                );

                setContacts(uniqueContacts);
            } catch (error) {
                console.error("Error fetching conversations:", error);
                setError("Failed to load conversations.");
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();
    }, [currentUserId]);

    const handleContactSelect = (contact) => {
        setSelectedContact(contact);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-1/4 bg-white border-r border-gray-300">
                <div className="flex items-center justify-center h-14 bg-green-500">
                    <h2 className="font-bold text-2xl">Contacts</h2>
                </div>
                <div className="p-4 overflow-y-auto">
                    {loading && <div>Loading...</div>}
                    {error && <div className="text-red-500">{error}</div>}
                    {!loading && contacts.length === 0 && <h2>No contacts yet!</h2>}
                    {!loading && contacts.map(contact => (
                        <Link
                            to={`/messages/${contact?._id}`} 
                            key={contact._id} 
                            className="block py-2 px-3 border-b border-gray-300 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleContactSelect(contact)}
                        >
                            <span className="font-semibold">{contact.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
            <Messages selectedContact={selectedContact} />
        </div>
    );
}

export default MessagePage;

