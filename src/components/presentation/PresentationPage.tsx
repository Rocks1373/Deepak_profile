import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Page1Welcome from './pages/Page1Welcome'
import Page2CompanyVision from './pages/Page2CompanyVision'
import Page3ApplicationOverview from './pages/Page3ApplicationOverview'
import Page4NormalOrderFlow from './pages/Page4NormalOrderFlow'
import Page5HuaweiWorkflow from './pages/Page5HuaweiWorkflow'
import Page6HMSIntegration from './pages/Page6HMSIntegration'
import Page7GulfApplication from './pages/Page7GulfApplication'
import Page8InboundOperations from './pages/Page8InboundOperations'
import Page9OutboundOperations from './pages/Page9OutboundOperations'
import Page10StockManagement from './pages/Page10StockManagement'
import Page11MobileApp from './pages/Page11MobileApp'
import Page12ApprovalWorkflows from './pages/Page12ApprovalWorkflows'
import Page13AIIntegration from './pages/Page13AIIntegration'
import Page14SAPIntegration from './pages/Page14SAPIntegration'
import Page15RealTimeVisibility from './pages/Page15RealTimeVisibility'
import Page16Notifications from './pages/Page16Notifications'
import Page17Reports from './pages/Page17Reports'
import Page18RoleBasedAccess from './pages/Page18RoleBasedAccess'
import Page19Security from './pages/Page19Security'
import Page20Scalability from './pages/Page20Scalability'
import Page21TimeSavings from './pages/Page21TimeSavings'
import Page22ErrorReduction from './pages/Page22ErrorReduction'
import Page23CostBenefits from './pages/Page23CostBenefits'
import Page24OperationalImpact from './pages/Page24OperationalImpact'
import Page25VendorManagement from './pages/Page25VendorManagement'
import Page26WarehouseOperations from './pages/Page26WarehouseOperations'
import Page27DeliveryTracking from './pages/Page27DeliveryTracking'
import Page28DataAnalytics from './pages/Page28DataAnalytics'
import Page29FutureRoadmap from './pages/Page29FutureRoadmap'
import Page30Closing from './pages/Page30Closing'

const TOTAL_PAGES = 30

export default function PresentationPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isNavigating) return
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        goToNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        goToPrevious()
      } else if (e.key === 'Home') {
        setCurrentPage(1)
      } else if (e.key === 'End') {
        setCurrentPage(TOTAL_PAGES)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentPage, isNavigating])

  const goToNext = () => {
    if (currentPage < TOTAL_PAGES) {
      setIsNavigating(true)
      setCurrentPage(prev => prev + 1)
      setTimeout(() => setIsNavigating(false), 500)
    }
  }

  const goToPrevious = () => {
    if (currentPage > 1) {
      setIsNavigating(true)
      setCurrentPage(prev => prev - 1)
      setTimeout(() => setIsNavigating(false), 500)
    }
  }

  const goToPage = (page: number) => {
    setIsNavigating(true)
    setCurrentPage(page)
    setTimeout(() => setIsNavigating(false), 500)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 1: return <Page1Welcome />
      case 2: return <Page2CompanyVision />
      case 3: return <Page3ApplicationOverview />
      case 4: return <Page4NormalOrderFlow />
      case 5: return <Page5HuaweiWorkflow />
      case 6: return <Page6HMSIntegration />
      case 7: return <Page7GulfApplication />
      case 8: return <Page8InboundOperations />
      case 9: return <Page9OutboundOperations />
      case 10: return <Page10StockManagement />
      case 11: return <Page11MobileApp />
      case 12: return <Page12ApprovalWorkflows />
      case 13: return <Page13AIIntegration />
      case 14: return <Page14SAPIntegration />
      case 15: return <Page15RealTimeVisibility />
      case 16: return <Page16Notifications />
      case 17: return <Page17Reports />
      case 18: return <Page18RoleBasedAccess />
      case 19: return <Page19Security />
      case 20: return <Page20Scalability />
      case 21: return <Page21TimeSavings />
      case 22: return <Page22ErrorReduction />
      case 23: return <Page23CostBenefits />
      case 24: return <Page24OperationalImpact />
      case 25: return <Page25VendorManagement />
      case 26: return <Page26WarehouseOperations />
      case 27: return <Page27DeliveryTracking />
      case 28: return <Page28DataAnalytics />
      case 29: return <Page29FutureRoadmap />
      case 30: return <Page30Closing />
      default: return <Page1Welcome />
    }
  }

  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* Navigation Controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={goToPrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-slate-800/80 backdrop-blur-sm text-slate-200 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700 transition-all"
        >
          ← Prev
        </button>
        <span className="px-4 py-2 bg-slate-800/80 backdrop-blur-sm text-slate-200 rounded-lg border border-slate-700">
          {currentPage} / {TOTAL_PAGES}
        </span>
        <button
          onClick={goToNext}
          disabled={currentPage === TOTAL_PAGES}
          className="px-4 py-2 bg-slate-800/80 backdrop-blur-sm text-slate-200 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700 transition-all"
        >
          Next →
        </button>
      </div>

      {/* Page Indicator Dots */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-2 flex-wrap justify-center max-w-4xl px-4">
        {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentPage === page
                ? 'bg-slate-200 w-8'
                : 'bg-slate-600 hover:bg-slate-500'
            }`}
            title={`Page ${page}`}
          />
        ))}
      </div>

      {/* Home Button */}
      <Link
        to="/"
        className="fixed top-4 left-4 z-50 px-4 py-2 bg-slate-800/80 backdrop-blur-sm text-slate-200 rounded-lg hover:bg-slate-700 border border-slate-700 transition-all"
      >
        ← Home
      </Link>

      {/* Page Content */}
      <div className={`transition-opacity duration-500 ${isNavigating ? 'opacity-0' : 'opacity-100'}`}>
        {renderPage()}
      </div>

      {/* Keyboard Hints */}
      <div className="fixed bottom-4 right-4 z-50 text-xs text-slate-500 bg-slate-800/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-700">
        <div>← → Arrow keys to navigate</div>
        <div>Space / Enter for next</div>
      </div>
    </div>
  )
}
