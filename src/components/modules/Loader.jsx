import { ProgressSpinner } from 'primereact/progressspinner';

import "./Loader.css"

function Loader() {
    return (
        <div className="flex w-screen h-screen box-center flex-col">
            <ProgressSpinner style={{width: '30px', height: '30px',}} strokeWidth="5" fill="transparent" animationDuration=".5s" />
            <span className='mt-4 text-slate-400 text-sm'>loading...</span>
        </div>
    )
}

export default Loader