import { useEffect, useState } from 'react'

interface TypingAssistantProps {
  step: {
    id: string
    title: string
    description: string
    whoActs: string
    whyMatters: string
    timeSaved: string
  }
}

const messages: Record<string, string[]> = {
  upload: [
    "Mr. Ahmed, this step demonstrates how order entry becomes instant and error-free.",
    "Notice how the system immediately validates and stores the order—no manual data entry required."
  ],
  matching: [
    "Here, AI handles the complex matching process automatically.",
    "This would take a human hours. The system completes it in seconds while maintaining accuracy."
  ],
  precheck: [
    "Human oversight ensures quality. You review, you decide, you control.",
    "AI provides the analysis, but you make the judgment call."
  ],
  sales: [
    "Sales team gets instant visibility. No waiting, no confusion, no missed communications.",
    "Approval decisions happen in real-time, keeping the process moving."
  ],
  final: [
    "Management maintains full control with complete visibility.",
    "Every decision is informed, every approval is documented, every action is traceable."
  ],
  upcoming: [
    "Seamless handoff between teams. No data loss, no re-entry, no errors.",
    "The logistics team receives everything they need, exactly when they need it."
  ],
  arrival: [
    "Real-time tracking replaces manual spreadsheets and phone calls.",
    "Everyone knows the status instantly—no delays, no confusion."
  ],
  gr: [
    "Integration ensures financial records stay synchronized.",
    "Automated validation prevents costly errors in GR entry."
  ],
  notification: [
    "Instant communication replaces email chains and phone tag.",
    "Sales can plan deliveries immediately, improving customer service."
  ]
}

export default function TypingAssistant({ step }: TypingAssistantProps) {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const stepMessages = messages[step.id] || []

  useEffect(() => {
    if (stepMessages.length === 0) return

    setDisplayText('')
    setIsTyping(true)

    const typeMessage = (messageIndex: number) => {
      const message = stepMessages[messageIndex]
      let charIndex = 0
      setDisplayText('')

      const typingInterval = setInterval(() => {
        if (charIndex < message.length) {
          setDisplayText(message.substring(0, charIndex + 1))
          charIndex++
        } else {
          clearInterval(typingInterval)
          setIsTyping(false)
          
          // Move to next message after a delay
          if (messageIndex < stepMessages.length - 1) {
            setTimeout(() => {
              setIsTyping(true)
              typeMessage(messageIndex + 1)
            }, 2000)
          }
        }
      }, 30)
    }

    typeMessage(0)
  }, [step.id, stepMessages])

  if (stepMessages.length === 0) return null

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8 border-l-4 border-cyan-500">
      <div className="flex items-start gap-4">
        <div className="text-2xl">💬</div>
        <div className="flex-1">
          <p className="text-sm text-cyan-400 mb-2 font-semibold">
            Assistant (addressing Mr. Ahmed)
          </p>
          <p className="text-gray-200 leading-relaxed font-medium text-base">
            {displayText}
            {isTyping && <span className="text-cyan-400 animate-pulse">|</span>}
          </p>
        </div>
      </div>
    </div>
  )
}
