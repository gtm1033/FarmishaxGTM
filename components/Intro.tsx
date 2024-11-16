'use client'
import Link from "next/link"
import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import EmblaCarousel from "./EmblaCarousel"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface IUser {
  fullName: string;
  phone: string;
  password: string;
  PIN: string;
}
function Intro() {
  const path = usePathname()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [pwd, setPwd] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState<boolean>()
  const [loadingCrops, setLoadingCrops] = useState<boolean>()
  const [user, setUser] = useState<IUser>()
  const [favourableCrops, setFavourableCrops] = useState<any>()
  const [slides, setSlides] = useState<{ image: string, alt: string }[] | null>(null)

  //typscript interfacce for user


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Sending login data:', phoneNumber , pwd, msg );
    setLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber, password: pwd }),
        mode: 'no-cors'
      });
      const data = await response.json();

      if (response.ok) {
        setMsg('Login successful!');
        setUser(data?.data)
        console.log('User data - ', user)
        setLoading(false)

        console.log('\nData from login api - ', data)


        //-----------CROP/ FAVOURALE CROP DATA IDHAR-------------------------
        setLoadingCrops(true)
        const cropData = await fetch(`/api/crops`, { method: 'GET' })
        const crops = await cropData.json()
        const favourableCrops = crops.filter((crop: any) => ((Number(data.temperature) - 273.15) >= Number(crop.Temperature.min) && (Number(data.temperature) - 273.15) <= Number(crop.Temperature.max)))
        console.log('Favourable Crops- ', favourableCrops)
        setLoadingCrops(false)
        setFavourableCrops(favourableCrops)

      } else {
        setMsg(data.message || 'Login failed');
      }
      console.log(msg)
    } catch (error) {
      setMsg('An error occurred');
    }
    setMsg('')
  };

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
    <div className={`flex flex-col-reverse lg:flex-row justify-between items-center ${favourableCrops && '!h-full'} h-[90vh] py-10`}>
      <div className="w-full flex flex-col items-center lg:items-start justify-start gap-y-5 lg:gap-y-10">
        <div className="w-full flex flex-col text-xl sm:text-3xl lg:text-5xl text-center lg:text-start font-bold pt-5 lg:pt-0">
          <span className="text-head tracking-wide pb-1">Future Ready Farming For</span>
          <span className="text-green3 tracking-wide">Fresh Harvests</span>
        </div>
        <div className="w-full font-light lg:font-medium text-sm lg:text-lg text-gray text-center lg:text-start tracking-wider">
          FarmIsha brings you sustainable hydroponic<br />farming solutions for fresh, soil-free<br />produce year-round.
        </div>
        {path === "/login" ? (
          <div className="w-full flex flex-col items-center justify-center gap-4">
            {!user  && !loading ?
              <form onSubmit={handleLogin} className="space-x-0 lg:space-x-4 space-y-3 lg:space-y-0 flex flex-col lg:flex-row items-center justify-center">
                <PhoneInput
                  country={'in'}
                  value={phoneNumber}
                  onChange={(value) => setPhoneNumber(value)}
                  containerClass="group !rounded-xl !h-full !w-full"
                  inputClass="border !border-green3 !py-1 !border-l-0 duration-200 !rounded-xl"
                  buttonClass="border !border-green3 !border-r-0 duration-200 !bg-white !rounded-l-xl hover:!bg-none"
                  placeholder="+XX XXXXXXXXXX"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  className="h-full w-full border !border-green3 !rounded-xl px-4 py-1 duration-200 outline-none"
                />
                <button type='submit' className='font-semibold tracking-wide rounded-3xl px-6 py-2 bg-green3 hover:bg-green4 duration-200 text-white'>Login</button>
                {/* <Link href={"/"} className="font-semibold tracking-wide rounded-3xl px-6 py-2 bg-green3 hover:bg-green4 duration-200 text-white">
                Login
              </Link> */}
              </form>
              :
              <div className={`w-full ${favourableCrops?.length >= 16 ? "h-full" : "h-[50vh]"}  rounded-lg p-1`}>
                { loading ? <span className="text-green3 gap-2 w-full h-full flex flex-col items-center justify-center ">
                  <span className="border-4 !border-l-green3 border-green1 duration-1000 ease rounded-full h-10 w-10  animate-spin"></span>
                  <span className="text-green3 text-sm font-semibold">Logging you in ...</span>
                </span>
                  : <>
                <span className="text-green3 gap-2 w-full flex-gtm-center">
                  <p className="text-head text-3xl font-semibold ">Welcome, <span className="capitalize text-green3">{user?.fullName}</span></p>
                </span>

                { 
                  loadingCrops && <span className="text-green3 gap-2 w-full flex-gtm-center">
                    <span className="border-4 !border-l-green3 border-green1 duration-1000 ease rounded-full h-7 w-7  animate-spin"></span>
                    <span className="text-green3 text-sm font-semibold">Fetching favourable crops in your area ...</span>
                  </span>
                }

                {
                  !loadingCrops && favourableCrops && <div className='pb-10 '>
                    <h1 className="text-center py-2 text-green4 font-medium">Favourable Crops ({favourableCrops?.length})</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 place-content-center ">
                      {favourableCrops?.map((crop: any, index: any) => (
                        <span key={index} className="p-3 hover:scale-[1.03] rounded bg-green1 text-green3 text-sm font-medium flex-gtm-center text-center !cursor-default">{crop.Plant}</span>
                      ))}
                    </div>
                  </div>
                }
                </>
              }
              </div>
            }
          </div>






        ) : (
          <Link href={"/login"} className="mt-2 lg:mt-5 font-semibold tracking-wide rounded-3xl px-6 py-2 bg-green3 hover:bg-green4 duration-200 text-white text-sm lg:text-base">
            Start Eating Fresh
          </Link>
        )}
      </div>

      <div className="relative flex-gtm-center p-2 pt-10 lg:pt-2 overflow-hidden">
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
  )
}

export default Intro
