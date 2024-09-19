import { useSelector } from "react-redux"

function SideItem({text, icon, active}) {
    const open = useSelector(store => store.bar);
  return (
    <li className={`flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-aitem ${active ? "bg-gradient-to-tr from bg-green-700 to-green-200 text-green-950" : "hover:bg-green-100 text-black"}`} >
        {icon}
        <span className={`overflow-hidden transition-all ${open ? "w-52 ml-3" : "w-0"}`}>{text}</span>
    </li>
  )
}

export default SideItem