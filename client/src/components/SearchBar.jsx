function SearchBar() {
  return (
    <div className="flex items-center justify-center m-5 min-w-64 text-black">
    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md min-w-28 focus:outline-none focus:ring-2 focus:ring-green-600" placeholder="Search..." />
</div>

  )
}

export default SearchBar;