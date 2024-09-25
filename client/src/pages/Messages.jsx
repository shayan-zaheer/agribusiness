import Message from "../components/Message";
import MessageInput from "../components/MessageInput";

function Messages() {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex items-center justify-center w-full h-14 bg-slate-300 mt-5">
                <h2 className="font-bold text-2xl">FARMER'S NAME</h2>
            </div>
   
            <div className="flex-1 overflow-y-auto">
                <Message text="Aur bhai kesa hai?" />
                <Message text="Sab set chalrha hai?" />
                <Message text="Kab tak banega module?" />
                <Message text="Jawab to de bhai!" />
                <Message text="Jawab to de bhai!" />
                <Message text="Jawab to de bhai!" />
                <Message text="Jawab to de bhai!" />
                <Message text="Jawab to de bhai!" />
                <Message text="Jawab to de bhai!" />
               

            </div>
    
            <MessageInput />
        </div>
    );
}

export default Messages;
