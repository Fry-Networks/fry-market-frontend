
const Checkbox = ({ id, name, label, disabled = false, checked, onChange }: any) => {
  return (
    <div className="checkbox-wrapper flex">
      <input
        id={id}
        name={name}
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <label className="cbx font-medium text-base" htmlFor={id}></label>
      <label className="lbl text-sm" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
