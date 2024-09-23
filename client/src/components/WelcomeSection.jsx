import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomeSection() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/users'); 
  };

return(

<section className="w-screen min-h-96 flex flex-row">

  <div className="w-2/4 flex flex-col items-start p-10 pt-10">

    <img className='w-40 ' src="./nav-icon.png" alt="logo" />

    <h2 className=" text-4xl text-green-700 font-bold mb-3 mt-10">WELCOME TO</h2>
    <h1 className="text-green-800 text-5xl font-bold mb-3">AGRIBUSINESS</h1>
    <p className=" italic text-4xl mb-2 mt-4">Empowering Farmers,<br />Connecting Buyers</p>  
    <p className="italic text-4xl mb-14 mt-4">"Harvesting a Better Future Together"</p>

    <button  onClick={handleNavigate} className="ml-auto mt-auto text-5xl border-4 border-black rounded-full p-4 hover:bg-gray-300 transition">➔</button>
  </div>

  <div className=" w-2/4 bg-field-image bg-cover bg-center min-h-96 ">      
  </div> 
</section>

 );  
}

export default WelcomeSection;
