import { Link } from "react-router-dom"

function Header() {
    
  return (
    <header className="flex justify-between items-center border-b-2 border-gray-100">
        <div>
            <Link to="/">
                <img src="ciphermarket.jpg" alt="ciphermarket" className="w-[10rem]"/>
            </Link>
        </div>
        <div className="flex items-center gap-2 mr-4">
            <button className="flex items-center border input !py-1 !px-2 gap-1 rounded-md hover:ring-2 hover:ring-blue-500">
                <span className="pi pi-map-marker"></span>
                <small>USA</small>
            </button>
            <div >
                <Link to="/dashboard" className="border p-1 flex box-center !rounded-full !w-8 !h-8 bg-blue-500 text-white input hover:ring-2 hover:ring-blue-500">
                    <span className="pi pi-plus"></span>
                </Link>
            </div>
            <div>
                <Link to="/auth" className="border p-1 flex box-center !rounded-full !w-8 !h-8 bg-blue-500 text-white input hover:ring-2 hover:ring-blue-500">
                    <span className="pi pi-user"></span>
                </Link>
            </div>
        </div>
    </header>
  )
}

export default Header