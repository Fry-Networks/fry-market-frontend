import { useWallet } from "@txnlab/use-wallet";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import readyDropIcon from "../../assets/home/images/homeImages/readyDropBtn.webp";
import Input from "../shared/input";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ReadyForNext = () => {

  const [email, setEmail] = useState("")
  const { activeAccount } = useWallet();
  const saveEmail = () => {
    if (!activeAccount?.address) {
      toast.error("Please connect wallet first")
      return;

    }
    if (!email) {
      toast.error("Please enter your email")
      return;

    }

    const isValidEmail = email.toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )

    if (!isValidEmail) {
      toast.error("Please enter a valid email")
      return;

    }

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/store-email`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        "wallet_address": activeAccount?.address.toString(),
        "email": email
      }
    };

    axios.request(config).then((response) => {

      // console.log("Email", response);
      if (response.status == 201) {

        toast.success("Email registered successfully for air drop")
        setEmail("")
      }

      else {
        toast.error("Some error occured while registering for air drop")

      }
    }).catch((error) => {
      if (error.status == 409) {
        toast.error("Email already registered for air drop")
      }
      else {

        toast.error("Some error occured while registering for air drop")
      }
    })


  }

  const placeholderStyle = {
    color: "red"
  };
  return (
    <>
      <div className="nextNftWrapper">
        <div className="container mb-10">
          <h2 className="font-bold font-Oxanium capitalize darkBlack mb-10 text-center">
            Ready<span className="lowercase"> for  the</span> Next NFT Drop?
          </h2>

          <div
            style={{ width: "680px", height: "96px", margin: "0 auto" }}
            className="relative nftDropInput "
          >
            <Input
              wrapperClass="flex items-center   justify-center mx-auto z-10 border-2 border-red-500 "
              placeholder="info@gmail.com"
              inputClass="ex-large font-normal font-Roboto primary mx-auto  flex items-center justify-center custom-placeholder border-2 border-red-500"
              width={680}
              height={96}
              minHeight={96}
              type="text"
              className="m-auto nftdropInput"
              value={email}
              onChange={(e: any) => (setEmail(e.target.value))}


            />

            <img
              className="absolute top-[17px] right-8 object-cover cursor-pointer emailBtn"
              style={{ width: "88px", height: "76px" }}
              src={readyDropIcon}
              alt=""
              onClick={saveEmail}
            />

          </div>
        </div>
      </div>
    </>
  );
};

export default ReadyForNext;
