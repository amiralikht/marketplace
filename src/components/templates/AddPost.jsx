/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { InputText } from 'primereact/inputtext';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { InputNumber } from 'primereact/inputnumber';

import { useQuery } from '@tanstack/react-query';
import { getCategory } from '../../services/admin';
import { getCookie } from '../../utils/cookie';
import { changeCurrency } from '../../utils/helpers';


function AddPost() {
    const { data } = useQuery({queryKey:["get-categories"], queryFn:getCategory});
    const [preview, setPreview] = useState();

    const [form, setForm] = useState({
        title:"",
        content:"",
        amount:null,
        city:"",
        category:"",
        images: null
    });
    const toast = useRef(null);

    const hiddenFileInput = useRef(null);

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };
    const changeHandler = (event) => {
        const name = event.target.name;
        if(name !== "images") {
            setForm({...form, [name]: event.target.value})
        }else{
            setForm({...form, [name]: event.target.files[0]});
        }        
    }
    const addHandler = (event)=>{
        event.preventDefault();
        const formData = new FormData();
        for (let i in form) {
            formData.append(i, form[i]);
        }
        const token = getCookie("accessToken");

        axios.post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
            headers:{
                "Content-Type": "multipart/form-data",
                Authorization: `bearer ${token}`
            }
        })
        .then(res=>{
            toast.current.show({ severity: 'success', summary: 'Created successfully', detail: res.data.message });
            setForm({
                title:"",
                content:"",
                amount:null,
                city:"",
                category:"",
                images: null
            })
        })
        .catch((error)=> toast.current.show({ severity: 'success', summary: 'Error', detail: "Something goes wrong. Please try again." }));
        setTimeout(()=>{toast.current.clear()},3000);

        console.log(formData);
    }
    useEffect(() => {
        if (!form.images) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(form.images)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [form.images])
    return (
        <>
            <Splitter className='w-full h-full' pt={{gutter:{class:'hover:bg-blue-500 duration-200 ease-in-out bg-slate-200'}}}>
                <SplitterPanel className="flex align-items-center justify-content-start pt-5 px-2 flex-col bg-white" size={20} minSize={15}>
                    <div className='border-b border-slate-200 pb-2'>
                        <h6 className='font-bold text-lg'>Adding post</h6>
                    </div>
                    <form className='mt-5 h-full overflow-y-auto px-2' onChange={changeHandler}>
                        <div className='mb-4'>
                            <label htmlFor="image" className='text-base'>Image</label>
                            <div onClick={()=>handleClick()} className="border cursor-pointer flex flex-col box-center rounded-md shadow-sm mt-2 p-5 hover:bg-slate-100 duration-200 hover:ring-2 hover:ring-blue-400">
                                <span className='pi pi-images bg-slate-200 p-3 rounded-full text-slate-600 text-[25px]'></span>
                                <p className='mt-2 text-slate-600'>Add photos</p>
                            </div>
                            <input
                                type="file"
                                id="images"
                                name='images'
                                ref={hiddenFileInput}
                                style={{ display: 'none' }}
                                onChange={handleClick}
                            />
                            
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="title" className='text-base'>Title</label>
                            <div className="input !mt-2">
                                <InputText id="title" name="title" placeholder='Title' className='w-full outline-none'/>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="content" className='text-base'>Description</label>
                            <div className="input !mt-2">
                                <InputTextarea id="content" name="content" placeholder='Description' className='w-full outline-none resize-none' rows={6}/>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="amount" className='text-base'>Price</label>
                            <div className="input !mt-2">
                                <InputText id="amount" name="amount" placeholder='Price' className='w-full outline-none'/>
                                {/* <InputNumber id="amount" name="amount" inputId="currency-us" mode="currency" currency="USD" locale="en-US" className='w-full outline-none' placeholder='Price'/> */}

                            </div>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="city" className='text-base'>City</label>
                            <div className="input !mt-2">
                                <InputText id="city" name="city" placeholder='City' className='w-full outline-none'/>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="list" className='text-base'>Lists</label>
                            <div className="input !mt-2 !pr-2">
                                <select id='category' name='category' placeholder="Select a category" className='w-full outline-none' defaultValue="">
                                    <option value="" disabled>Select a category</option>
                                    {data?.data.map(item=>(
                                        <option key={item._id} value={item._id}>{item.name}</option>
                                    ))}
                                </select>
                                
                            </div>
                        </div>
                    </form>
                    <div className='py-3 border-t border-slate-200 mt-3'>
                        <button className='main_btn w-full m-0' onClick={addHandler}>Save</button>
                    </div>
                </SplitterPanel>
                <SplitterPanel className="flex align-items-center justify-content-center p-5 bg-slate-100" size={80} minSize={75}>
                    <div className='border w-5/6 m-auto h-[95%] rounded-lg shadow-lg bg-white flex flex-col p-5'>
                        <div className='mb-4'>
                            <h5 className='font-semibold'>Preview</h5>
                        </div>
                        <div className='flex w-full h-[92%] border rounded-lg'>
                            <div className='bg-slate-100 w-3/5 h-full flex flex-col box-center'>
                            {form.images ? (
                                <div className='w-full h-full flex box-center'>
                                    <img src={preview} className='w-full h-full object-fill flex rounded-tl-lg rounded-bl-lg' />
                                </div>
                            ):(
                                <div className='w-3/4 m-auto text-center'>
                                    <h5 className='font-bold text-3xl text-slate-500 mb-4'>Your listing preview</h5>
                                    <span className='text-slate-400'>
                                        As you create your listing, you can preview how it will appear to others on Marketplace.
                                    </span>
                                </div>
                            )}
                            </div>
                            <div className='w-2/5 p-4'>
                                <div className='flex flex-col gap-2'>
                                    <h4 className='font-bold text-2xl text-slate-400 w-full break-all'>{form.title? form.title: 'Title'}</h4>
                                    <span className='text-slate-400 w-full break-all'>{form.amount? `$ ${changeCurrency(form.amount)}.00`: 'Price'}</span>
                                    <small className='text-slate-400 w-full break-all'>Listed a few seconds ago in {form.city? form.city: 'Your city'}</small>
                                </div>
                                <div className='flex flex-col gap-2 mt-10'>
                                    <h4 className=' text-[20px] text-slate-400'>Details</h4>
                                    <span className='text-slate-400 w-full break-all'>{form.content? form.content: 'Description will appear here.'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SplitterPanel>
            </Splitter>
            <Toast ref={toast} position="top-center" content={({ message }) => (
                <section className="p-3 gap-3 shadow-lg border text-black w-fit min-w-[20rem] fadeindown bg-white" style={{ borderRadius: '10px' }}>
                    <div className="flex items-center gap-2">
                        <div className={`flex w-fit rounded-full ${message.severity === 'success'? 'bg-green-500/70' : 'bg-red-500/70' }`}>
                            <i className={`pi text-xl ${message.severity === 'success'? 'pi-check-circle text-green-700' : 'text-red-700 pi-times-circle' }`}></i>    
                        </div>
                        <div>
                            <h6 className="m-0 font-semibold text-sm">{message.summary}</h6>
                        </div>
                    </div>
                    <div className="flex mt-2">
                        <p className="m-0 text-sm text-700">{message.detail}</p>
                    </div>
                </section>
            )}
            ></Toast>
        </>
    )
}

export default AddPost