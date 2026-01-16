import React, { createContext, useContext, useState, useEffect } from "react";
import { EntryGate } from "./EntryGate";
import { GuidedTour, TourStep } from "./GuidedTour";
import { SummaryPage } from "./SummaryPage";
import { demoSteps } from "../../data/demoTour";

interface DemoContextType {
  isDemo: boolean;
  isReadOnly: boolean;
  startTour: () => void;
  stopTour: () => void;
}

const DemoContext = createContext<DemoContextType | null>(null);

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    return { isDemo: false, isReadOnly: false, startTour: () => {}, stopTour: () => {} };
  }
  return context;
}

interface DemoWrapperProps {
  children: React.ReactNode;
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export function DemoWrapper({ children, currentRoute, onNavigate }: DemoWrapperProps) {
  const [showEntryGate, setShowEntryGate] = useState(true);
  const [isMrAhmed, setIsMrAhmed] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [tourCompleted, setTourCompleted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const confirmed = sessionStorage.getItem("demo_confirmed");
    if (confirmed === "true") {
      setShowEntryGate(false);
      setIsMrAhmed(true);
      const tourStarted = sessionStorage.getItem("demo_tour_started");
      if (tourStarted === "true") {
        setShowTour(true);
      }
    }
    setIsInitialized(true);
  }, []);

  const handleConfirm = () => {
    setIsMrAhmed(true);
    setShowEntryGate(false);
    setShowTour(true);
    sessionStorage.setItem("demo_confirmed", "true");
    sessionStorage.setItem("demo_tour_started", "true");
  };

  const handleCancel = () => {
    setShowEntryGate(false);
  };

  const handleTourComplete = () => {
    setShowTour(false);
    setTourCompleted(true);
    sessionStorage.setItem("demo_tour_completed", "true");
  };

  const handleTourSkip = () => {
    setShowTour(false);
    sessionStorage.setItem("demo_tour_skipped", "true");
  };

  return (
    <DemoContext.Provider value={{ isDemo: true, isReadOnly: true, startTour: () => setShowTour(true), stopTour: () => setShowTour(false) }}>
      {showEntryGate && <EntryGate onConfirm={handleConfirm} onCancel={handleCancel} />}
      {!isMrAhmed && !showEntryGate && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Demo Access</h2>
            <p className="text-gray-600 mb-6">This guided demo is prepared for Mr. Ahmed.</p>
            <a href="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Return to main application
            </a>
          </div>
        </div>
      )}
      {isMrAhmed && (
        <>
          {children}
          {showTour && (
            <GuidedTour
              steps={demoSteps}
              onComplete={handleTourComplete}
              onSkip={handleTourSkip}
              currentRoute={currentRoute}
              onNavigate={onNavigate}
            />
          )}
          {tourCompleted && (
            <div className="fixed bottom-6 right-6 z-50 bg-white rounded-lg shadow-xl p-6 max-w-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tour Complete</h3>
              <p className="text-gray-600 mb-4">Thank you, Mr. Ahmed. You can explore the system in read-only mode.</p>
              <button
                onClick={() => {
                  onNavigate("/demo");
                  setTimeout(() => {
                    const guide = document.querySelector('[data-tour="inbound"]');
                    if (guide) {
                      guide.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }, 200);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                View Summary
              </button>
            </div>
          )}
        </>
      )}
    </DemoContext.Provider>
  );
}
