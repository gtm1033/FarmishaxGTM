export default function Loading() {
    // Or a custom loading skeleton component
    return  <div className='min-h-[92vh] p-2 grid grid-cols-1 md:grid-cols-3  gap-3 w-full animate-pulse ease duration-1000 '>
    <div className="bg-green1 opacity-50 rounded-md col-span-1 md:col-span-2 w-full h-full"></div>
    <div className="bg-green1 opacity-50 rounded-md  w-full h-full"></div>
    <div className="bg-green1 opacity-50 col-span-1 md:col-span-3 rounded-md  w-full h-full"></div>
</div>
  }