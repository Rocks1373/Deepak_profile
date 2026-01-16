import HeroSection from '../components/HeroSection'
import VisionSection from '../components/VisionSection'
import PhilosophySection from '../components/PhilosophySection'
import BusinessValueSection from '../components/BusinessValueSection'
import GappShowcaseSection from '../components/GappShowcaseSection'
import FutureVisionSection from '../components/FutureVisionSection'
import BlogSection from '../components/BlogSection'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <VisionSection />
      <PhilosophySection />
      <BusinessValueSection />
      <GappShowcaseSection />
      <BlogSection />
      <FutureVisionSection />
      <Footer />
    </div>
  )
}
