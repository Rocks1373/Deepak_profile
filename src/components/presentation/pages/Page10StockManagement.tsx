import { useEffect, useRef, useState } from 'react'

export default function Page10StockManagement() {
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

  const features = [
    { title: 'Real-Time Visibility', desc: 'Live stock levels across all warehouses', icon: '👁️' },
    { title: 'Multi-Warehouse', desc: 'Track inventory across locations', icon: '🏢' },
    { title: 'Automatic Updates', desc: 'Stock updates on every transaction', icon: '🔄' },
    { title: 'Low Stock Alerts', desc: 'Notifications when stock is low', icon: '⚠️' },
    { title: 'Movement History', desc: 'Complete audit trail', icon: '📜' },
    { title: 'SAP Sync', desc: 'Synchronized with SAP system', icon: '🔗' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Stock Management</h2>
          <p className="text-2xl text-slate-300 font-light">Real-Time Inventory Tracking</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl text-slate-100 mb-2 font-medium">{feature.title}</h3>
              <p className="text-slate-400 font-light">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-8 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl border border-slate-600/50">
          <h3 className="text-3xl text-slate-100 mb-4 text-center font-light">Key Benefits</h3>
          <div className="grid md:grid-cols-2 gap-6 text-slate-300 font-light">
            <div>✓ Eliminates manual stock counting</div>
            <div>✓ Prevents stockouts and overstocking</div>
            <div>✓ Instant visibility for all stakeholders</div>
            <div>✓ Accurate financial reporting</div>
          </div>
        </div>
      </div>
    </section>
  )
}
