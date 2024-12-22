import { Modal } from "antd";
import noneImg from "../assets/modals/addStylePic1.png";
import cartoonImg from "../assets/modals/addStylePic2.webp";
import modlarImg from "../assets/modals/addStylePic3.webp";
import animeImg from "../assets/modals/addStylePic4.webp";
import fantasyImg from "../assets/modals/addStylePic5.webp";
import realisticImg from "../assets/modals/addStylePic6.webp";
import redline from "../assets/modals/redLine.png";
import Button from "../components/shared/button";

const AddStyleModal = ({ isstylemodal, setisstylemodal, selectedStyle, setSelectedStyle }: any) => {

  const handleOk = () => {
    setisstylemodal(false);
  };

  const handleCancel = () => {
    setisstylemodal(false);
    // console.log("Modal should close now");
  };

  const handleSelect = (style: string) => {
    setSelectedStyle(style);
  };

  return (
    <>
      <Modal
        open={isstylemodal}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
        width={504}
        footer={null}
      >
        <div className="connectModal">
          <div className="w-full">
            <p className="fw-bold ex-large font-Apex font-normal darkBlack text-center">
              Select a style
            </p>
          </div>
          <div className="innerContent flex flex-col items-center gap-5 mt-4 ">
            <img src={redline} alt="" />
            <div className="w-full selectAvatar flex gap-3">
              <div
                className={`noneDiv w-1/2 cursor-pointer ${selectedStyle === "none" ? "selected" : ""}`}
                onClick={() => handleSelect("none")}
              >
                <img
                  className="max-h-[238px] max-w-[211px] w-full h-full"
                  src={noneImg}
                  alt=""
                />
              </div>
              <label
                htmlFor="Cartoon"
                className={`w-1/2 cursor-pointer part2 bg-[#E7E7E7] p-1.5 flex-col gap-1.5 flex rounded-xl ${selectedStyle === "Cartoon" ? "selected" : ""
                  }`}
                onClick={() => handleSelect("Cartoon")}
              >
                <input className="hidden" type="checkbox" id="Cartoon" />
                <img
                  className="max-w-[220px] max-h-[188px] w-full h-full object-cover mx-auto rounded-xl"
                  src={cartoonImg}
                  alt=""
                />
                <Button
                  className="button btn-whiteClr medium font-Roboto font-medium"
                  width={211}
                  minHeight={44}
                  text="Cartoon"
                ></Button>
                {selectedStyle === "Cartoon" && (
                  <div className="overlay">
                    <span>Selected</span>
                  </div>
                )}
              </label>
            </div>
            <div className="w-full selectAvatar flex gap-3">
              <div
                className={`w-1/2 cursor-pointer part1 bg-[#E7E7E7] p-1.5 flex-col gap-1.5 flex rounded-xl ${selectedStyle === "modlar" ? "selected" : ""
                  }`}
                onClick={() => handleSelect("3D Model")}
              >
                <img
                  className="max-w-[220px] max-h-[188px] w-full h-full object-cover mx-auto rounded-xl"
                  src={modlarImg}
                  alt=""
                />
                <Button
                  className="button btn-whiteClr medium font-Roboto font-medium"
                  width={211}
                  minHeight={44}
                  text="3D Model"
                ></Button>
                {selectedStyle === "3D Model" && (
                  <div className="overlay">
                    <span>Selected</span>
                  </div>
                )}
              </div>
              <div
                className={`part2 cursor-pointer w-1/2 bg-[#E7E7E7] p-1.5 flex-col gap-1.5 flex rounded-xl ${selectedStyle === "Anime" ? "selected" : ""
                  }`}
                onClick={() => handleSelect("Anime")}
              >
                <img
                  className="max-w-[220px] max-h-[188px] w-full h-full object-cover mx-auto rounded-xl"
                  src={animeImg}
                  alt=""
                />
                <Button
                  className="button btn-whiteClr medium font-Roboto font-medium"
                  width={211}
                  minHeight={44}
                  text="Anime Style"
                ></Button>
                {selectedStyle === "Anime" && (
                  <div className="overlay">
                    <span>Selected</span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full selectAvatar flex gap-3">
              <div
                className={`w-1/2 cursor-pointer part1 bg-[#E7E7E7] p-1.5 flex-col gap-1.5 flex rounded-xl ${selectedStyle === "Fantasy" ? "selected" : ""
                  }`}
                onClick={() => handleSelect("Fantasy")}
              >
                <img
                  className="max-w-[220px] max-h-[188px] w-full h-full object-cover mx-auto rounded-xl"
                  src={fantasyImg}
                  alt=""
                />
                <Button
                  className="button btn-whiteClr medium font-Roboto font-medium"
                  width={211}
                  minHeight={44}
                  text="Fantasy Art"
                ></Button>
                {selectedStyle === "Fantasy" && (
                  <div className="overlay">
                    <span>Selected</span>
                  </div>
                )}
              </div>
              <div
                className={`w-1/2 cursor-pointer part2 bg-[#E7E7E7] p-1.5 flex-col gap-1.5 flex rounded-xl ${selectedStyle === "Realistic" ? "selected" : ""
                  }`}
                onClick={() => handleSelect("Realistic")}
              >
                <img src={realisticImg} alt="" />
                <Button
                  className="button btn-whiteClr medium font-Roboto font-medium"
                  width={211}
                  minHeight={44}
                  text="Realistic"
                ></Button>
                {selectedStyle === "Realistic" && (
                  <div className="overlay">
                    <span>Selected</span>
                  </div>
                )}
              </div>
            </div>
            <div className="btnWrapper w-full flex justify-between mt-3">
              <Button
                className="button btn-primary small font-Roboto font-medium mx-auto"
                width={90}
                minHeight={43}
                text="Done"
                onClick={handleCancel}
              ></Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddStyleModal;
