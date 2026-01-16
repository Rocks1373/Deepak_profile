import HeroSalutation from '../components/premium/HeroSalutation'
import WhyThisMatters from '../components/premium/WhyThisMatters'
import TheVision from '../components/premium/TheVision'
import HumanEffortSystem from '../components/premium/HumanEffortSystem'
import MobileAppIntro from '../components/premium/MobileAppIntro'
import AISupport from '../components/premium/AISupport'
import BusinessImpact from '../components/premium/BusinessImpact'
import PortfolioShowcase from '../components/PortfolioShowcase'
import ClosingSection from '../components/premium/ClosingSection'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <HeroSalutation />
      <WhyThisMatters />
      <TheVision />
      <HumanEffortSystem />
      <MobileAppIntro />
      <AISupport />
      <BusinessImpact />
      <PortfolioShowcase />
      <ClosingSection />
      <Footer />
    </div>
  )
}
