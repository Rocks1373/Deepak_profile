import { useEffect, useRef, useState } from 'react'

export default function Page9OutboundOperations() {
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
    { title: 'Order Created', status: 'PENDING', icon: '📝' },
    { title: 'Picker Assigned', status: 'ASSIGNED', icon: '👷' },
    { title: 'Items Picked', status: 'PICKED', icon: '📦' },
    { title: 'Checker Verify', status: 'CHECKED', icon: '✅' },
    { title: 'Load Truck', status: 'LOADED', icon: '🚚' },
    { title: 'Deliver', status: 'DELIVERED', icon: '🎯' },
    { title: 'POD Confirmation', status: 'COMPLETED', icon: '📄' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Outbound Operations</h2>
          <p className="text-2xl text-slate-300 font-light">Order Fulfillment & Delivery</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
            >
              <div className="text-4xl mb-3">{step.icon}</div>
              <h3 className="text-lg text-slate-100 mb-1 font-medium">{step.title}</h3>
              <p className="text-sm text-slate-400 font-light">{step.status}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-xl text-slate-100 mb-3 font-medium">Role-Based</h3>
            <p className="text-slate-300 font-light">Each step assigned to specific roles</p>
          </div>
          <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-xl text-slate-100 mb-3 font-medium">Quality Control</h3>
            <p className="text-slate-300 font-light">Multi-level verification process</p>
          </div>
          <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-xl text-slate-100 mb-3 font-medium">Complete Tracking</h3>
            <p className="text-slate-300 font-light">Real-time status at every step</p>
          </div>
        </div>
      </div>
    </section>
  )
}
