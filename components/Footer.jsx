import Image from "next/image";
import logoLight from "../public/lightlogo.png";
import {
  BsFacebook,
  BsTwitter,
  BsYoutube,
  BsLinkedin,

} from "react-icons/bs";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="w-full py-10 bg-primaryColor text-white/80 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 justify-center items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image src={logoLight} width={200} height={200} alt="logo" />
          <p className="flex lg:items-center  text-sm  gap-1">
            <AiOutlineCopyrightCircle className="mt-[1px]" />
            Designed and developed by yousuf
          </p>
        </div>

        <div className="flex gap-6">
          <BsYoutube className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          <a href="https://www.facebook.com/yeasin.mohammad.948" target="_blank"><BsFacebook className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          </a>
          <BsLinkedin className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          <BsTwitter className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
