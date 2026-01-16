import { useEffect, useRef, useState } from 'react'

export default function Page18RoleBasedAccess() {
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

  const roles = [
    { role: 'HEAD_ADMIN', access: 'Full system access', icon: '👑' },
    { role: 'RECEIVER', access: 'Inbound operations', icon: '📥' },
    { role: 'PICKER', access: 'Outbound picking', icon: '📤' },
    { role: 'CHECKER', access: 'Quality verification', icon: '✅' },
    { role: 'DISPATCHER', access: 'Delivery management', icon: '🚚' },
    { role: 'SALES', access: 'Read-only access', icon: '👔' },
    { role: 'VIEW_ONLY', access: 'Dashboard viewing', icon: '👁️' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Role-Based Access</h2>
          <p className="text-2xl text-slate-300 font-light">Granular Permissions & Security</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {roles.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-lg text-slate-100 mb-2 font-medium">{item.role}</h3>
              <p className="text-sm text-slate-400 font-light">{item.access}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Security Features</h3>
            <ul className="space-y-3 text-slate-300 font-light">
              <li>✓ Granular permission control</li>
              <li>✓ Role-based workflows</li>
              <li>✓ Audit trail of all actions</li>
              <li>✓ Secure authentication</li>
              <li>✓ Session management</li>
            </ul>
          </div>
          <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Benefits</h3>
            <ul className="space-y-3 text-slate-300 font-light">
              <li>✓ Users see only what they need</li>
              <li>✓ Reduced errors from wrong access</li>
              <li>✓ Compliance with data privacy</li>
              <li>✓ Easy role management</li>
              <li>✓ Scalable permission system</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
