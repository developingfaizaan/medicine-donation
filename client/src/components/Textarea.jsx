const Textarea = ({ label, value, onChange }) => (
  <div className="my-7">
    <label htmlFor={label} className="block mb-2 text-white700 text-md">
      {label}
    </label>
    <textarea id={label} rows={4} className={`py-3 px-5 text-gray900 font-medium border-2 border-white200 rounded-[4px] outline-none focus:outline-primary ease-out duration-200 w-full`} value={value} onChange={onChange} required></textarea>
  </div>
);

export default Textarea;
