import { useEffect, useRef, useState } from 'react'

export default function Page8InboundOperations() {
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

  const steps = [
    { title: 'Shipment Arrival', desc: 'UPCOMING status', icon: '🚚' },
    { title: 'Receiver Check', desc: 'ARRIVED status', icon: '👤' },
    { title: 'Item Scanning', desc: 'CHECKING status', icon: '📱' },
    { title: 'Quantity Confirm', desc: 'CONFIRMED status', icon: '✓' },
    { title: 'Stock Update', desc: 'POSTED status', icon: '📦' },
    { title: 'SAP Integration', desc: 'Synchronized', icon: '🔗' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Inbound Operations</h2>
          <p className="text-2xl text-slate-300 font-light">Receiving & Processing Incoming Shipments</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl text-slate-100 mb-2 font-medium">{step.title}</h3>
              <p className="text-slate-400 font-light">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Benefits</h3>
            <ul className="space-y-2 text-slate-300 font-light">
              <li>✓ Real-time tracking of all shipments</li>
              <li>✓ Automated status updates</li>
              <li>✓ Mobile scanning support</li>
              <li>✓ Instant stock visibility</li>
            </ul>
          </div>
          <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Time Savings</h3>
            <p className="text-xl text-slate-300 mb-4 font-light">Saves 30-60 minutes per shipment</p>
            <p className="text-slate-400 font-light">Eliminates manual data entry and reduces errors significantly</p>
          </div>
        </div>
      </div>
    </section>
  )
}
