import { useEffect, useState } from 'react'

export default function Page1Welcome() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(148, 163, 184, 0.1) 0%, transparent 50%)`,
        }}></div>
      </div>

      <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-12">
          <div className="text-7xl mb-6">👋</div>
          <h1 className="text-6xl md:text-7xl font-light text-slate-100 mb-6 leading-tight">
            Welcome, Mr. Ahmed
          </h1>
          <p className="text-2xl md:text-3xl text-slate-300 mb-4 font-light">
            Complete Application Overview
          </p>
          <p className="text-xl text-slate-400 font-light">
            A comprehensive presentation of our integrated logistics system
          </p>
        </div>

        <div className="mt-16 space-y-4 text-left max-w-2xl mx-auto">
          <div className="flex items-start gap-4 p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
            <div className="text-3xl">📋</div>
            <div>
              <h3 className="text-xl text-slate-200 mb-2 font-medium">30 Pages</h3>
              <p className="text-slate-400 font-light">Complete functionality and vision explained</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
            <div className="text-3xl">🏢</div>
            <div>
              <h3 className="text-xl text-slate-200 mb-2 font-medium">Company-Focused</h3>
              <p className="text-slate-400 font-light">Designed specifically for our operations</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
            <div className="text-3xl">🚀</div>
            <div>
              <h3 className="text-xl text-slate-200 mb-2 font-medium">Interactive Navigation</h3>
              <p className="text-slate-400 font-light">Use arrow keys or buttons to navigate</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-slate-500 text-sm">
          Press → or Space to continue
        </div>
      </div>
    </section>
  )
}
