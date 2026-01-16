import { useState, useEffect } from "react";
import { TypingAssistant } from "./TypingAssistant";

export interface TourStep {
  id: string;
  title: string;
  message: string;
  targetSelector?: string;
  route?: string;
  position?: "top" | "bottom" | "left" | "right";
}

interface GuidedTourProps {
  steps: TourStep[];
  onComplete: () => void;
  onSkip: () => void;
  currentRoute: string;
  onNavigate?: (route: string) => void;
}

export function GuidedTour({ steps, onComplete, onSkip, currentRoute, onNavigate }: GuidedTourProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [highlightElement, setHighlightElement] = useState<HTMLElement | null>(null);
  const [showAssistant, setShowAssistant] = useState(true);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (currentStep?.targetSelector) {
        const element = document.querySelector(currentStep.targetSelector) as HTMLElement;
        if (element) {
          setHighlightElement(element);
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          setHighlightElement(null);
        }
      } else {
        setHighlightElement(null);
      }

      if (currentStep?.route && currentStep.route !== currentRoute && onNavigate) {
        onNavigate(currentStep.route);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentStep, currentRoute, onNavigate]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setShowAssistant(true);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setShowAssistant(true);
    }
  };

  if (!currentStep) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 pointer-events-none">
        {highlightElement && (
          <div
            className="absolute border-4 border-blue-500 rounded-lg shadow-2xl pointer-events-none"
            style={{
              top: highlightElement.offsetTop - 4,
              left: highlightElement.offsetLeft - 4,
              width: highlightElement.offsetWidth + 8,
              height: highlightElement.offsetHeight + 8,
            }}
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Assistant Bubble */}
      {showAssistant && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md">
          <TypingAssistant
            message={`${currentStep.title}\n\n${currentStep.message}`}
            onComplete={() => setShowAssistant(false)}
          />
        </div>
      )}

      {/* Controls */}
      <div className="fixed bottom-6 left-6 z-50 bg-white rounded-lg shadow-xl p-4 min-w-[280px]">
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Step {currentStepIndex + 1} of {steps.length}</span>
            <button
              onClick={onSkip}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Skip Tour
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleBack}
            disabled={currentStepIndex === 0}
            className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 font-medium rounded-lg transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            {currentStepIndex === steps.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </>
  );
}
