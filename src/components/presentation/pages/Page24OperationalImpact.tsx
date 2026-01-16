import { useEffect, useRef, useState } from 'react'

export default function Page24OperationalImpact() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  const impacts = [
    { metric: '70%', label: 'Time Saved', icon: '⏱️' },
    { metric: '95%', label: 'Error Reduction', icon: '✅' },
    { metric: '10x', label: 'Scalability', icon: '📈' },
    { metric: '3x', label: 'Efficiency', icon: '⚡' },
    { metric: '100%', label: 'Visibility', icon: '👁️' },
    { metric: '24/7', label: 'Accessibility', icon: '📱' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Operational Impact</h2>
          <p className="text-2xl text-slate-300 font-light">Measurable Business Results</p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {impacts.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 text-center"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <div className="text-4xl text-slate-100 mb-2 font-medium">{item.metric}</div>
              <div className="text-slate-400 font-light text-sm">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="p-10 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl border-2 border-slate-600/50">
          <h3 className="text-3xl text-slate-100 mb-6 text-center font-light">Overall Transformation</h3>
          <p className="text-xl text-slate-200 text-center leading-relaxed font-light max-w-4xl mx-auto">
            This is not just technology. It is a step towards smoother operations, 
            better control, and scalable growth. The system amplifies human capability 
            while maintaining human control over critical decisions.
          </p>
        </div>
      </div>
    </section>
  )
}
