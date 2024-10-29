import { Modal } from "antd";
import redline from "../assets/modals/redLine.png";
import Button from "../components/shared/button";

const AddTraits = ({ istraitmodal, setistraitmodal }: any) => {

  const handleOk = () => {
    setistraitmodal(false);
  };

  const handleCancel = () => {
    setistraitmodal(false);
    console.log("Modal should close now");
  };
  return (
    <>
      <Modal
        open={istraitmodal}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
        width={618}
        footer={null}
      >
        <div className="connectModal">
          <div className="w-full">
            <p className="fw-bold ex-large font-Apex font-normal darkBlack text-center">
              Add traits
            </p>
          </div>
          <div className="innerContent flex flex-col items-center gap-5 mt-4 ">

            <img src={redline} alt="" />
            <div className="enterAmount flex-center gap-4  w-full mt-3">
              <div className="typeArea flex flex-col w-1/2 gap-2">
                <label className="darkBlack font-Roboto medium font-normal">Type</label>
                <input className="rounded-lg py-3.5 px-6 w-full border-solid border-2 border-[#E7E7E7]" placeholder="Ex. Size" type="text" />
              </div>

              <div className="typeArea flex flex-col w-1/2 gap-2">
                <label className="darkBlack font-Roboto medium font-normal">Name</label>
                <input className="rounded-lg py-3.5 px-6 w-full border-solid border-2 border-[#E7E7E7]" placeholder="Ex. Large" type="text" />
              </div>
              {/* <p className="darkBlack font-Roboto medium font-normal">Type</p>
         <input className="rounded-lg py-3.5 px-6 w-full border-solid border-2 border-[red]" placeholder="Minimum bid 3.52 FRY " type="text" /> */}
            </div>





            <img className="mt-6" src={redline} alt="" />

            <div className="btnWrapper w-full flex justify-end mt-1">


              <Button
                className="button btn-primary medium font-Roboto font-medium"
                width={97}
                minHeight={53}
                text="ADD"
                onClick={handleCancel}
              ></Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AddTraits