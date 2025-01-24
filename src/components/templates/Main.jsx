/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { changeCurrency } from "../../utils/helpers";


function Main({posts}) {
    const baseURL = import.meta.env.VITE_BASE_URL;
    
    return (
        <div className="bg-slate-50 w-full h-full">
            <div className="grid grid-cols-4 gap-4 overflow-y-auto h-full px-5 py-3">
                {posts.data.posts.map(post=>(
                    <Link to="#" key={post._id} className="border rounded-md hover:shadow-lg hover:ring-2 hover:ring-blue-500 duration-200 ease-in-out p-1 bg-white ">
                        <div className="h-[60%]">
                            <img src={`${baseURL}/${post.images[0]}`} className="w-full h-full object-fill rounded-[5px] shadow border" />
                        </div>
                        <div className="px-1 py-4 flex flex-col justify-between w-full h-[40%]">
                            <div>
                                <h5 className="font-semibold text-[18px] truncate">
                                    {post.options.title}
                                </h5>
                                <small className="text-gray-400">
                                    Posted at {new Date(post.createdAt).toLocaleDateString("en-US")}
                                </small>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="flex items-center gap-1">
                                    <span className="pi pi-map-marker text-sm text-blue-400"></span>
                                    <span className="text-sm text-slate-700">{post.options.city}</span>
                                </p>
                                <p>{changeCurrency(post.amount)}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Main