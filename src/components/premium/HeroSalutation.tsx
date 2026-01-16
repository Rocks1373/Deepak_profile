import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function HeroSalutation() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background - subtle flow lines */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#64748b" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M0,400 Q300,200 600,400 T1200,400"
            stroke="url(#flowGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-flow"
          />
          <path
            d="M0,500 Q400,300 800,500 T1200,500"
            stroke="url(#flowGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-flow"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Main content */}
      <div className={`relative z-10 text-center px-6 transition-all duration-1500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Salute animation */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 border-2 border-slate-400 rounded-full flex items-center justify-center animate-salute">
              <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Main greeting */}
        <h1 className="text-5xl md:text-7xl font-light text-slate-100 mb-6 leading-tight">
          Good Evening, Mr. Ahmed
        </h1>

        {/* Sub-line */}
        <p className="text-xl md:text-2xl text-slate-300 mb-8 font-light">
          With utmost respect and appreciation
        </p>

        {/* Appreciation text */}
        <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          We know you are giving your 100% every day to grow this company.
          <br />
          This is my small contribution and dedication towards that journey.
        </p>

        {/* CTA Button */}
        <Link
          to="#why-matters"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-700 to-slate-600 text-white rounded-lg text-lg font-medium hover:from-slate-600 hover:to-slate-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 border border-slate-500/30"
        >
          <span>Please take a quick look</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Link>
      </div>

      <style>{`
        @keyframes flow {
          0% { transform: translateX(-100px); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateX(100px); opacity: 0; }
        }
        .animate-flow {
          animation: flow 8s ease-in-out infinite;
        }
        @keyframes salute {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(-5deg); }
          75% { transform: scale(1.1) rotate(5deg); }
        }
        .animate-salute {
          animation: salute 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
