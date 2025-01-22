/* eslint-disable react/prop-types */
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/Button";
import { sendOtp } from "../../services/auth";
import { useState } from "react";


function SendOtpForm({changeStepHandler, mobile, setMobile}) {
    const [loading, setLoading] = useState(false);

    const submitHandler = async(event) => {
        try {
            setLoading(true);
            event.preventDefault();
            if (mobile.length !== 10) return;
    
            const{response, error} = await sendOtp(mobile);
            if(response) changeStepHandler(2,response.data);
            if(error) changeStepHandler(1,error.response.data.message);
    
            setLoading(false);
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <>
        <form onSubmit={submitHandler} className='border shadow-md rounded-md p-5 w-1/3 flex flex-col'>
            <h6 className="my-3 text-lg font-semibold tracking-normal">Login to your account</h6>
            <span className="text-sm my-3 tracking-wide">
                Please enter your phone number to use all <strong>Market place</strong> features.
            </span>
            <div>
                <label htmlFor="username" className="text-[12px] text-gray-800">Enter your phone number</label>
                <div className="input">
                    <div className="shrink-0 select-none text-gray-500">+1</div>
                    <InputText className="pl-2" id="username" aria-describedby="username-help" placeholder="Phone number" value={mobile} onChange={e => setMobile(e.target.value)}/>
                </div>
                <small id="username-help" className="text-[12px] text-gray-400 flex gap-1 items-center">
                    <span className="pi pi-info-circle"></span>
                    Verification code will send to this phone number
                </small>
            </div>
            <div className="flex box-center mt-10">
            <Button type="submit" loading={loading} className="main_btn" label="Send verification code"/>
            </div>
        </form>
    </>
  )
}

export default SendOtpForm