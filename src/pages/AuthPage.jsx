/* eslint-disable no-unused-vars */
import { useRef, useState } from "react"
import { useQuery } from "@tanstack/react-query";

import CheckOtpForm from "../components/templates/CheckOtpForm"
import SendOtpForm from "../components/templates/SendOtpForm"

import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/user";

function AuthPage() {
    const [step,setStep] = useState(1);
    const [mobile,setMobile] = useState("");
    const [code,setCode] = useState("");
    const toast = useRef(null);
    const navigate = useNavigate();
    const {refetch} = useQuery({queryKey: ["profile"],queryFn: getProfile});

    const changeStepHandler = (data,response) => {
        try {      
            setStep(data);
            if(data == 2) toast.current.show({ severity: 'success', summary: 'Successfully Sent', detail: response.message });
            else toast.current.show({ severity: 'danger', summary: 'Error', detail: response })
            setTimeout(()=>{toast.current.clear();},3000);
        } catch (error) {
            console.log(error);
        }
    }
    const checkedOtpHandler = (statusText,message) => {
        try {
            if(statusText == "OK") toast.current.show({ severity: 'success', summary: 'Successfully Logged in', detail: message });
            else toast.current.show({ severity: 'danger', summary: 'Error', detail: message })
            setTimeout(()=>{
                toast.current.clear();
                navigate("/");
                refetch();
            },3000);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex w-screen h-screen box-center">
            {step === 1 && <SendOtpForm changeStepHandler={changeStepHandler} mobile={mobile} setMobile= {setMobile}/>} 
            {step === 2 && <CheckOtpForm code={code} setCode={setCode} mobile={mobile} setStep={setStep} checkedOtpHandler={checkedOtpHandler}/>}
            <Toast ref={toast} position="bottom-left" content={({ message }) => (
                <section className="p-3 gap-3 shadow-lg border text-black w-fit min-w-[20rem] fadeindown" style={{ borderRadius: '10px' }}>
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
        </div>
    )
}

export default AuthPage