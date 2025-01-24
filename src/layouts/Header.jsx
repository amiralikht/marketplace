import { Link } from "react-router-dom"
import { OverlayPanel } from 'primereact/overlaypanel';
import { useRef } from "react";
import { logOut } from "../services/auth";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/user";

function Header() {
    const {data} = useQuery({queryKey: ["profile"],queryFn: getProfile});
    
    const op = useRef(null);
    const logout = () => {
        logOut();
        setTimeout(() => {
            window.location.href = "/auth"; // Correct usage of window.location.href
        }, 2000);
    }
    return (
        <header className="flex justify-between items-center border-b-2 border-gray-100 h-16">
            <div>
                <Link to="/">
                    <img src="ciphermarket.jpg" alt="ciphermarket" className="w-[10rem]"/>
                </Link>
            </div>
            {data ? (
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
                        <button className="border p-1 flex box-center !rounded-full !w-8 !h-8 bg-blue-500 text-white input hover:ring-2 hover:ring-blue-500" onClick={(e) => op.current.toggle(e)}>
                            <span className="pi pi-user"></span>
                        </button>
                        <OverlayPanel ref={op} className="min-w-[15rem] p-1 border shadow-lg">
                            <ul>
                                <li className="p-2 text-sm hover:bg-slate-100 my-1 rounded-md text-slate-500 hover:text-slate-800 duration-200 ease-in-out">
                                <Link to="/my_list" className="flex items-center gap-2">
                                    <span className="pi pi-list text-sm"></span>
                                    <span className="">
                                        My lists
                                    </span>
                                </Link>
                                </li>
                                <li className="p-2 text-sm hover:bg-slate-100 my-1 rounded-md text-slate-500 hover:text-slate-800 duration-200 ease-in-out">
                                <Link to="/admin" className="flex items-center gap-2">
                                    <span className="pi pi-user text-sm"></span>
                                    <span className="">
                                        Admin dashboard
                                    </span>
                                </Link>
                                </li>
                                <li className="p-2 text-sm hover:bg-red-100 my-1 rounded-md text-slate-500 hover:text-red-700 duration-200 ease-in-out">
                                <button className="flex items-center gap-2 w-full" onClick={logout}>
                                    <span className="pi pi-sign-out text-sm"></span>
                                        <span className="">
                                            Logout
                                        </span>
                                </button>
                                </li>
                            </ul>
                        </OverlayPanel>
                    </div>
                </div>
            ):(
                <div className="lex items-center gap-2 mr-4">
                    <Link to="/auth" className="main_btn">Login</Link>
                </div>
            )}
        </header>
    )
}

export default Header