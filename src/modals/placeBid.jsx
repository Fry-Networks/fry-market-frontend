import React, { useState } from "react";
import {  Modal } from "antd";
import redline from "../assets/modals/redLine.png";
import Button from "../components/shared/button";

const PlaceBid = ({ isbidmodal, setisbidmodal}) => {

    const handleOk = () => {
        setisbidmodal(false);
      };
    
      const handleCancel = () => {
        setisbidmodal(false);
        console.log("Modal should close now");
      };
  return (
<>
<Modal
        open={isbidmodal}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
        width={415}
        footer={null}
      >
        <div className="connectModal">
          <div className="w-full">
            <p className="fw-bold ex-large font-Apex font-normal darkBlack text-center">
          Place your bid
            </p>
          </div>
          <div className="innerContent flex flex-col items-center gap-5 mt-4 ">
        
            <img src={redline} alt="" />
        <div className="enterAmount flex flex-col justify-start gap-2 w-full mb-5 mt-3">
            <p className="darkBlack font-Roboto medium font-normal">Enter bid amount</p>
            <input className="rounded-lg py-3.5 px-6 w-full border-solid border-2 border-[red]" placeholder="Minimum bid 3.52 FRY " type="text" />
        </div>
        <div className="serviceDiv w-full flex justify-between items-center">
            <p className="darkBlack font-Roboto medium font-normal">Service fee</p>
            <p className="darkBlack font-Roboto medium font-medium">0.1 FRY</p>
        </div>
        <img src={redline} alt="" />
        <div className="serviceDiv w-full flex justify-between items-center mb-7 mt-3">
            <p className="darkBlack font-Roboto medium font-normal">Marketplace fee</p>
            <p className="darkBlack font-Roboto medium font-medium">0.5 FRY</p>
        </div>
        <div className="serviceDiv w-full flex justify-between items-center">
            <p className="darkBlack font-Roboto medium font-normal">Total bid amount</p>
            <p className="darkBlack font-Roboto ex-large font-medium">4.12 FRY</p>
        </div>
        <img src={redline} alt="" />

        <div className="btnWrapper w-full flex justify-between mt-3">
        <Button
              className="button btn-whiteClr medium font-Roboto font-medium"
              width={166}
              minHeight={53}
              text="Cancel"
            ></Button>
            
        <Button
              className="button btn-primary medium font-Roboto font-medium"
              width={166}
              minHeight={53}
              text="Place bid"
            ></Button>
        </div>
          </div>
        </div>
      </Modal>
</>
  )
}

export default PlaceBid;