import React from 'react';
import Button from "../components/shared/button";
import { useNavigate } from "react-router-dom";


const NotFound = () => {
    const navigate = useNavigate();
  return (
    <>
    <div className='flex flex-col  justify-center items-center mt-10'>
    <h1 className="!text-[140px]  font-bold bg-[linear-gradient(318deg,#FD0000_26.88%,#FF9292_105.85%)] bg-clip-text text-transparent">
  404
</h1>


        <h2 className='font-medium'>Page Not Found</h2>
        <Button
                className="button btn-primary large font-Roboto font-medium cursor-pointer mt-8"
                width={184}
                minHeight={53}
                text="Go Back"
                onClick={(()=>(
                    navigate("/")
                ))}
          
              ></Button >
    </div>
    </>
  )
}

export default NotFound;