import Button from "./button";

const Header = () => {
  return (
    <>
      <div className="headingWrapper">
        <h2 className="font-normal font-Apex">Featured Collection</h2>
        <Button
          className="button btn-secondary large font-medium"
          minWidth={213}
          minHeight={58}
          text="Last 30 minutes"
        ></Button>
      </div>
    </>
  );
};

export default Header;
