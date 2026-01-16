import { useEffect, useRef, useState } from 'react'

export default function Page21TimeSavings() {
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

  const savings = [
    { area: 'Order Entry', saved: '15-30 min', desc: 'per order', icon: '📝' },
    { area: 'HMS Matching', saved: '1-2 hours', desc: 'per order', icon: '🏭' },
    { area: 'Data Re-entry', saved: '30-60 min', desc: 'eliminated', icon: '🔄' },
    { area: 'Approval Process', saved: 'Days → Minutes', desc: 'instant', icon: '✅' },
    { area: 'Stock Updates', saved: 'Real-time', desc: 'vs manual', icon: '📦' },
    { area: 'Report Generation', saved: 'Instant', desc: 'vs hours', icon: '📊' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Time Savings</h2>
          <p className="text-2xl text-slate-300 font-light">Automation Reduces Manual Work</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {savings.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl text-slate-100 mb-2 font-medium">{item.area}</h3>
              <div className="text-2xl text-slate-200 mb-1 font-medium">{item.saved}</div>
              <p className="text-slate-400 font-light text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-10 bg-gradient-to-r from-green-900/30 to-slate-800/50 backdrop-blur-sm rounded-xl border-2 border-green-700/30">
          <h3 className="text-4xl text-slate-100 mb-6 text-center font-light">Total Impact</h3>
          <p className="text-3xl text-slate-200 text-center leading-relaxed font-light">
            <span className="font-medium">3-5 hours saved per order</span>
            <br />
            <span className="text-2xl text-slate-300">Through automated workflows and intelligent processing</span>
          </p>
        </div>
      </div>
    </section>
  )
}
