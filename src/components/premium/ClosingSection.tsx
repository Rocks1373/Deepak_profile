import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

export default function ClosingSection() {
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

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-24 px-6"
    >
      <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl md:text-5xl font-light text-slate-100 mb-12 leading-relaxed">
          This is not just technology.
          <br />
          It is a step towards smoother operations,
          <br />
          better control,
          <br />
          and scalable growth.
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/presentation"
            className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-slate-600 to-slate-500 text-white rounded-xl text-xl font-medium hover:from-slate-500 hover:to-slate-400 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 border border-slate-400/30"
          >
            <span>View Complete Presentation</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </Link>
          <Link
            to="/demo"
            className="inline-flex items-center gap-3 px-12 py-5 bg-slate-700/50 text-white rounded-xl text-xl font-medium hover:bg-slate-600/50 transition-all duration-300 border border-slate-600/30"
          >
            <span>View Live Demo</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
