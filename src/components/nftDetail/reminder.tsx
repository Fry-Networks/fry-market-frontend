import Button from "../shared/button"

const Reminder = ({ hide, showReminder }: any) => {
  return (
    <>
      <div className="salesEndDiv bg-white flex flex-col mt-6">
        <div className="salesHeader p-5">
          <img src="/src/assets/icons/grayClock.svg" alt="" />
          <p className="lightGray font-normal text-[16px]">Sale ends 18 November 2023 at 8:47 am </p>
        </div>
        <div className="salesBody p-5 flex flex-col gap-5 ">
          <div className="area1">
            <p className="ex-small lightGray font-Roboto">Current price</p>
            <p className="font-medium text-black ex-large mt-1">5.001 FRY</p>
          </div>
          <div className="area2 flex-center gap-3">

            <>
              <Button className="button btn-secondary large font-medium btnBuy" minWidth={343} minHeight={44} text="Buy now"></Button>

              <Button className="button btn-primary large font-medium btnOffer" minWidth={343} minHeight={44} text="Make offer"></Button>

            </>


            <div >
              {/* <Button className="button btn-primary large font-medium btnOffer" minWidth={343} minHeight={44} text="Place Bid"></Button> */}

            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default Reminder
