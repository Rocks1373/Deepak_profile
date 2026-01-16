import { useEffect, useRef, useState } from 'react'

export default function BusinessImpact() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const impacts = [
    { icon: '⚡', title: 'Faster Approvals', color: 'from-blue-600 to-blue-500' },
    { icon: '⏱️', title: 'Reduced Delays', color: 'from-green-600 to-green-500' },
    { icon: '📱', title: 'Mobile Accessibility', color: 'from-purple-600 to-purple-500' },
    { icon: '🔔', title: 'Swift Notifications', color: 'from-orange-600 to-orange-500' },
    { icon: '📦', title: 'Stock Visibility', color: 'from-cyan-600 to-cyan-500' },
    { icon: '💰', title: 'Vendor Payment Readiness', color: 'from-emerald-600 to-emerald-500' },
    { icon: '📊', title: 'Reports Anytime, Anywhere', color: 'from-indigo-600 to-indigo-500' },
    { icon: '👆', title: 'One Touch Access', color: 'from-pink-600 to-pink-500' }
  ]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6"
    >
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-slate-100 mb-4">
            Business Impact
          </h2>
          <p className="text-xl text-slate-300 font-light">Fast & Clear</p>
        </div>

        {/* Impact cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((impact, index) => (
            <div
              key={index}
              className="group relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${impact.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
              
              <div className="relative z-10 text-center">
                <div className="text-5xl mb-4">{impact.icon}</div>
                <h3 className="text-lg text-slate-200 font-medium">{impact.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
