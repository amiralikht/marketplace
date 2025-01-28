import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPost } from "../services/user";

import Loader from "../components/modules/loader";
import { changeCurrency } from "../utils/helpers";

function PostPage() {
    const { id } = useParams();
    const {data, isLoading} = useQuery({queryKey:["get-post"], queryFn:() => getPost(id)});
    const post = data?.data.post;
    const baseURL = import.meta.env.VITE_BASE_URL;
    console.log(post);
    
    return (
    <>
        {isLoading ? <Loader/>
        :(
            <div className='flex w-full h-full rounded-lg py-4'>
                <div className='bg-slate-100 w-3/5 h-full flex flex-col box-center'>
                <div className='w-full h-full flex box-center'>
                    <img src={`${baseURL}/${post.images[0]}`} className='w-full h-full object-fill flex rounded-tl-lg rounded-bl-lg' />
                </div>
                </div>
                <div className='w-2/5 p-4'>
                    <div className='flex flex-col gap-2'>
                        <h4 className='font-bold text-2xl text-slate-400 w-full break-all'>{post.title}</h4>
                        <span className='text-slate-400 w-full break-all'>{`${changeCurrency(post.amount)}.00`}</span>
                        <small className='text-slate-400 w-full break-all'>Listed a few seconds ago in {post.options.city}</small>
                    </div>
                    <div className='flex flex-col gap-2 mt-10'>
                        <h4 className=' text-[20px] text-slate-400'>Details</h4>
                        <span className='text-slate-400 w-full break-all'>{post.options.content}</span>
                    </div>
                </div>
            </div>
        )}
    </>
    )
}
export default PostPage