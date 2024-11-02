'use client'
import React, { useState, useEffect } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

const Features = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
    const features = [
        {
            head: "Farmisha App",
            icon: "/assets/Feature1.svg",
            desc: "Manage your entire garden with ease. Our app lets you monitor and control your home farming system, ensuring a seamless growing experience from seed to harvest"
        },
        {
            head: "Smart Equipment",
            icon: "/assets/Feature2.svg",
            desc: "We offer advanced smart equipment for hydroponics and live gardening solutions, making home farming more efficient, sustainable, and hassle-free"
        },
        {
            head: "AI Solutions",
            icon: "/assets/Feature3.svg",
            desc: "Our innovative AI technology automates your garden when you’re away and detects diseases early, ensuring your plants thrive effortlessly"
        },
        {
            head: "Farmisha App",
            icon: "/assets/Feature1.svg",
            desc: "Manage your entire garden with ease. Our app lets you monitor and control your home farming system, ensuring a seamless growing experience from seed to harvest"
        },
        {
            head: "Smart Equipment",
            icon: "/assets/Feature2.svg",
            desc: "We offer advanced smart equipment for hydroponics and live gardening solutions, making home farming more efficient, sustainable, and hassle-free"
        },
        {
            head: "AI Solutions",
            icon: "/assets/Feature3.svg",
            desc: "Our innovative AI technology automates your garden when you’re away and detects diseases early, ensuring your plants thrive effortlessly"
        },
      ]

    useEffect(() => {
        if (!carouselApi) return;

        const onSelect = () => setActiveIndex(carouselApi.selectedScrollSnap());
        carouselApi.on("select", onSelect);

        return () => {
            carouselApi.off("select", onSelect);
        };
    }, [carouselApi]);

    return (
        <div className="py-10 mt-10 flex flex-col items-center justify-center">
            <div className="w-full text-center text-wrap text-xl lg:text-3xl text-head font-semibold">
                <span className="text-green3 pb-2">Farmisha’s</span> Tech Solution Lets You Farm At Home, Giving
                <br />
                You Fresh, Homegrown Produce At Your Fingertips
            </div>
            <div className="p-6 text-gray">Here's what you get with Farmisha</div>
            <div className="py-4 md:py-10  px-0 lg:px-32 w-full flex-gtm-center  ">
                <Carousel setApi={setCarouselApi} className=" !w-[260px] md:!w-auto py-4 ">
                    <CarouselContent className="mx-2 md:mx-4 space-x-4">
                        {features.map((feature, index) => (
                            <CarouselItem
                                key={index}
                                className={`border ${
                                    activeIndex === index ? "border-green3 !shadow-3xl !shadow-green1" : "border-green2"
                                } hover:border-green3 duration-200 rounded-xl !pl-0  !w-[120px] md:!w-[140px] !py-2 basis:1/2 lg:basis-1/3 hover:shadow-2xl hover:shadow-green1 `}
                            >
                                <div className="flex flex-col items-center justify-start px-1.5 md:px-4">
                                    <div className="text-lg pt-2 md:pt-4 font-semibold text-head">{feature?.head}</div>
                                    <Image src={feature?.icon} alt="icon" height={160} width={160} className="!p-0 w-32 h-28 md:w-40 md:h-40" />
                                    <div className="text-gray text-sm text-center">{feature?.desc}</div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <div className="flex justify-center space-x-2 mt-4">
                        {features.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => carouselApi?.scrollTo(index)}
                                className={`w-2 h-2 duration-200 ${
                                    activeIndex === index ? "bg-green3 px-2 rounded-md" : "bg-green2 rounded-full"
                                }`}
                            />
                        ))}
                    </div>

                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
};

export default Features;
