import { Modal, Select } from "antd";
import pixico from "../assets/createNft/pixico.webp";
import redline from "../assets/modals/redLine.png";
import Button from "../components/shared/button";

const BoostNft = ({ isboostmodal, setisboostmodal }: any) => {

  const handleOk = () => {
    setisboostmodal(false);
  };

  const handleCancel = () => {
    setisboostmodal(false);
    console.log("Modal should close now");
  };

  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <Modal
        open={isboostmodal}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
        width={580}
        footer={null}
      >
        <div className="connectModal">
          {/* <div className="w-full">
          <p className="fw-bold ex-large font-Apex font-normal darkBlack text-center">
            Add traits
          </p>
        </div> */}
          <div className="innerContent flex flex-col items-center gap-4 mt-4 ">
            <img src={pixico} alt="" />
            <div className="uploadImg flex-center gap-2  w-full">

              <p className="darkBlack font-Roboto ex-large font-normal font-Apex">Pixacio</p>
            </div>
            <img src={redline} alt="" />
            <div className="innerContent flex flex-col gap-9 w-full">
              <div className="price flex w-full justify-between">
                <p className="darkBlack font-Roboto medium font-normal">Price</p>
                <p className="darkBlack font-Roboto medium font-medium">7.01 FRY</p>
              </div>


              <div className="price flex w-full justify-between">
                <p className="darkBlack font-Roboto medium font-normal">Duration</p>
                <div>
                  <Select
                    defaultValue="hours"
                    style={{
                      width: 100,
                      border: "2px solid transparent",

                    }}
                    onChange={handleChange}
                    options={[
                      {
                        value: 'hours',
                        label: '24 Hours',
                      },
                      {
                        value: 'minutes',
                        label: '30 Minutes',
                      },
                      {
                        value: 'second',
                        label: '10 Seconds',
                      },

                    ]}
                  />
                </div>
              </div>

              <div className="price flex flex-col gap-3 w-full">
                <p className="darkBlack font-Roboto medium font-medium mb-3">Details:</p>
                <ul className="lightGray medium font-normal font-Roboto flex flex-col justify-start list-disc ps-10">
                  <li>Get your NFT highlighted in the featured section for one day. </li>
                  <li>Perfect for a quick visibility boost to attract immediate attention.</li>
                </ul>
              </div>

              <div className="price flex w-full justify-between">
                <p className="darkBlack font-Roboto medium font-normal">Performance Indicator:</p>
                <p className="primary font-Roboto medium font-medium">"Expected Increase: +300% visibility"</p>
              </div>
              <img src={redline} alt="" />

            </div>


            <div className="btnWrapper w-full flex-center mt-1">
              <Button
                className="button btn-primary medium font-Roboto font-medium"
                width={284}
                minHeight={53}
                text="Boost Now"
                onClick={handleCancel}
              ></Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default BoostNft;