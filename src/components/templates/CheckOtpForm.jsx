/* eslint-disable react/prop-types */
import { Button } from 'primereact/Button'
import { InputOtp } from 'primereact/inputotp';
import { useState } from 'react';

import '../../styles/otpForm.css'
import { checkOtp } from '../../services/auth';
import { setCookie } from '../../utils/cookie';

function CheckOtpForm({code, setCode, mobile, setStep,checkedOtpHandler}) {

  const [loading, setLoading] = useState(false);

  const submitHandler = async(event)=>{
    setLoading(true);
    event.preventDefault();
    if(code.length !== 5)return;
    const{response, error} = await checkOtp(mobile,code);
    if(response){
      setCookie(response.data);
      checkedOtpHandler(response.statusText,response.data.message)
    }
    if(error){
      checkedOtpHandler(error.response.statusText,error.response.data.message)
      console.log(error.response.data.message);
      
    }
    setLoading(false);

  }
  // statusText
  // 4709087528
  return (
    <form onSubmit={submitHandler} className='border shadow-md rounded-md p-5 w-1/3 flex flex-col'>
      <h6 className="my-3 text-lg font-semibold tracking-normal">Confirm the code</h6>
      <span className="text-sm my-3 tracking-wide">
          Please enter the code sent to <strong className='underline underline-offset-2'>+1 {mobile}</strong>.
      </span>
        <div className="flex py-2 w-full justify-center my-3">
          <InputOtp value={code} onChange={(e) => setCode(e.value)} integerOnly length={5}/>
        </div>
      <div className="flex justify-end">
      <Button onClick={()=>{setStep(1)}} className="secondary_btn !text-gray-400" label="Change phone number"/>
      <Button type="submit" loading={loading} className="main_btn !px-3 !py-1" label="Verify"/>
      </div>
    </form>
  )
}

export default CheckOtpForm