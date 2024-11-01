'use client'
import Link from "next/link"
import {useState} from "react"
// import EmblaCarousel from "./EmblaCarousel"
import { usePathname } from 'next/navigation'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


import dynamic from 'next/dynamic';

const EmblaCarousel =  dynamic(
  () =>
    new Promise<typeof import("./EmblaCarousel")>((resolve) => {
      setTimeout(() => resolve(import("./EmblaCarousel")), 5000); // 2-second delay
    }),
  {
    loading: () => (
      <div className="w-[480px]  h-[16rem] flex items-center justify-center ">
        <span className="border-4 !border-l-green3 border-green2 duration-1000 ease rounded-full h-10 w-10 p-2 animate-spin"></span>
      </div>
    ),
  }
);


function Intro() {
  const path = usePathname()
  // console.log("path - ", path)
  const slides = [
    {
      image: "/assets/Intro1.svg",
      alt: "Image 1",
    },
    {
      image: "/assets/Intro2.jpg",
      alt: "Image 2",
    },
    {
      image: "/assets/Intro3.jpg",
      alt: "Image 3",
    },
    {
      image: "/assets/Intro1.svg",
      alt: "Image 4",
    },
    {
      image: "/assets/Intro2.jpg",
      alt: "Image 5",
    },
    {
      image: "/assets/Intro3.jpg",
      alt: "Image 6",
    }
  ]
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <div className=" flex flex-col-reverse lg:flex-row justify-between items-center h-full lg:h-[550px] ">
        <div className="w-full  flex flex-col items-center lg:items-start justify-start gap-y-5 lg:gap-y-10">
            <div className="w-full flex flex-col text-xl sm:text-3xl lg:text-5xl text-center lg:text-start font-bold pt-5 lg:pt-0">
                <span className="text-head tracking-wide pb-1">
                Future Ready Farming For
                </span>
                <span className="text-green3 tracking-wide">
                    Fresh Harvests
                </span>

            </div>
            <div className="w-full font-light lg:font-medium text-sm lg:text-lg text-gray text-center lg:text-start tracking-wider">
                FarmIsha brings you sustainable hydroponic  <br/> farming solutions for fresh,  soil-free <br/>  produce year-round.
            </div>
            { path === "/login" ?
            <>
            <div className="flex-gtm-center gap-4">
              <form action="" className="space-x-0 lg:space-x-4 space-y-3 lg:space-y-0 flex flex-col lg:flex-row items-center justify-center  ">
                 <PhoneInput
                    country={'in'}
                    value={phoneNumber}
                    onChange={(value) => {
                      setPhoneNumber(value);
                    }}
                    containerClass=" group !rounded-xl "
                    inputClass=" border  group-hover:!border-green3 !border-l-0 duration-200 !rounded-xl "
                    buttonClass="border  group-hover:!border-green3 !border-r-0 duration-200 !bg-white !rounded-l-xl hover:!bg-none"
                    
                    placeholder="+XX XXXXXXXXXX"
                  />
                {/* <input type="text" placeholder="+XX XXXXXXXXXX" className="border-[1px] rounded-lg outline-none focus:border-green3 py-1.5 px-4 " /> */}
                <Link href={"/"} className="  font-semibold tracking-wide   rounded-3xl px-6 py-2 bg-green3 hover:bg-green4 duration-200 text-white">
                Login
                </Link>    
               </form>
            </div>       
            </>
            :
            <Link href={"/login"} className="mt-2 lg:mt-5  font-semibold tracking-wide   rounded-3xl px-6 py-2 bg-green3 hover:bg-green4 duration-200 text-white text-sm lg:text-base">
                Start Eating Fresh
            </Link>
}
         
        </div>
        <div className=" relative flex-gtm-center p-2  pt-10 lg:pt-2">
               < EmblaCarousel slides={slides} options={{ loop: true }} />
        </div>
        
    </div >
  )
}

export default Intro