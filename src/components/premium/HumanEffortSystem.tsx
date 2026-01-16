import { useEffect, useRef, useState } from 'react'

export default function HumanEffortSystem() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const steps = [
    { number: '01', title: 'Design Once', description: 'Hard work goes into designing the process once' },
    { number: '02', title: 'System Guides', description: 'After that, the system guides everyone the same way' },
    { number: '03', title: 'No Repetition', description: 'Humans should not repeat logic every day' }
  ]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-24 px-6"
    >
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-slate-100 mb-6">
            Human Effort + Smart System
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Brief explanation of how we combine human intelligence with system automation
          </p>
        </div>

        {/* Timeline/Step flow */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-500 to-transparent transform -translate-y-1/2"></div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:scale-105"
              >
                {/* Step number */}
                <div className="text-6xl font-light text-slate-400/30 mb-4">{step.number}</div>
                
                {/* Title */}
                <h3 className="text-2xl text-slate-100 mb-4 font-medium">{step.title}</h3>
                
                {/* Description */}
                <p className="text-slate-300 leading-relaxed font-light">{step.description}</p>

                {/* Connector dot */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 bg-slate-700 rounded-full border-4 border-slate-800"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
