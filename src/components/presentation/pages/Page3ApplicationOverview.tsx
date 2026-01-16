import { useEffect, useRef, useState } from 'react'

export default function Page3ApplicationOverview() {
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

  const modules = [
    { icon: '📦', title: 'Order Management', desc: 'Complete order lifecycle' },
    { icon: '🏭', title: 'HMS Integration', desc: 'Huawei Matching System' },
    { icon: '🌊', title: 'Gulf Application', desc: 'Company-specific workflows' },
    { icon: '📱', title: 'Mobile App', desc: 'On-the-go operations' },
    { icon: '📊', title: 'Stock Management', desc: 'Real-time inventory' },
    { icon: '✅', title: 'Approval Workflows', desc: 'Multi-level approvals' },
    { icon: '🤖', title: 'AI Support', desc: 'Intelligent automation' },
    { icon: '📈', title: 'Reports & Analytics', desc: 'Data-driven insights' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Application Overview</h2>
          <p className="text-2xl text-slate-300 font-light">Integrated Logistics Management System</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <div
              key={index}
              className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl mb-4">{module.icon}</div>
              <h3 className="text-xl text-slate-100 mb-2 font-medium">{module.title}</h3>
              <p className="text-slate-400 font-light">{module.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl border border-slate-600/50">
          <h3 className="text-3xl text-slate-100 mb-4 text-center font-light">Unified Platform</h3>
          <p className="text-xl text-slate-300 text-center leading-relaxed font-light max-w-4xl mx-auto">
            All modules work together seamlessly, providing a single source of truth 
            for all logistics operations, from order entry to final delivery.
          </p>
        </div>
      </div>
    </section>
  )
}
