/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SideBar({categories}) {

    return (
        <div className="border-r px-2">
            <h4 className="my-5">Categories</h4>
            <ul className="">
                {categories?.data .map(category => (
                    <li key={category._id} className="flex items-center gap-2 my-1 hover:bg-slate-100 p-2 cursor-pointer duration-200 ease-in-out rounded-md w-full">
                        <div className="w-5 h-5 flex box-center">
                            <FontAwesomeIcon className="text-slate-400" icon={['fas', `${category.icon}`]} /> 
                        </div>
                        <p className="text-sm truncate text-slate-700 w-full">{category.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SideBar