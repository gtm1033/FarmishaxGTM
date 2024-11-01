import { FaPlayCircle } from "react-icons/fa";
const Banner2 = () => {
    return (
        <div className="w-screen relative">
        <div className="w-full p-7 lg:p-10 bg-green1 flex flex-col lg:flex-row justify-center items-center gap-4  ">
            <div className="relative w-full py-4 lg:py-auto px-5 lg:px-10 flex-gtm-center text-3xl text-head font-semibold">
                <img src="/assets/Intro1.svg" alt="OurHomeGarden_Video" className="bg-cover"/>
                <span className="absolute w-full flex-gtm-center">
                    <a href="https://www.youtube.com/watch?v=W0DM5lcj6mw" target="_blank" rel="noreferrer">
                    <FaPlayCircle className="cursor-pointer text-white h-9 w-9 lg:h-12 lg:w-12 drop-shadow-lg hover:scale-[1.03]"/>
                    </a>
                </span>
            </div>
            <div className="w-full px-6 lg:px-10 flex flex-col items-center lg:items-start text-lg text-gray ">
                <span className="pb-1 font-medium text-xl lg:text-3xl text-center lg:text-start text-head tracking-wide">See Our Home Garden</span>
                <span className="pb-2 font-extralight text-xl lg:text-3xl text-center lg:text-start text-head">Equipments in Action!</span>
                <span className="font-light  pr-0 lg:pr-20 text-gray pb-8 text-sm lg:text-base text-center lg:text-start ">Check out the video of the beautiful gardens we’ve  designed for our clients, highlighting the effectiveness of our hydroponic solutions.</span>
                <div>

                <span className="px-8 py-2 rounded-3xl text-sm lg:text-base cursor-pointer bg-green3 hover:bg-green4 text-white font-semibold  ">See More</span>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Banner2