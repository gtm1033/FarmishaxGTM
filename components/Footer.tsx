import Link from 'next/link'
import {   FaInstagram , FaYoutube, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
    return (
        <div className='w-screen relative -mx-2 sm:-mx-12 lg:-mx-20'>
        <div className="w-full px-6 sm:px-10 lg:px-20 pt-10 pb-3 lg:pb-6 bg-green1 flex flex-col items-center justify-center gap-2  ">
            <div className="w-full flex justify-center md:justify-start mb-1.5 md:mb-3">
                <img src="/assets/Logo.svg" alt="FarmIsha_Logo" className='w-[130px] h-[40px] lg:w-[190px] lg:h-[55px]' />
            </div>
            <div className="w-full flex flex-col md:flex-row items-start justify-between">
                <div className=" w-full flex text-head pt-1 md:pt-4 text-sm lg:text-base text-center md:text-start pr-0 lg:pr-40" >
                    Farmisha empowers you to grow fresh, sustainable produce at home effortlessly.
                </div>
                <div className=" w-full flex flex-col md:flex-row justify-center space-x-0 md:space-x-20  space-y-4 md:space-y-0 items-start">
                    <div className="flex md:hidden flex-col space-y-1 md:space-y-4 pt-5 md:pt-0">
                        <span className="text-lg md:text-xl text-head font-semibold ">Company</span>
                       <Link href={"/"}> <span className='font-light text-sm md:text-base text-gray'>About Us</span></Link>
                       <Link href={"/"}> <span className='font-light text-sm md:text-base text-gray'>Products</span></Link>
                       <Link href={"/"}> <span className='font-light text-sm md:text-base text-gray'>AI Solutions</span></Link>
                       <Link href={"/"}> <span className='font-light text-sm md:text-base text-gray'>Contact</span></Link>
                    </div>
                    <div className="flex flex-col space-y-1 md:space-y-4 ">
                        <span className="text-lg md:text-xl text-head font-semibold ">Resources</span>
                       <Link href={"/"}> <span className='font-light text-sm md:text-base text-gray'>Blog</span></Link>
                       <Link href={"/"}> <span className='font-light text-sm md:text-base text-gray'>Newsletter</span></Link>
                    </div>
                    <div className="flex flex-col space-y-1 md:space-y-4">
                        <span className="text-lg md:text-xl text-head font-semibold">Legal</span>
                        <Link href={"/"}><span className='font-light text-sm md:text-base text-gray'>Terms</span></Link>
                        <Link href={"/"}><span className='font-light text-sm md:text-base text-gray'>Privacy</span></Link>
                        <Link href={"/"}><span className='font-light text-sm md:text-base text-gray'>Refund</span></Link>
                    </div>
                </div>
            </div>
            <div className="w-full flex  py-5 md:py-6 gap-6 justify-center md:justify-start items-center">
                <Link href={"/" }><FaFacebookF className='text-[#231F20] font-bold duration-150 hover:scale-[1.08] !w-5 !h-5 md:!w-6 md:!h-6'/></Link>
                <Link href={"/" }><FaXTwitter className='text-[#231F20] font-bold duration-150 hover:scale-[1.08] !w-5 !h-5 md:!w-6 md:!h-6'/></Link>
                <Link href={"/" }><FaLinkedinIn className='text-[#231F20] font-bold duration-150 hover:scale-[1.08] !w-6 !h-6 md:!w-7 md:!h-7'/></Link>
                <Link href={"/" }><FaInstagram className='text-[#231F20] font-bold duration-150 hover:scale-[1.08] !w-6 !h-6 md:!w-7 md:!h-7'/></Link>
                <Link href={"/" }><FaYoutube className='text-[#231F20] font-bold duration-150 hover:scale-[1.08] !w-6 !h-6 md:!w-7 md:!h-7'/></Link>
                

            </div>
            <div className="w-full text-sm md:text-base flex-gtm-center text-gray ">
            <p className='mx-1'>&copy;</p> {new Date().getFullYear()} Team NewGenCo
            </div>
        </div>
        </div>
    )
}

export default Footer