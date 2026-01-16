import { useState } from 'react'
import TypingAssistant from './TypingAssistant'
import DemoSummary from './DemoSummary'
import { HmsDemoFlow } from './HmsDemoFlow'

interface GuidedDemoProps {
  onComplete?: () => void
}

interface DemoStep {
  id: string
  title: string
  description: string
  whoActs: string
  whyMatters: string
  timeSaved: string
}

const demoSteps: DemoStep[] = [
  {
    id: 'upload',
    title: 'Order Upload',
    description: 'User uploads Huawei Order Excel file. System stores order as CREATED status. No stock or logistics impact yet.',
    whoActs: 'User A (Order Initiator)',
    whyMatters: 'Centralized entry eliminates manual errors and provides immediate visibility.',
    timeSaved: 'Saves 15-30 minutes per order vs manual entry'
  },
  {
    id: 'matching',
    title: 'Huawei Matching',
    description: 'System sends data to Huawei Matching Engine. Receives MATCHED, NOT_MATCHED, or ISSUE response. Matching report generated automatically.',
    whoActs: 'HMS System (Automated)',
    whyMatters: 'Automated validation ensures data accuracy before processing begins.',
    timeSaved: 'Saves 1-2 hours of manual validation per order'
  },
  {
    id: 'precheck',
    title: 'Pre-Check by User',
    description: 'User reviews matching report. If issues found, correct data and resubmit. If OK, send for Sales Approval.',
    whoActs: 'User A',
    whyMatters: 'Early error detection prevents downstream issues and delays.',
    timeSaved: 'Catches errors 10x faster than manual review'
  },
  {
    id: 'sales',
    title: 'Sales Approval',
    description: 'Sales user receives notification. Views order summary, matching status, and issues. Approve or Reject with reason.',
    whoActs: 'Sales User',
    whyMatters: 'Sales team ensures customer requirements are met before logistics processing.',
    timeSaved: 'Approval decisions in minutes, not days'
  },
  {
    id: 'final',
    title: 'Final Approval',
    description: 'Head/Manager reviews full history, comments, and corrections. Approve or Reject. On approval, order moves to UPCOMING.',
    whoActs: 'Final Approver (Head/Manager)',
    whyMatters: 'Management oversight ensures compliance and quality control.',
    timeSaved: 'Complete visibility without manual status updates'
  },
  {
    id: 'upcoming',
    title: 'Upcoming Logistics',
    description: 'Approved order appears in Upcoming Logistics Orders. Status: APPROVED – AWAITING ARRIVAL. All data available for logistics team.',
    whoActs: 'System (Automated)',
    whyMatters: 'Seamless handoff to logistics team, no data re-entry needed.',
    timeSaved: 'Eliminates 30-60 minutes of data re-entry'
  },
  {
    id: 'arrival',
    title: 'Material Arrival',
    description: 'Logistics team scans arrival documents. System validates order exists and is approved. Status changes to ARRIVED.',
    whoActs: 'Logistics Team',
    whyMatters: 'Real-time tracking of material arrival, instant status updates.',
    timeSaved: 'Real-time updates vs manual tracking sheets'
  },
  {
    id: 'gr',
    title: 'GR in SAP',
    description: 'Perform GR in SAP. Enter GR number into system. System validates format. Status changes to RECEIVED.',
    whoActs: 'Logistics/Admin',
    whyMatters: 'SAP integration ensures financial records are synchronized.',
    timeSaved: 'Automated validation prevents GR errors'
  },
  {
    id: 'notification',
    title: 'Sales Notification',
    description: 'System notifies Sales team. Order received in warehouse, ready for customer delivery. Order visible for outbound planning.',
    whoActs: 'System (Automated)',
    whyMatters: 'Sales team can immediately plan customer deliveries, improving service.',
    timeSaved: 'Instant notification vs email chains and phone calls'
  }
]

export default function GuidedDemo({ onComplete }: GuidedDemoProps = {}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showSummary, setShowSummary] = useState(false)
  const [showHmsDemo, setShowHmsDemo] = useState(false)

  if (showHmsDemo) {
    return (
      <div className="min-h-screen bg-gray-950">
        <div className="bg-gray-900 p-4 border-b border-gray-700">
          <button
            onClick={() => setShowHmsDemo(false)}
            className="text-cyan-400 hover:text-cyan-300 font-medium"
          >
            ← Back to Overview Demo
          </button>
        </div>
        <HmsDemoFlow />
      </div>
    )
  }

  if (showSummary) {
    return <DemoSummary 
      onRestart={() => {
        setCurrentStep(0)
        setShowSummary(false)
      }}
      onFeedback={onComplete}
    />
  }

  const step = demoSteps[currentStep]
  const isLastStep = currentStep === demoSteps.length - 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 pb-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-light text-white">
              Step {currentStep + 1} of {demoSteps.length}
            </h2>
            <div className="flex gap-2">
              {demoSteps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 w-8 rounded transition-all ${
                    idx <= currentStep ? 'bg-cyan-500' : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-800 p-8 mb-8">
          <h3 className="text-3xl font-light text-white mb-6">
            {step.title}
          </h3>
          
          <div className="space-y-6 text-lg text-gray-200 leading-relaxed">
            <div>
              <h4 className="font-semibold text-white mb-2">What happens:</h4>
              <p className="font-medium text-gray-300">{step.description}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">Who acts:</h4>
              <p className="text-cyan-400 font-semibold">{step.whoActs}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">Why it matters:</h4>
              <p className="font-medium text-gray-300">{step.whyMatters}</p>
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-cyan-500">
              <h4 className="font-semibold text-white mb-2">Time saved:</h4>
              <p className="text-cyan-300 font-semibold">{step.timeSaved}</p>
            </div>
          </div>
        </div>

        {/* Typing Assistant */}
        <TypingAssistant step={step} />
      </div>

      {/* Navigation - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-700 shadow-2xl z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center gap-4">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-6 py-3 bg-gray-700 text-gray-200 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-500 shadow-md"
          >
            Previous
          </button>
          
          {isLastStep && (
            <button
              onClick={() => setShowHmsDemo(true)}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-500 hover:to-blue-500 transition-colors duration-200 shadow-md border border-cyan-400/30"
            >
              Try HMS Order Flow Demo
            </button>
          )}
          
          <button
            onClick={() => {
              if (isLastStep) {
                setShowSummary(true)
                if (onComplete) {
                  setTimeout(() => onComplete(), 100)
                }
              } else {
                setCurrentStep(currentStep + 1)
              }
            }}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-500 hover:to-blue-500 transition-colors duration-200 shadow-md min-w-[100px] border border-cyan-400/30"
          >
            {isLastStep ? 'View Summary' : 'Next'}
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}
