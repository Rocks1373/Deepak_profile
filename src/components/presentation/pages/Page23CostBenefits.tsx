import { useEffect, useRef, useState } from 'react'

export default function Page23CostBenefits() {
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

  const costSavings = [
    { area: 'Manpower Pressure', saved: 'Reduced', desc: 'Automation handles routine tasks', icon: '👥' },
    { area: 'Error Corrections', saved: 'Minimized', desc: 'Early detection prevents costly fixes', icon: '💰' },
    { area: 'Operational Efficiency', saved: '3x', desc: 'Faster processing', icon: '⚡' },
    { area: 'Scalability Cost', saved: 'Low', desc: 'Grows without proportional headcount', icon: '📈' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Cost Benefits</h2>
          <p className="text-2xl text-slate-300 font-light">Reducing Operational Costs</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {costSavings.map((item, index) => (
            <div
              key={index}
              className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-2xl text-slate-100 mb-2 font-medium">{item.area}</h3>
              <div className="text-3xl text-slate-200 mb-2 font-medium">{item.saved}</div>
              <p className="text-slate-400 font-light">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-xl text-slate-100 mb-3 font-medium">Direct Savings</h3>
            <p className="text-slate-300 font-light">Reduced manpower requirements for routine tasks</p>
          </div>
          <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-xl text-slate-100 mb-3 font-medium">Indirect Savings</h3>
            <p className="text-slate-300 font-light">Fewer errors mean fewer costly corrections</p>
          </div>
          <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-xl text-slate-100 mb-3 font-medium">Long-term Value</h3>
            <p className="text-slate-300 font-light">Scalable growth without proportional costs</p>
          </div>
        </div>
      </div>
    </section>
  )
}
