import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = () => {
    const FAQs = [
        {
            question: "Why should you use Farmisha?",
            answer: "Farmisha helps you increase garden productivity, reduce resource usage, and enhance your home’s sustainability with smart, tech-driven solutions for effortless farming."
        },
        {
            question: "Why should you use Farmisha?  ",
            answer: "Farmisha helps you increase garden productivity, reduce resource usage, and enhance your home’s sustainability with smart, tech-driven solutions for effortless farming."
        },
        {
            question: "Why should you use Farmisha?",
            answer: "Farmisha helps you increase garden productivity, reduce resource usage, and enhance your home’s sustainability with smart, tech-driven solutions for effortless farming."
        },
        {
            question: "Why should you use Farmisha?",
            answer: "Farmisha helps you increase garden productivity, reduce resource usage, and enhance your home’s sustainability with smart, tech-driven solutions for effortless farming."
        },
        {
            question: "Why should you use Farmisha?",
            answer: "Farmisha helps you increase garden productivity, reduce resource usage, and enhance your home’s sustainability with smart, tech-driven solutions for effortless farming."
        },
        {
            question: "Why should you use Farmisha?",
            answer: "Farmisha helps you increase garden productivity, reduce resource usage, and enhance your home’s sustainability with smart, tech-driven solutions for effortless farming."
        }   
    ]
    return (
        <div className="py-5 lg:py-10 mt-5 lg:mt-10 flex flex-col items-center justify-center">

            <div className="w-full text-center text-xl lg:text-3xl text-head font-semibold">
                For more understanding, visit <span className="text-green3">FAQs</span>
            </div>

            <div className="p-4 lg:p-6 text-sm lg:text-base text-justify md:text-center text-gray  px-auto lg:!px-52 ">FAQs enable you to deal with specific queries that your students have about their future coaching institutions. The FAQs also represent another way to reach out your favorable institutions.</div>

            
                <Accordion type="single" collapsible className="w-full  flex  flex-col justify-center items-center" >
                    {
                        FAQs?.map((faq, index) => (
                            <AccordionItem value={`item-${index + 1}`} key={index} >
                                <AccordionTrigger className="bg-green1 hover:shadow-md duration-200 px-2 lg:px-4 py-2 lg:py-4 rounded-lg font-medium text-sm lg:text-lg text-head hover:!no-underline">{faq?.question}</AccordionTrigger>
                                <AccordionContent className="p-2 md:p-4 text-sm sm:!text-base text-gray">{faq?.answer}</AccordionContent>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            
        </div>
    )
}

export default FAQ