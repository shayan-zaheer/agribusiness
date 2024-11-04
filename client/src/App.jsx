
// import Header from "./components/Header";
// import { useEffect } from "react";
// import { ToastContainer } from "react-toastify";
// import { Outlet } from "react-router-dom";
// import io from "socket.io-client";

// import Footer from "./components/Footer";
// import { useDispatch } from "react-redux";
// import { userActions } from "./store/userSlice";

// function App() {
// 	const dispatch = useDispatch();

//     useEffect(() => {
//         const socketConnection = io("http://localhost:5173", {
//             auth: {
//                 token: localStorage.getItem("token")
//             }
//         });
        
// 		socketConnection.on("onlineUser", data => {
// 			console.log(data);
// 			dispatch(userActions.setOnlineUser(data));
// 		})

// 		dispatch(userActions.setSocketConnection(socketConnection));

//         return () => {
//             socketConnection.disconnect();
//         }
//     }, []);


// 	return (
// 		<>
//             <ToastContainer />
// 			<Header />
// 			<Outlet />
// 			<Footer />
// 		</>
// 	);
// }

// export default App;

import Header from "./components/HeaderBuyer";
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




