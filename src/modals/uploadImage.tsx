import { message, Modal, Upload } from "antd";
import upoadIcon from "../assets/icons/imgIcon.svg";
import redline from "../assets/modals/redLine.png";
import Button from "../components/shared/button";
const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info: any) {
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
  onDrop(e: any) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const UploadImage = ({ isuploadmodal, setisuploadmodal }: any) => {
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
        width={511}
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
            <div className="w-full max-h-[285px] h-full">
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <img className="mx-auto" src={upoadIcon} alt="" />
                </p>
                <p className="ant-upload-text">
                  Drag and Drop here, or
                </p>
                <Button
                  className="button btn-gray small font-normal font-Roboto mt-4 rounded "
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
