import { useEffect, useRef, useState } from 'react'

export default function Page27DeliveryTracking() {
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

  const tracking = [
    { stage: 'Order Picked', status: 'Warehouse', icon: '📦' },
    { stage: 'Loaded on Truck', status: 'Ready', icon: '🚚' },
    { stage: 'In Transit', status: 'On the way', icon: '🛣️' },
    { stage: 'Out for Delivery', status: 'Nearby', icon: '📍' },
    { stage: 'Delivered', status: 'Completed', icon: '✅' },
    { stage: 'POD Confirmed', status: 'Verified', icon: '📄' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Delivery Tracking</h2>
          <p className="text-2xl text-slate-300 font-light">End-to-End Order Tracking</p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {tracking.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 text-center"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg text-slate-100 mb-1 font-medium">{item.stage}</h3>
              <p className="text-sm text-slate-400 font-light">{item.status}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Real-Time Updates</h3>
            <p className="text-slate-300 font-light leading-relaxed">
              Every status change is instantly visible to all stakeholders. 
              Sales team knows when orders are ready. Customers can track deliveries. 
              Management has complete visibility.
            </p>
          </div>
          <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">POD Management</h3>
            <p className="text-slate-300 font-light leading-relaxed">
              Proof of Delivery (POD) captured digitally. Instant confirmation, 
              photo support, customer signature, and automatic status updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
