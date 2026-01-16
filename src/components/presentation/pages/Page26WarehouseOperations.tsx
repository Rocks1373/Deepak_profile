import { useEffect, useRef, useState } from 'react'

export default function Page26WarehouseOperations() {
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

  const operations = [
    { op: 'Receiving', desc: 'Inbound shipment processing', icon: '📥' },
    { op: 'Storage', desc: 'Location management', icon: '📍' },
    { op: 'Picking', desc: 'Order fulfillment', icon: '📤' },
    { op: 'Checking', desc: 'Quality verification', icon: '✅' },
    { op: 'Dispatching', desc: 'Outbound preparation', icon: '🚚' },
    { op: 'Inventory', desc: 'Stock management', icon: '📦' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Warehouse Operations</h2>
          <p className="text-2xl text-slate-300 font-light">Complete Warehouse Management</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {operations.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl text-slate-100 mb-2 font-medium">{item.op}</h3>
              <p className="text-slate-400 font-light text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Multi-Warehouse Support</h3>
            <p className="text-slate-300 font-light leading-relaxed">
              Manage multiple warehouses from a single system. Real-time visibility 
              across all locations, centralized control, and location-specific workflows.
            </p>
          </div>
          <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Mobile-First</h3>
            <p className="text-slate-300 font-light leading-relaxed">
              Warehouse staff use mobile devices for all operations. Scan items, 
              update locations, confirm deliveries—all from the warehouse floor.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
