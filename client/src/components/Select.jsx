const Select = ({ items, label, value, onChange }) => {

  return (
    <div className="my-6">
      <label htmlFor={label} className={`block mb-2 text-white700 text-md`}>{label}</label>
      <select id={label} onChange={onChange} value={value} className="py-3 px-4 font-poppins font-medium text-gray900 bg-white border-2 border-white200 rounded-[4px] outline-none focus:outline-primary ease-out duration-200 w-full placeholder:normal placeholder:text-white400">
        {items.map((item, i) => <option value={item.toLowerCase()} key={i}>{item}</option>)}
      </select>
    </div>
  );
};

export default Select;