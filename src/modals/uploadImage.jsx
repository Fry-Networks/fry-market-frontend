import React, { useState } from "react";
import { Modal } from "antd";
import redline from "../assets/modals/redLine.png";
import upoadIcon from "../assets/icons/imgIcon.svg";
import Button from "../components/shared/button";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
     onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
        console.error(info.file.error); // Log the error for further investigation
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

const UploadImage = ({ isuploadmodal, setisuploadmodal }) => {
  const handleOk = () => {
    setisuploadmodal(false);
  };

  const handleCancel = () => {
    setisuploadmodal(false);
    console.log("Modal should close now");
  };
  return (
    <>
      <Modal
        open={isuploadmodal}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
        width={618}
        footer={null}
      >
        <div className="connectModal">
          <div className="w-full">
            <p className="fw-bold ex-large font-Apex font-normal darkBlack text-center">
              UPLOAD IMAGE
            </p>
          </div>
          <div className="innerContent flex flex-col items-center gap-5 mt-4 ">
            <img src={redline} alt="" />
            <div className="w-full">
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                <img className="mx-auto" src={upoadIcon} alt="" />
                </p>
                <p className="ant-upload-text">
                Drag and Drop here, or
                </p>
                <Button
                  className="button btn-gray small font-normal font-Roboto mt-4"
                  minWidth={127}
                  minHeight={34}
                  text="Upload Profile"
             
                />
              </Dragger>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UploadImage;
