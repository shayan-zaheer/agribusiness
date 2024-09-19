import OrderCard from './orderCard.jsx'
import Sidebar from './sidebar.jsx'


function App() {

  return (
 
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-6 ">
        <header className="flex justify-between items-center flex-col mb-6 top-0">
          <h1 className="text-5xl font-bold text-green-700 mb-7">AGRIBUSINESS</h1>
        
          <h2 className="text-3xl font-bold text-black bg-[#6C926C] p-5 rounded-lg">VIEW ORDERS</h2>
        </header>
        <div className="display:flex flex ">
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </div>
      </div>
    </div>
  );
}


export default App;
