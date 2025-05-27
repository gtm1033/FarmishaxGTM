'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from "next/navigation"
import EmblaCarousel from "@/components/EmblaCarousel"
import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useUser } from '@/context/UserContext'
import { useTranslation } from 'react-i18next'

interface IUser {
    _id: string;
    fullName: string;
    phone: string;
    PIN: string;
    password: string;
    __v: number;
}

interface apiResponse {
    data: IUser;
    temperature: number;
}


const page = () => {
    const { t } = useTranslation('Dashboard');
    const { user, setUser } = useUser()
    const router = useRouter()
    const { id } = useParams()

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingCrops, setLoadingCrops] = useState<boolean>()
    const [favourableCrops, setFavourableCrops] = useState<any>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [cropData, setCropData] = useState<any>(null)
    
    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user,id, router]);

    const slides = [
        { image: "/assets/Intro1.svg", alt: "Image 1" },
        { image: "/assets/Intro2.jpg", alt: "Image 2" },
        { image: "/assets/Intro3.jpg", alt: "Image 3" },
        { image: "/assets/Intro1.svg", alt: "Image 4" },
        { image: "/assets/Intro2.jpg", alt: "Image 5" },
        { image: "/assets/Intro3.jpg", alt: "Image 6" }
    ]

  const fetchUser = async () => {
        if (!id) {
            setError('User ID is missing in the route.');
            return;
        }

        try {
            const response = await fetch(`/api/user/${id}`, { method: 'GET' });
            if (!response.ok) {
                throw new Error(`Failed to fetch user. Status: ${response.status}`);
            }
            const data = await response.json();
             console.log('Response form login api, data :', data);
            setUser(data?.data);
            console.log('Dahsbaaord context User data:', user);
            setLoading(false)
            setLoadingCrops(true)
            const kelvinTemp = Number(data?.temperature);
            const celsiusTemp = kelvinTemp - 273.15;
            
            console.log('Temperature in K:', kelvinTemp);
            console.log('Temperature in C:', celsiusTemp);
            
            const cropData = await fetch(`/api/crops`, { method: 'GET' })
            const crops = await cropData.json()
            console.log("Crops data :" , crops[0])
//            let inRange;
//const favourableCrops = crops?.filter((crop: any) => {
  //          const min = parseFloat(crop?.Temperature?.min);
    //        const max = parseFloat(crop?.Temperature?.max);
    

      //      const validRange = !isNaN(min) && !isNaN(max);
        //   inRange = validRange && celsiusTemp >= min && celsiusTemp <= max;


            //return inRange; }); 
            //console.log("IN range : ", inRange);
             const favourableCrops = crops?.filter((crop: any) => (celsiusTemp >= Number(crop?.Temperature.min) && celsiusTemp <= Number(crop.Temperature.max)))
            // console.log('Favourable Crops- ', favourableCrops)
            console.log('Favourable Crops- ', favourableCrops)
            setLoadingCrops(false)
            setFavourableCrops(favourableCrops)
        } catch (error) {
            console.error('An error occurred:', error);
            setError('Failed to fetch user data.');
        }
    };


    const handleOpen = (index: number) => {
        setOpen(true)
        setCropData(favourableCrops[index])
    }

    useEffect(() => {
        fetchUser();
    }, [id]);

    if (loading) {
        return (
            <div className='min-h-[92vh] p-2 grid grid-cols-1 md:grid-cols-3  gap-6 w-full animate-pulse ease duration-1000 '>
                <div className="bg-green1 opacity-40 rounded-md col-span-1 md:col-span-2 w-full h-full"></div>
                <div className="bg-green1 opacity-40 rounded-md  w-full h-full"></div>
                <div className="bg-green1 opacity-40 col-span-1 md:col-span-3 rounded-md  w-full h-full"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='min-h-screen flex-gtm-center text-sm font-semibold'>{error}</div>
        );
    }

   

    return (<>
        {loading
            ? <span className="min-h-screen text-green3 gap-2 w-full flex-gtm-center">
                <span className="border-4 !border-l-green3 border-green1 duration-1000 ease rounded-full h-7 w-7  animate-spin"></span>
                <span className="text-green3 text-sm font-semibold">Fetching User Data ...</span>
            </span>
            : <>
                {error ? <div className="h-screen flex-gtm-center text-sm text-red-500 text-center">{error}</div>
                    : <>
                        {/* <div>User {id} Page</div> */}
                        <div className=' w-full min-h-screen flex flex-col '>
                            <div className="w-full flex flex-col-reverse sm:flex-row p-1 sm:p-4">
                                <div className='flex flex-col w-full justify-evenly items-between  '>
                                    <div className="w-full flex flex-col sm:flex-row  text-xl sm:text-2xl lg:text-4xl text-center lg:text-start font-bold pt-5 lg:pt-0">
                                        <span className="text-head tracking-wide pb-1">{t('dashboard_welcome')} </span>
                                        <span className="text-green3 tracking-wide px-2">{user?.fullName}</span>
                                    </div>
                                    <div className="w-full font-light lg:font-medium text-sm lg:text-lg text-gray text-center lg:text-start tracking-wider">
                                        {t('dashboard_intro')}

                                    </div>
                                </div>
                                <div className="flex-gtm-center h-full">
                                    <div className="relative flex-gtm-center p-2 pt-10 lg:pt-6 overflow-hidden">
                                        {slides ? (
                                            <EmblaCarousel slides={slides} options={{ loop: true }} />
                                        ) : (
                                            // Display loader while slides are loading
                                            <div className="w-[580px] h-[16rem] flex items-center justify-center">
                                                <span className="border-4 !border-l-green3 border-green1 duration-1000 ease rounded-full h-10 w-10 p-2 animate-spin"></span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col  min-h-[80]">


                                {
                                    loadingCrops && <span className="text-green3 gap-2 w-full flex-gtm-center">
                                        <span className="border-4 !border-l-green3 border-green1 duration-1000 ease rounded-full h-7 w-7  animate-spin"></span>
                                        <span className="text-green3 text-xs sm:text-sm font-semibold">Fetching favourable crops in your area ...</span>
                                    </span>
                                }

                                {
                                    !loadingCrops && favourableCrops && <div className='pb-10 pt-2'>
                                        <h1 className="text-center py-3 text-green4 font-medium">Favourable Crops ({favourableCrops?.length})</h1>
                                        <div className="flex-gtm-center px-2 sm:px-auto">
                                            <Carousel className='!w-full py-2 sm:py-4 px-2 sm:px-auto'>
                                                <CarouselContent className=' !w-full gap-2 sm:gap-3 -m-2 sm:-m-0' >
                                                    {favourableCrops?.map((crop: any, index: any) => (
                                                        <CarouselItem className="basis-1/2 md:basis-1/4 " key={index}>
                                                            <div className="flex flex-col items-center justify-center h-auto sm:h-full w-full p-1.5 bg-green1 shadow-md hover:scale-[1.03] duration-300 rounded  overflow-hidden cursor-pointer "
                                                                onClick={() => handleOpen(index)}
                                                            >
                                                                <span
                                                                    className="h-32 sm:h-44 w-full rounded text-green3 text-sm font-medium flex flex-col justify-center items-center text-center cursor-pointer"
                                                                    style={{
                                                                        backgroundImage: `url(${crop.image})`,
                                                                        backgroundSize: 'cover', // Adjusts how the background image is scaled
                                                                        backgroundPosition: 'center', // Centers the image
                                                                        backgroundRepeat: 'no-repeat', // Prevents tiling of the image
                                                                    }}
                                                                >
                                                                </span>
                                                                <p className='py-0.5 text-green3 font-semibold text-xs sm:text-sm'>{crop.Plant}</p>
                                                            </div>
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>
                                                <CarouselPrevious className='!border !border-green-500 !w-10 !h-10  bg-green1 text-green3 font-semibold hover:!cursor-pointer' />
                                                <CarouselNext className='!border !border-green-500 !w-10 !h-10 bg-green1 text-green3 font-semibold hover:!cursor-pointer' />
                                            </Carousel>
                                        </div>
                                    </div>
                                }
                            </div>


                            {
                                open && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center z-50" onClick={() => setOpen(false)}>
                                    <div className="relative bg-gradient-to-br from-white to-green1 w-[90%] sm:w-3/4  min-h-[80%] sm:min-h-3/4 py-3 sm:py-4 px-2 sm:px-6 rounded-lg flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex justify-end items-center w-full">
                                            {/* <span className="text-head text-xs sm:text-sm font-semibold">Crop Details</span> */}
                                            <span className="text-gray hover:text-green3 duration-200 text-xs font-semibold cursor-pointer" onClick={() => setOpen(false)}>Go Back</span>
                                        </div>
                                        <div className="w-full text-center font-bold text-2xl text-green3 sm:pb-4">
                                            {cropData?.Plant}
                                        </div>
                                        <div className="w-full h-full flex flex-col  sm:flex-row justify-start sm:justify-between items-center gap-1.5 " >
                                            <div className=" w-full p-3 sm:p-6 !pl-3 !pt-3 ">
                                                <Image src={cropData?.image} alt={cropData?.Plant} width={500} height={600} className='!object-cover !w-full  p-1 ' />
                                            </div>
                                            <div className="flex w-full flex-col items-center justify-start p-2 sm:p-4 gap-y-1.5 sm:gap-y-3">
                                                <div className="flex w-full items-center justify-between text-head text-xs  sm:text-sm font-semibold">
                                                    <span className="">Time required to be matured</span>
                                                    <span className="font-light sm:font-semibold">{cropData?.DaysToMaturity.min} - {cropData?.DaysToMaturity.max} Days</span>
                                                </div>
                                                <div className="flex w-full items-center justify-between text-head text-xs  sm:text-sm font-semibold">
                                                    <span className="">pH Range</span>
                                                    <span className="font-light sm:font-semibold">{cropData?.pH.min} - {cropData?.pH.max}</span>
                                                </div>
                                                <div className="flex w-full items-center justify-between text-head text-xs sm:text-sm font-semibold">
                                                    <span className="">PPM</span>
                                                    <span className="font-light sm:font-semibold">{cropData?.PPM.min} - {cropData?.PPM.max} </span>
                                                </div>
                                                <div className="flex w-full items-center justify-between text-head text-xs sm:text-sm font-semibold">
                                                    <span className="">Temperature Range</span>
                                                    <span className="font-light sm:font-semibold">{cropData?.Temperature.min} - {cropData?.Temperature.max} °C</span>
                                                </div>
                                                <div className="flex w-full items-center justify-between text-head text-xs sm:text-sm font-semibold">
                                                    <span className="">Place on Tower</span>
                                                    <span className="font-light sm:font-semibold">{cropData?.PlaceOnTower} </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='w-full flex flex-col gap-1.5  pb-2 pt-2 sm:pt-auto  px-2 sm:px-6 !pl-3'>
                                            <span className="w-full text-head text-xs sm:text-sm font-semibold">Description</span>
                                            <span className="text-head text-xs md:text-sm font-light text-justify">
                                                {cropData?.description}                                            </span>

                                        </div>

                                    </div>
                                </div>

                            }
                        </div></>
                }
            </>
        }
    </>)
}

export default page


{/* 
"Discover Crops Suitable for Your Region with Farmisha"

At Farmisha, we make farming smarter and more efficient. Based on your region's climate and temperature conditions—determined using your PIN code—we provide a tailored list of crops most suitable for cultivation in your area.

Start farming confidently with recommendations designed to maximize your yield while promoting sustainable agriculture. Let Farmisha guide you in selecting the right crops to grow, ensuring success every season.

Take the guesswork out of farming—start your journey with Farmisha today! */}
