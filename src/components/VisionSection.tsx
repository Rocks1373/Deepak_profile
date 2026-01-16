import { useEffect, useRef, useState } from 'react'

export default function VisionSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
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

  return (
    <section 
      ref={sectionRef}
      id="insights"
      className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-gray-400" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className={`text-4xl md:text-5xl font-light text-gray-900 mb-12 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          The Strategic Imperative
        </h2>
        
        <div className={`space-y-8 text-lg text-gray-700 leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <p className="text-xl md:text-2xl font-medium text-gray-800">
            AI is advancing at an unprecedented pace. Every day of delay is a day your competitors gain ground.
          </p>
          
          <p className="text-lg md:text-xl">
            But here's what many miss: <strong className="text-gray-900 font-semibold">AI alone is not intelligence.</strong> It processes, it calculates, it recognizes patterns. But vision, prediction, and judgment—these remain uniquely human.
          </p>
          
          <p className="text-lg md:text-xl">
            The businesses that will thrive are not those that replace humans with AI, but those that create systems where AI amplifies human decision-making. Where AI handles execution, humans provide direction. Where AI offers insights, humans make choices.
          </p>
          
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-2xl border-l-4 border-cyan-500 mt-8">
            <p className="text-xl md:text-2xl font-semibold text-white">
              This is not about technology. It's about competitive advantage.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
