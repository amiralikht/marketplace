import { useState } from "react";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from 'primereact/Button';
import { InputText } from 'primereact/inputtext';
import { addCategory } from '../../services/admin';
import { Dialog } from 'primereact/dialog';

function CategoryForm() {
    const queryClient = useQueryClient()
    const [form, setForm] = useState({name:"", slug:"", icon:""});
    const [visible, setVisible] = useState(false);

    const {mutate, isPending, isError, isSuccess, error} = useMutation({mutationFn: addCategory, onSuccess: ()=> queryClient.invalidateQueries("get-categories")});
    
    const changeHandler = (event)=>{
        setForm({...form,[event.target.name]: event.target.value})
    }
    const submitHandler = (event)=>{
        event.preventDefault();        
        try {
            if(!form.name || !form.slug || !form.icon) {
                return
            }
            mutate(form);
        } catch (error) {
            console.log(error);
            
        }
        
    }
    const show = () => {
        setVisible(true);
    };
    const headerElement = (
        <h3 className='flex items-center gap-2'>
            <span className='bg-blue-500/30 border border-blue-600 rounded-md p-1.5 text-blue-600 text-sm flex pi pi-list'></span>
            <span className='font-semibold'>New list</span>
        </h3>
    );
    return (
        <>
        <div className="w-3/4 mx-auto mt-5">
            <Button label="Adding a new list" icon="pi pi-plus" onClick={() => show()} className="flex items-center gap-2 main_btn mb-4 mt-2" />
        </div>
        <Dialog header={headerElement} visible={visible} position={'right'} onHide={() => {if (!visible) return; setVisible(false); }} modal draggable={false} resizable={false} contentClassName="w-[50vw] h-screen px-5" headerClassName="px-5 py-4" dismissableMask={false} blockScroll={true}>

            <form onChange={changeHandler} onSubmit={submitHandler} className='w-full h-full overflow-y-hidden px-2'>
                <div className=''>
                    <div>
                        <label htmlFor="listName" className='text-sm'>List name</label>
                        <div className="input">
                            <InputText id="name" name="name" aria-describedby="listName-help" />
                        </div>
                        <small id="listName-help" className='text-gray-400 flex gap-1 items-center'>
                            <span className='pi pi-info-circle text-sm'></span>
                            Enter your list name
                        </small>
                    </div>
                    <div>
                        <label htmlFor="slug" className='text-sm'>Slug</label>
                        <div className="input">
                            <InputText id="slug" name="slug" aria-describedby="slug-help" />
                        </div>
                        <small id="slug-help" className='text-gray-400 flex gap-1 items-center'>
                            <span className='pi pi-info-circle text-sm'></span>
                            Enter the slug
                        </small>
                    </div>
                    <div>
                        <label htmlFor="icon" className='text-sm'>Icon</label>
                        <div className="input">
                            <InputText id="icon" name="icon" aria-describedby="icon-help" />
                        </div>
                        <small id="icon-help" className='text-gray-400 flex gap-1 items-center'>
                            <span className='pi pi-info-circle text-sm'></span>
                            Enter an icon for this list
                        </small>
                    </div>
                </div>
                <div className='flex items-center gap-2 mt-5'>
                    <Button type="submit" label='Create' loading={isPending} className='main_btn !px-4'/>
                    <div>
                        {isError ? (
                            <small className='text-red-600'>An error occurred: {error.message}</small>
                        ) : null}
                        {isSuccess ? <small className='text-green-600'>List added!</small> : null}
                    </div>
                </div>
            </form>

        </Dialog>
        </>
    )
}

export default CategoryForm