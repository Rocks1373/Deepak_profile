import { useEffect, useRef, useState } from 'react'

export default function Page16Notifications() {
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

  const notificationTypes = [
    { type: 'Approval Requests', desc: 'Instant notification when approval needed', icon: '✅' },
    { type: 'Order Updates', desc: 'Status changes and milestones', icon: '📦' },
    { type: 'Stock Alerts', desc: 'Low stock and critical levels', icon: '⚠️' },
    { type: 'Delivery Status', desc: 'Outbound order tracking', icon: '🚚' },
    { type: 'System Alerts', desc: 'Important system notifications', icon: '🔔' },
    { type: 'Task Assignments', desc: 'New tasks assigned to you', icon: '📋' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Swift Notifications</h2>
          <p className="text-2xl text-slate-300 font-light">Instant Communication System</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {notificationTypes.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl text-slate-100 mb-2 font-medium">{item.type}</h3>
              <p className="text-slate-400 font-light text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Channels</h3>
            <ul className="space-y-3 text-slate-300 font-light">
              <li>• In-app notifications</li>
              <li>• Mobile push notifications</li>
              <li>• Email alerts (optional)</li>
              <li>• Telegram integration</li>
              <li>• Web dashboard alerts</li>
            </ul>
          </div>
          <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Benefits</h3>
            <ul className="space-y-3 text-slate-300 font-light">
              <li>✓ No missed approvals</li>
              <li>✓ Faster response times</li>
              <li>✓ Reduced email chains</li>
              <li>✓ Mobile accessibility</li>
              <li>✓ Actionable notifications</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl border border-slate-600/50">
          <p className="text-xl text-slate-200 text-center leading-relaxed font-light">
            <span className="font-medium">Result:</span> Approval decisions happen in minutes, not days. 
            Instant communication replaces email chains and phone calls.
          </p>
        </div>
      </div>
    </section>
  )
}
