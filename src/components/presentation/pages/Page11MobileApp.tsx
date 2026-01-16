import { useEffect, useRef, useState } from 'react'

export default function Page11MobileApp() {
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
    'Fully customizable for our operations',
    'Designed specifically for warehouse staff',
    'Smooth workflow on mobile devices',
    'Simple and intuitive UI',
    'Offline capability for critical operations',
    'Barcode/QR code scanning',
    'Role-based access control',
    'Real-time sync with main system'
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6">
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Mobile Application</h2>
          <p className="text-2xl text-slate-300 font-light">Our Company's Own Mobile App</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div className="relative flex justify-center">
            <div className="relative w-64 h-[500px] bg-slate-800 rounded-[3rem] p-4 border-8 border-slate-700 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 rounded-[2rem] p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-xs text-slate-400">9:41</div>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1 bg-slate-600/30 rounded-xl p-4 flex items-center justify-center">
                  <div className="text-slate-400 text-sm text-center">Gulf Application<br />Mobile Interface</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg text-slate-200 font-light pt-1">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl border border-slate-600/50">
          <p className="text-2xl text-slate-200 text-center leading-relaxed font-light">
            <span className="font-medium">Huge operational impact:</span> Staff can work from anywhere, 
            scan items on the go, and update status in real-time without being tied to a desk.
          </p>
        </div>
      </div>
    </section>
  )
}
