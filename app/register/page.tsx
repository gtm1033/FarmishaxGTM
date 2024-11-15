'use client'
import Register from "@/components/Register"
import { useState, useEffect } from "react"
import EmblaCarousel from "@/components/EmblaCarousel"
const page = () => {

    const [slides, setSlides] = useState<{ image: string, alt: string }[] | null>(null)

    useEffect(() => {
        const loadSlides = async () => {
          await new Promise(resolve => setTimeout(resolve, 100)) 
          setSlides([
            { image: "/assets/Intro1.svg", alt: "Image 1" },
            { image: "/assets/Intro2.jpg", alt: "Image 2" },
            { image: "/assets/Intro3.jpg", alt: "Image 3" },
            { image: "/assets/Intro1.svg", alt: "Image 4" },
            { image: "/assets/Intro2.jpg", alt: "Image 5" },
            { image: "/assets/Intro3.jpg", alt: "Image 6" },
          ])
        }
        loadSlides()
      }, [])
    

  return (
    <>
     <div className="flex flex-col-reverse lg:flex-row justify-between items-center h-full lg:h-[550px]">
      <div className="w-full flex flex-col items-center lg:items-start justify-start gap-y-5 lg:gap-y-10">
        <div className="w-full flex flex-col text-xl sm:text-3xl lg:text-5xl text-center lg:text-start font-bold pt-5 lg:pt-0">
          <span className="text-green3 tracking-wide">Registeration</span>
        </div>
        <div className="w-full font-light lg:font-medium text-sm lg:text-lg text-gray text-center lg:text-start tracking-wider">
          FarmIsha brings you sustainable hydroponic<br />farming solutions for fresh, soil-free<br />produce year-round.
        </div>
        <div className="w-full flex-gtm-center">
            <Register />
        </div>
       
      </div>

      <div className="relative flex-gtm-center p-2 pt-10 lg:pt-2 overflow-hidden">
        {slides ? (
          <EmblaCarousel slides={slides} options={{ loop: true }} />
        ) : (
          <div className="w-[580px] h-[16rem] flex items-center justify-center">
            <span className="border-4 !border-l-green3 border-green1 duration-1000 ease rounded-full h-10 w-10 p-2 animate-spin"></span>
          </div>
        )}
      </div>
    </div>
  
    </>
  )
}

export default page