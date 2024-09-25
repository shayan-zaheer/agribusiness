import { useSelector } from "react-redux"

function SideItem({text, icon, active, onClick}) {
    const open = useSelector(store => store.bar);
  return (
    <li onClick={onClick} className={`flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-aitem ${active ? "bg-green-50" : "hover:bg-green-100 text-black"}`} >
        {icon}
        <span className={`overflow-hidden transition-all ${open ? "w-52 ml-3" : "w-0"}`}>{text}</span>
    </li>
  )
}

export default SideItem