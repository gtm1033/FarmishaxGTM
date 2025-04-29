'use client'
import Link from "next/link"
// import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useUser } from "@/context/UserContext"
import { IoEye } from "react-icons/io5";
import { usePathname } from 'next/navigation'
import EmblaCarousel from "./EmblaCarousel"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useTranslation } from 'react-i18next';



// interface IUser {
//   fullName: string;
//   phone: string;
//   password: string;
//   PIN: string;
// }
function Intro() {

  const { t } = useTranslation('Home');
  const { user, setUser } = useUser()
  const path = usePathname()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [pwd, setPwd] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState<boolean>()
  const [userId, setUserId] = useState<string>('')
  // const [loadingCrops, setLoadingCrops] = useState<boolean>()
  // const [user, setUser] = useState<IUser>()
  // const [favourableCrops, setFavourableCrops] = useState<any>()
  const [slides, setSlides] = useState<{ image: string, alt: string }[] | null>(null)
  const router = useRouter()



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber, password: pwd }),
      });

      const data = await response.json();
      if (!response.ok) {
        setMsg(data.message || 'Login failed. Please try again.');
        setLoading(false);
        return;
      }

      setUserId(data?.data?.id)
      if (!data?.data?.id) {
        throw new Error('User ID is undefined');
      }

      console.log('Login successful!');
      // console.log('User ID:', userId, typeof userId);
      // console.log('Dashboard path:', `/dashboard/${userId}`);
      const dashboardURL = `/dashboard/${userId}`;
      //  console.log('Dashboard URL:', dashboardURL);
      setUser(data?.data);
      router.push(dashboardURL);


      setLoading(false);
    } catch (error) {
      console.error('Login error:', error);
      setMsg(`An error occurred. ${error}`);
      setLoading(false);
    }
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

  useEffect(() => {
    if (user) {
      router.push(`/dashboard/${userId}`);
    }
  }, [user, router]);


  return (
    <div className={`flex flex-col-reverse lg:flex-row justify-between items-center min-h-[90vh] py-10`}>
      <div className="w-full flex flex-col items-center lg:items-start justify-start gap-y-5 lg:gap-y-10">
        <div className="w-full flex flex-col text-xl sm:text-3xl lg:text-5xl text-center lg:text-start font-bold pt-5 lg:pt-0">
          <span className="text-head tracking-wide pb-1">{t('intro_line1')}</span>
          <span className="text-green3 tracking-wide">{t('intro_line2')}</span>
        </div>
        <div className="w-full font-light lg:font-medium text-sm lg:text-lg text-gray text-center lg:text-start tracking-wider">
          {t('intro_desc')}
          {/* FarmIsha brings you sustainable hydroponic<br />farming solutions for fresh, soil-free<br />produce year-round. */}
        </div>
        {path === "/hi/login" || path === '/mr/login' || path === '/pa/login' || path === '/bho/login' || path === '/login' ? (
          <div className="w-full flex flex-col items-center justify-center gap-4">
            {!user && !loading ?
              <form onSubmit={handleLogin} className="w-full space-x-0 lg:space-x-4 space-y-3 lg:space-y-0 flex flex-col  items-center justify-center gap-4">
                <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4">
                  <PhoneInput
                    country={'in'}
                    value={phoneNumber}
                    onChange={(value) => setPhoneNumber(value)}
                    containerClass="group !rounded-xl !h-full !w-full"
                    inputClass="border !w-full !border-green3 !py-1 !border-l-0 duration-200 !rounded-xl"
                    buttonClass="border !border-green3 !border-r-0 duration-200 !bg-white !rounded-l-xl hover:!bg-none"
                    placeholder="+XX XXXXXXXXXX"
                    
                  />
                  <span className="w-full relative overflow-hidden">
                    <input
                      type={showPwd ? "text" : "password"}
                      placeholder="Password"
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                      className="h-full w-full border !border-green3 !rounded-xl px-4 py-1 duration-200 outline-none overflow-hidden pr-10"
                    />
                    <span className="absolute top-1/2 right-0 transform -translate-y-1/2 h-full w-8 flex-gtm-center   cursor-pointer" onClick={() => { setShowPwd(!showPwd) }}>
                      <IoEye className={`${showPwd ? 'text-green3' : 'text-green2'} duration-300`} />
                    </span>
                  </span>
                </div>


                <button type='submit' className='font-semibold tracking-wide rounded-3xl px-6 py-2 bg-green3 hover:bg-green4 duration-200 text-white'>{t('login')}</button>

              </form>
              :
              <div className={`w-full h-20   rounded-lg p-1`}>
                {loading ? <span className="text-green3 gap-2 w-full h-full flex flex-col items-center justify-center ">
                  <span className="border-4 !border-l-green3 border-green1 duration-1000 ease rounded-full h-10 w-10  animate-spin"></span>
                  <span className="text-green3 text-sm font-semibold">{t('logging')} ...</span>
                </span>
                  : <>
                    <span className="gap-2 w-full flex-gtm-center">
                      <p className="text-head text-3xl font-semibold ">{msg}</p>
                    </span>

                  </>
                }
              </div>
            }
          </div>
        ) : (
          <Link href={"/login"} className="mt-2 lg:mt-5 font-semibold tracking-wide rounded-3xl px-6 py-2 bg-green3 hover:bg-green4 duration-200 text-white text-sm lg:text-base">
            {t('start_eating_fresh')}
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
