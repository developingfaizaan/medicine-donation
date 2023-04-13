import { germanIcon, englishIcon } from "../assets";
import { useTranslate } from "../context/translate";

const SwitchBtn = () => {
  const { germanLang, setGermanLang } = useTranslate();

  const handleChange = () => setGermanLang((prev) => !prev);

  return (
    <label htmlFor="toggleFour" className="flex cursor-pointer select-none items-center">
    <div className="relative">
        <input type="checkbox" onChange={handleChange} id="toggleFour" className="sr-only" />
        <div className="box bg-white200 block h-8 w-14 rounded-full flex items-center justify-around">
            <img src={englishIcon} alt="English" />
            <img src={germanIcon} alt="German" />
        </div>
        <div className={`dot absolute ${germanLang ? "translate-x-1" : "translate-x-7"} top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary transition-transform`}></div>
    </div>
    </label>
  );
};

export default SwitchBtn;
