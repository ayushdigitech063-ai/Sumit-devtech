import Section from "@/app/ui/Section";
import SectionHeading from "@/app/ui/SectionHeading";
import { OurJourney } from "@/data/about";
import { Icon } from "lucide-react";



export default function JourneySection () {
    return(
     <Section id="journey-section" light>
        <SectionHeading  
        center
        label="Our journey"
        title={<>We Started in 2016. <span className="text-brand">We&apos;re Still Growing.</span></>}
        text="Three brands built over 8+ years. Same founder, same team, same work ethic throughout." />
        
    {/* Timeline */}
        <div className="relative">
          {/* Central Vertical Line */}
           <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-200 via-orange-600"></div>
          <div className="space-y-8 md:space-y-12">
            {OurJourney.map((item, index) => {
              const isLeft = index % 2 === 1;
              const Icon = item.icon;
              const card = (
                <article
                  className={`relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:shadow-lg sm:p-7 w-150 ${
                    isLeft ? "md:text-right ml-60" : "md:text-left ml-15"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500 ${
                      isLeft ? "md:ml-auto" : ""
                    }`}
                  >
                    {/* <Icon size={23} strokeWidth={1.8} /> */}
                    <Icon size={23} strokeWidth={1.8} />
                  </div>
                
                  {/* Card Content */}
                  <h3 className="text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                    {item.text}
                  </p>
                </article>
              );

              return (
                <div
                  key={`journey-${item.title}`}
                  className="relative grid grid-cols-[48px_minmax(0,1fr)] items-center gap-4 md:grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)] md:gap-0"
                >
                  {/* Left Card */}
                  <div className="hidden md:block md:col-start-1">
                    {isLeft ? card : null}
                    {isLeft && (
                      <div className="absolute left-210 top-1/2 h-0.5 w-14 bg-gradient-to-r from-orange-400 to-orange-600"></div>
                    )}
                  </div>

                  {/* Year Marker */}
                  <div className="relative z-10 col-start-1 row-start-1 flex justify-center md:col-start-2">
                    <div className="flex items-center justify-center rounded-full border-2 border-orange-500 bg-[#F8F7F4] text-xs font-extrabold text-slate-900 shadow-[0_0_20px_rgba(249,115,22,0.12)] transition-colors duration-300 hover:bg-orange-500 hover:text-white sm:h-20 sm:w-20 sm:text-sm">
                        {item.year}
                    </div>
                    
                  </div>
        

                  {/* Mobile Card: always on the right */}
                  <div className="col-start-2 row-start-1 md:hidden">
                    {card}
                  </div>

                  {/* Right Card */}
                  <div className="hidden md:col-start-3 md:block">
                    {!isLeft ? card : null}
                    {!isLeft && (
                      <div className="absolute right-206 top-1/2 h-0.5 w-34 bg-gradient-to-l from-orange-400 to-orange-600"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          </div>


     </Section>


    )
}