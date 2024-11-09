/**import { Form, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SellerLogin() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const { username, password } = Object.fromEntries(formData.entries());
    const role = new URLSearchParams(window.location.search).get("user");

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          username,
          password,
          role
        },
        {
          withCredentials: true
        }
      );

      const data = result.data;

      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        navigate("/profile");
      } else {
        console.log(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('public/adele-payman-2oYMwuFgnTg-unsplash.jpg')" }}
    >
      <Form
        onSubmit={handleSubmit}
        className="bg-[#D9D9D9] h-[90%] min-h-fit rounded-lg w-[40%] md:w-[70%] sm:min-w-fit max-w-[600px] md:h-auto my-20 mx-auto flex flex-grow flex-col justify-around items-center p-6 opacity-90 shadow-lg"
      >
        <div className="application min-h-fit h-3/4">
          <h1 className="text-4xl font-bold text-center mb-10">Login</h1>
          <div className="flex flex-col w-3/4">
            <label htmlFor="username" className="font-Poppins font-bold text-left mb-2">
              User Name
            </label>
            <input
              type="text"
              name="username"
              className="w-full rounded border border-gray-400 py-2 px-3"
            />
          </div>

          <div className="flex flex-col w-3/4">
            <label htmlFor="password" className="font-Poppins font-bold text-left mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full rounded border border-gray-400 py-2 px-3"
            />
          </div>

          <button
            type="submit"
            className="bg-[#4eb0aa] hover:bg-[#225855] text-white font-bold py-2 px-4 rounded w-1/2 md:w-1/2 mt-4 ml-8"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            Don't Have An Account?{" "}
            <Link to="/register?user=seller" className="text-blue-600 underline">
              Register
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default SellerLogin;**/
import { Form, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function SellerLogin() {
  const [bgLoaded, setBgLoaded] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { username, password } = Object.fromEntries(formData.entries());
    const role = new URLSearchParams(window.location.search).get("user");

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        { username, password, role },
        { withCredentials: true }
      );

      const data = result.data;
      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        navigate("/orders");
      } else {
        console.log(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const img = new Image();
    img.src = 'public/adele-payman-2oYMwuFgnTg-unsplash.jpg';
    img.onload = () => setBgLoaded(true);
  }, []);

  return (
    <div
      className={`h-screen w-screen bg-cover bg-center flex items-center justify-center transition-opacity duration-1000 ${bgLoaded ? "opacity-100" : "opacity-0"}`}
      style={{ backgroundImage: "url('public/adele-payman-2oYMwuFgnTg-unsplash.jpg')" }}
    >
      <Form
        onSubmit={handleSubmit}
        className="bg-[#D9D9D9] h-[90%] min-h-fit rounded-lg w-[40%] md:w-[70%] sm:min-w-fit max-w-[600px] md:h-auto my-20 mx-auto flex flex-grow flex-col justify-around items-center p-6 opacity-90 shadow-lg"
      >
        <div className="application min-h-fit h-3/4">
          <h1 className="text-4xl font-bold text-center mb-10">Login</h1>
          <div className="flex flex-col w-3/4">
            <label htmlFor="username" className="font-Poppins font-bold text-left mb-2">User Name</label>
            <input type="text" name="username" className="w-full rounded border border-gray-400 py-2 px-3" />
          </div>

          <div className="flex flex-col w-3/4">
            <label htmlFor="password" className="font-Poppins font-bold text-left mb-2">Password</label>
            <input type="password" name="password" className="w-full rounded border border-gray-400 py-2 px-3" />
          </div>

          <button type="submit" className="bg-[#4eb0aa] hover:bg-[#225855] text-white font-bold py-2 px-4 rounded w-1/2 md:w-1/2 mt-4 ml-8">Login</button>
          <div className="mt-4 text-center">
            Don't Have An Account? <Link to="/register?user=seller" className="text-blue-600 underline">Register</Link>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default SellerLogin;
