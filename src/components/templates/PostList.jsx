import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteUserPost, getUserPost } from "../../services/user"
import Loader from "../modules/loader";
import { Button } from "primereact/Button";
import { changeCurrency } from "../../utils/helpers";

function PostList() {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const queryClient = useQueryClient()
    const {data, isLoading} = useQuery({queryKey:['my-post-list'], queryFn: getUserPost});
    const {mutate} = useMutation({mutationFn: deleteUserPost, onSuccess: ()=> {
        queryClient.invalidateQueries("my-post-list");
    }})
    
    const deletePost = (id)=>{
        try {
            if(!id) return;
            mutate(id);

        } catch (error) {
            console.log(error);
        }
    }  
    return (
        <div className="w-3/4 mx-auto mt-5 h-full">
            <h3 className="my-4 text-lg font-bold flex items-center gap-2 px-4">
                <span className="w-3 h-3 bg-blue-500/60 border border-blue-500 flex rounded-full"></span>
                My lists
            </h3>
            <div className="h-[calc(100%_-_4rem)] overflow-y-auto px-4 w-full">
                {isLoading? <Loader/> : data?.data.posts.map((post) => (
                    <div key={post._id} className="border rounded-md py-2 px-5 my-2 hover:shadow-lg hover:ring-2 hover:ring-blue-500 duration-200 ease-in-out cursor-default">
                        <div className="flex">
                            <div className="flex gap-2 w-full">
                                <img src={`${baseURL}/${post.images[0]}`} className="w-[10rem] h-[10rem] object-cover border rounded-lg shadow-sm"/>
                                <div>
                                    <div className="mb-2">
                                        <p className="font-semibold">{post.options.title}</p>
                                        <small><span className="text-slate-400">Uploaded at</span> {new Date(post.createdAt).toLocaleDateString("en-US")}</small>
                                    </div>
                                    <span className="text-slate-500 font-normal break-all">{post.options.content}</span>
                                </div>
                            </div>
                            <div className="flex items-start ">
                                <div className="flex items-end justify-start flex-col gap-4">
                                    <p className="bg-blue-300/30 text-blue-600 border border-blue-600/50 px-3 text-sm py-1 rounded-md">{new Date(post.createdAt).toLocaleDateString("en-US")}</p>
                                    <span className="bg-slate-100 text-slate-500 border border-slate-200 px-3 text-sm py-1 rounded-md">{changeCurrency(post.amount)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-end mt-3">
                            <Button icon="pi pi-trash text-[12px]" label="Delete post" className="secondary_btn !m-0 !p-2 hover:bg-red-400/20 !text-slate-500 hover:!text-red-600 outline-none ring-0 gap-1"
                            onClick={() => deletePost(post._id)}/>
                        </div>
                    </div>
                ))}
                {data?.data.posts.length<=0 && (
                    <span className="bg-slate-100 px-4 py-3 w-full flex rounded-md text-sm text-slate-600 gap-2 border border-slate-300">
                        <span className="pi pi-exclamation-triangle"></span>
                        We could not find any list
                    </span>
                )}
            </div>
        </div>
    )
}

export default PostList