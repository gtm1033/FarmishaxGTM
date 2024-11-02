import Image from "next/image";
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import { useState } from "react";

type Slide = {
  image: string;
  alt: string;
};

type PropType = {
  slides: Slide[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade(), Autoplay({ playOnInit: true, delay: 3000 })]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  // const [loading, setLoading] = useState(true);

  return (
    <div className="embla rounded-md">
     
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
        {/* {loading && (
        <div className="loader !h-[200px] lg:!h-[16rem]  !w-[450px] flex justify-center items-center bg-black">
          <div className="w-6 h-6 border-4 border-t-green-500 border-gray-200 rounded-full animate-spin"></div>
        </div>
      )} */}
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <Image
                className="embla__slide__img !h-[200px] lg:!h-[16rem]"
                src={slide?.image}
                alt={slide?.alt}
                width={400}
                height={300}
                // loading={"eager"}
                // onLoad={() => setLoading(false)}
                 priority={index === 0} 
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls flex-gtm-center !mt-5 lg:!mt-[1.8rem]">
        <div className="embla__dots w-full flex-gtm-center gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected !duration-300 ease' : ''
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
