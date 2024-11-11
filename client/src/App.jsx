import Header from "./components/Header";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import io from "socket.io-client";
import Footer from "./components/Footer";

function App() {
    const [socketConnection, setSocketConnection] = useState(null);

    useEffect(() => {
        const socket = io("http://localhost:8000", {
            auth: {
                token: localStorage.getItem("token"),
            },
        });

		socket.on('connect', () => {
			console.log('Socket connected:', socket.id);
		});

        socket.on("onlineUser", (data) => {
            console.log(data);
        });

        setSocketConnection(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <>
            <ToastContainer />
            <Header />
            <Outlet context={{ socketConnection }} />
            <Footer />
        </>
    );
}

export default App;




