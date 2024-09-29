
import Header from "./components/Header";
import { useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import io from "socket.io-client";

function App() {
    useEffect(() => {
        const socketConnection = io("http://localhost:5173", {
            auth: {
                token: localStorage.getItem("token")
            }
        });
        
        return () => {
            socketConnection.disconnect();
        }
    }, []);
    // const socketRef = useRef(null);

    // useEffect(() => {
	// 	const init = async () => {
	// 		socketRef.current = await initSocket();

	// 		socketRef.current.on("connect_error", handleErrors);
	// 		socketRef.current.on("connect_failed", handleErrors);

	// 		function handleErrors(error) {
	// 			console.log("Socket error!", error);
	// 			toast.error("Socket connection failed, try again later!", {
	// 				position: "top-right",
	// 			});
	// 		}
	// 	};

	// 	init();

	// 	return () => {
	// 		if (socketRef.current) {
	// 			socketRef.current.disconnect();
	// 			socketRef.current.off("connect_error");
	// 			socketRef.current.off("connect_failed");
	// 		}
	// 	};
	// }, []);


	return (
		<>
            <ToastContainer />
			<div className="flex">
                <Navbar />
				<div className="flex-1 flex-col">
					<Header />
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default App;
