import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
// import AutoScroll from 'embla-carousel-auto-scroll'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Fade from 'embla-carousel-fade'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
type Slide = {
  image: string;
  alt: string;
};

type PropType = {
  slides: Slide[];
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade(), Autoplay({ playOnInit: true, delay: 3000 })])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

 
  return (
    <div className="embla  rounded-md ">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container ">
          {slides.map((slide,index) => (
            <div className="embla__slide" key={index}>
              <img
                className="embla__slide__img !h-[200px] lg:!h-[16rem]"
                src={slide?.image}
                alt={slide?.alt}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls flex-gtm-center !mt-5 lg:!mt-[1.8rem]">
        

        <div className="embla__dots w-full flex-gtm-center gap-2 ">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected  !duration-300 ease' : ''
              )    }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
