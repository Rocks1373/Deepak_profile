import { useEffect, useRef, useState } from 'react'

export default function Page15RealTimeVisibility() {
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

  const visibility = [
    { area: 'Order Status', desc: 'Real-time order tracking', icon: '📊' },
    { area: 'Stock Levels', desc: 'Live inventory across warehouses', icon: '📦' },
    { area: 'Approval Status', desc: 'Pending approvals visibility', icon: '✅' },
    { area: 'Delivery Tracking', desc: 'Outbound order locations', icon: '🚚' },
    { area: 'Workflow Progress', desc: 'Step-by-step process tracking', icon: '🔄' },
    { area: 'Team Activity', desc: 'Who is doing what, when', icon: '👥' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Real-Time Visibility</h2>
          <p className="text-2xl text-slate-300 font-light">Complete Transparency Across Operations</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {visibility.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl text-slate-100 mb-2 font-medium">{item.area}</h3>
              <p className="text-slate-400 font-light">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Benefits</h3>
            <ul className="space-y-3 text-slate-300 font-light">
              <li>✓ No more "where is my order?" questions</li>
              <li>✓ Instant status updates</li>
              <li>✓ Proactive issue identification</li>
              <li>✓ Better decision making</li>
              <li>✓ Reduced communication overhead</li>
            </ul>
          </div>
          <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Impact</h3>
            <p className="text-lg text-slate-300 mb-4 font-light leading-relaxed">
              Everyone sees the same information at the same time. No confusion, 
              no delays, no miscommunication. Complete transparency builds trust 
              and enables faster problem resolution.
            </p>
            <div className="text-3xl text-slate-200 font-light">100% Visibility</div>
          </div>
        </div>
      </div>
    </section>
  )
}
