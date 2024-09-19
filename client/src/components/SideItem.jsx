function SideItem({text, icon, active}) {
  return (
    <li className={`flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-aitem ${active ? "bg-gradient-to-tr from bg-green-700 to-green-200 text-green-950" : "hover:bg-green-100 text-black"}`} >
        {icon}
        <span className="w-52 ml-3 drop-shadow-lg">{text}</span>
    </li>
  )
}

export default SideItem