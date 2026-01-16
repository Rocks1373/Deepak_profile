import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DemoEntry from '../components/DemoEntry'
import GuidedDemo from '../components/GuidedDemo'
import FeedbackForm from '../components/FeedbackForm'
import Footer from '../components/Footer'

export default function DemoPage() {
  const [isMrAhmed, setIsMrAhmed] = useState<boolean | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const navigate = useNavigate()

  if (showFeedback) {
    return (
      <div>
        <FeedbackForm onBack={() => setShowFeedback(false)} />
        <Footer />
      </div>
    )
  }

  if (isMrAhmed === null) {
    return (
      <div>
        <DemoEntry onConfirm={(yes) => {
          if (yes) {
            setIsMrAhmed(true)
          } else {
            navigate('/')
          }
        }} />
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <GuidedDemo onComplete={() => setShowFeedback(true)} />
      <Footer />
    </div>
  )
}
