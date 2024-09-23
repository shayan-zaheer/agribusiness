import React from 'react';

function HeaderHuz() {
  return (
   <header className="text-center py-2 bg-gray-800 flex flex-row justify-center w-full">
      <img className='w-12 pr-2' src="./nav-icon.png" alt="logo" />
        <h1 className="text-4xl w-64 font-bold text-white ">AGRIBUSINESS</h1>

        <div className=" absolute right-3 top-5  text-white ">
        <span className="mr-2 font-bold text-xl">Language</span>
        <button className="text-2xl -mt-20  pt-1 pr-2.5 pl-2.5 pb-0.5 border-2 rounded-full  hover:bg-black transition ">▼</button>
      </div>

      </header>
  ); 
}

export default HeaderHuz;
