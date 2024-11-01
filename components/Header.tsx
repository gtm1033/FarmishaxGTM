import Link from "next/link"
import { PiTreeFill } from "react-icons/pi";
import { MdQuestionAnswer } from "react-icons/md";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"


export default function Header() {

    const products = [
        {
            name: "Product 1",
            link: "/product_1",
            icon: <PiTreeFill />
        },
        {
            name: "Product 2",
            link: "/product_2",
            icon: <PiTreeFill />

        },
        {
            name: "Product 3",
            link: "/product_3",
            icon: <PiTreeFill />
        }
    ]
    const solutions = [
        {
            name: "Solution 1",
            link: "/solution_1",
            icon: <MdQuestionAnswer />
        },
        {
            name: "Solution 2",
            link: "/solution_2",
            icon: <MdQuestionAnswer />

        },
        {
            name: "Solution 3",
            link: "/solution_3",
            icon: <MdQuestionAnswer />
        }
    ]
    return (
        <>
            <div className="w-full bg-white  flex justify-between items-center py-1 ">
                <div className="w-full lg:w-auto flex-gtm-center relative  ">
                    <Link href="/" className="hover:scale-[1.03] duration-200 flex-gtm-center">
                        <img src="/assets/Logo.svg" alt="FarmIsha_Logo" className="w-[130px] h-[40px] lg:w-[190px] lg:h-[55px] cursor-pointer " />
                    </Link>

                    <Sheet modal={false} >
                        <SheetTrigger >
                            <span className="absolute h-full left-0 top-0 flex-gtm-center lg:!hidden cursor-pointer ">
                                <img src="/assets/sheet-trigger.svg" alt="sheet_trigger" className="hover:scale-y-[1.2] duration-700" />
                            </span>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle> <Link href="/" className="hover:scale-[1.03] duration-200">
                                    <img src="/assets/Logo.svg" alt="FarmIsha_Logo" className="w-[130px] h-[40px] cursor-pointer " />
                                </Link></SheetTitle>
                                {/* <SheetDescription className="!font-semibold  !py-10 text-2xl">
                                    Menu
                                </SheetDescription> */}
                            </SheetHeader>


                            {/* -----SHEET CONTENT MENU ITEMS---- */}
                            <div className="flex flex-col lg:hidden h-full w-full  space-y-8  pt-10 relative ">
                                <Link href="/about">
                                    <span className="text-black hover:text-[#06B612] hover:drop-shadow-sm font-medium text-sm duration-300">About Us</span>
                                </Link>


                                <DropdownMenu modal={false} >
                                    <DropdownMenuTrigger className="outline-none">
                                        <span className="flex items-center gap-1 text-sm outline-none text-black font-medium hover:text-green3" >
                                            Products <img src="/assets/arrow-down.svg" alt="drop_down" className="w-[18px] h-[18px]" />
                                        </span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent >
                                        {
                                            products?.map((product, index) => (
                                                <DropdownMenuItem key={index} className=" hover:bg-[#06B612] hover:text-white ">
                                                    <Link href={product?.link} className="w-full hover:drop-shadow-sm font-medium text-sm  flex gap-x-2 items-center">{product.icon}{product?.name}</Link>
                                                </DropdownMenuItem>
                                            ))
                                        }

                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <DropdownMenu modal={false} >
                                    <DropdownMenuTrigger className="outline-none">
                                        <span className="flex items-center gap-1 text-sm outline-none text-black font-medium hover:text-green3">
                                            AI Solutions <img src="/assets/arrow-down.svg" alt="drop_down" className="w-[18px] h-[18px]" />
                                        </span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent >
                                        {
                                            solutions?.map((product, index) => (
                                                <DropdownMenuItem key={index} className=" hover:bg-[#06B612] hover:text-white ">
                                                    <Link href={product?.link} className="w-full hover:drop-shadow-sm font-medium text-sm  flex gap-x-2 items-center">{product.icon}{product?.name}</Link>
                                                </DropdownMenuItem>
                                            ))
                                        }

                                    </DropdownMenuContent>
                                </DropdownMenu>


                                <Link href="/crops">
                                    <span className="text-black hover:text-[#06B612] hover:drop-shadow-sm font-medium text-sm duration-300">Hydroponics Crops</span>
                                </Link>
                                <Link href="/blogs">
                                    <span className="text-black hover:text-[#06B612] hover:drop-shadow-sm font-medium text-sm duration-300">Blogs</span>
                                </Link>

                                {/* ------ GETTING STARTED ----- */}
                                <div className="absolute bottom-6 w-full p-2 flex-gtm-center ">
                                    <Link href="/login" className="">
                                        <span className="bg-green3 hover:bg-green4 px-8 py-2 rounded-3xl text-white font-semibold text-sm duration-300">Get Started</span>
                                    </Link>
                                </div>

                            </div>


                        </SheetContent>
                    </Sheet>




                </div>
                <div className="hidden lg:flex w-full justify-end items-center space-x-8">
                    <Link href="/about">
                        <span className="text-black hover:text-[#06B612] hover:drop-shadow-sm font-medium text-sm duration-300">About Us</span>
                    </Link>


                    <DropdownMenu modal={false} >
                        <DropdownMenuTrigger className="outline-none">
                            <span className="flex items-center gap-1 text-sm outline-none text-black font-medium hover:text-green3" >
                                Products <img src="/assets/arrow-down.svg" alt="drop_down" className="w-[18px] h-[18px]" />
                            </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent >
                            {
                                products?.map((product, index) => (
                                    <DropdownMenuItem key={index} className=" hover:bg-[#06B612] hover:text-white ">
                                        <Link href={product?.link} className="w-full hover:drop-shadow-sm font-medium text-sm  flex gap-x-2 items-center">{product.icon}{product?.name}</Link>
                                    </DropdownMenuItem>
                                ))
                            }

                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu modal={false} >
                        <DropdownMenuTrigger className="outline-none">
                            <span className="flex items-center gap-1 text-sm outline-none text-black font-medium hover:text-green3">
                                AI Solutions <img src="/assets/arrow-down.svg" alt="drop_down" className="w-[18px] h-[18px]" />
                            </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent >
                            {
                                solutions?.map((product, index) => (
                                    <DropdownMenuItem key={index} className=" hover:bg-[#06B612] hover:text-white ">
                                        <Link href={product?.link} className="w-full hover:drop-shadow-sm font-medium text-sm  flex gap-x-2 items-center">{product.icon}{product?.name}</Link>
                                    </DropdownMenuItem>
                                ))
                            }

                        </DropdownMenuContent>
                    </DropdownMenu>



                    <Link href="/crops">
                        <span className="text-black hover:text-[#06B612] hover:drop-shadow-sm font-medium text-sm duration-300">Hydroponics Crops</span>
                    </Link>
                    <Link href="/blogs">
                        <span className="text-black hover:text-[#06B612] hover:drop-shadow-sm font-medium text-sm duration-300">Blogs</span>
                    </Link>
                    <Link href="/login">
                        <span className="bg-green3 hover:bg-green4 px-4 py-2 rounded-3xl text-white font-semibold text-sm duration-300">Get Started</span>
                    </Link>

                </div>


            </div>
        </>
    )
}