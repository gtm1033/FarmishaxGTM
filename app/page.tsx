import Banner1 from '@/components/Banner1'
import Banner2 from '@/components/Banner2'
import FAQ from '@/components/FAQ'
import Features from '@/components/Features'
//  import Intro from '@/components/Intro'
import dynamic from 'next/dynamic';

// const Banner1 = dynamic(() => import('@/components/Banner1'), {
//   loading: () => <div> Loading bro </div>,  
// });
// const Banner2 = dynamic(() => import('@/components/Banner2'), {
//   loading: () => <div> Loading bro </div>,  
// });
const Intro = dynamic(() => import('@/components/Intro'), {
  loading: () => <div className="w-[480px]  h-[16rem] flex items-center justify-center ">
    <span className="border-4 !border-l-green3 border-green2 duration-1000 ease rounded-full h-10 w-10 p-2 animate-spin"></span>
  </div>,
});

export default function page() {
  return (
    <div className=" flex flex-col justify-center items-center">
      <Intro />
      <Banner1 />
      <Features />
      <Banner2 />
      <FAQ />
    </div>
  )
}

