// import { LuSend } from "react-icons/lu"

// function MessageInput() {
//   return (
//     <div className="relative flex items-center justify-center m-5 min-w-64">
//     <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md min-w-28 focus:outline-none focus:ring-2 focus:ring-green-600" placeholder="Send a message..." />
//     <button>
//         <LuSend className="absolute right-2 top-1/2 transform -translate-y-1/2"/>
//     </button>
// </div>
//   )
// }

// export default MessageInput

import { useState } from "react";

function MessageInput({ onSend }) {
    const [messageText, setMessageText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (messageText.trim()) {
            onSend(messageText);
            setMessageText("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex p-4 bg-white">
            <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type a message"
                className="flex-1 border p-2 rounded"
            />
            <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Send</button>
        </form>
    );
}

export default MessageInput;
