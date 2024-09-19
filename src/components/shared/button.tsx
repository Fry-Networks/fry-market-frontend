import loader from "../../assets/icons/loading.svg";

const Button = ({
  text,
  img,
  icon,
  className,
  onClick,
  minHeight,
  maxHeight,
  minWidth,
  height,
  width,
  disabled,
  imgClass,
  loading = false,
  maxWidth,
  padding,
  isSelected
}: any) => {
  const buttonStyle = {
    minHeight: minHeight,
    maxHeight: maxHeight,
    minWidth: minWidth,
    maxWidth: maxWidth,
    height: height,
    width: width,
    padding: padding,
    img: img,
    icon: icon,
    imgClass: imgClass,
  };
  if (loading) {
    disabled = true;
  }
  // Applying the dynamic color 
  const textColorClass = isSelected ? 'text-white' : 'text-black';
  return (
    <button
      className={` ${className} ${textColorClass} `}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <>
          <span className={`flex justify-center items-center gap-2 ${textColorClass}`}>
            {text}
            <img src={loader} alt="" className="w-5 rotate-360 invert" />
          </span>
        </>
      ) : (
        <>
          {img && <img src={img} alt="Button Image" className={imgClass} />}
          {icon && icon}
          <span>{text}</span>
        </>
      )}
    </button>
  );
};
export default Button;