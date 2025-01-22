import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteCategory, getCategory } from "../../services/admin"
import Loader from "../modules/loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "primereact/Button";


function CategoryList() {
    const {data, isLoading} = useQuery({queryKey:["get-categories"], queryFn:getCategory});

    const queryClient = useQueryClient();

    const {mutate} = useMutation({mutationFn: deleteCategory, onSuccess: ()=> queryClient.invalidateQueries("get-categories") })
    
    const deleteList = (id) => {
        try {
            if(!id) return;
            mutate(id);

        } catch (error) {
            console.log(error);
            
        }
    }
    
    return (
        <div>
            {isLoading ? <Loader/> : (
                data.data.map(item=>(
                    <div key={item._id} className="border rounded-md p-2 flex my-2 hover:shadow-lg hover:ring-2 hover:ring-blue-500 duration-200 ease-in-out cursor-default">
                        <div className="flex gap-2 w-full">
                            <div>
                                <FontAwesomeIcon className="text-slate-400" icon={['fas', `${item.icon}`]} /> 
                            </div>
                            <div>
                                <h4 className="font-semibold">{item.name}</h4>
                                <small className="text-blue-500 font-normal">Slug: {item.slug}</small>
                            </div>

                        </div>
                        <div className="flex items-center justify-center">
                            <Button icon="pi pi-times text-[12px]" className="secondary_btn !m-0 !p-3 w-5 h-5 hover:bg-red-400/20 !text-slate-500 hover:!text-red-600 outline-none ring-0"
                            onClick={() => deleteList(item._id)}/>
                        </div>
                    </div>
                ))
            )
            }
        </div>
    )
}

export default CategoryList