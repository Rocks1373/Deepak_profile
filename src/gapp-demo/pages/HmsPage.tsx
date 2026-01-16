/**
 * HMS (Huawei Matching System) Page
 * Upload files and run matching process
 */

import { useState, useEffect } from "react";

// Demo mode - no API calls needed
const API_BASE = "http://localhost:4000/api";

type HmsRunStatus = "QUEUED" | "RUNNING" | "DONE" | "FAILED";

type HmsStatusResponse = {
  status: HmsRunStatus;
  startedAt: string | null;
  finishedAt: string | null;
  exitCode: number | null;
  outputsAvailable: string[];
  lastLogLines: string[];
};

function HmsPage() {
  const [runId, setRunId] = useState<number | null>(null);
  const [runName, setRunName] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<HmsRunStatus | null>(null);
  const [statusData, setStatusData] = useState<HmsStatusResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // File refs
  const [summaryFile, setSummaryFile] = useState<File | null>(null);
  const [poFile, setPoFile] = useState<File | null>(null);
  const [soFile, setSoFile] = useState<File | null>(null);
  const [vcustFile, setVcustFile] = useState<File | null>(null);
  const [contractsFile, setContractsFile] = useState<File | null>(null);
  const [accessoriesFile, setAccessoriesFile] = useState<File | null>(null);
  const [referenceFile, setReferenceFile] = useState<File | null>(null);
  const [dnFiles, setDnFiles] = useState<File[]>([]);

  // Poll status when run is active
  useEffect(() => {
    if (!runId || (status === "DONE" || status === "FAILED")) {
      return;
    }

    const interval = setInterval(async () => {
      // Demo mode - simulate status updates
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        // Mock status progression
        if (status === "QUEUED") {
          setStatus("RUNNING");
          setStatusData({
            status: "RUNNING",
            startedAt: new Date().toISOString(),
            finishedAt: null,
            exitCode: null,
            outputsAvailable: [],
            lastLogLines: ["Processing files...", "Matching orders..."]
          });
        } else if (status === "RUNNING") {
          setStatus("DONE");
          setStatusData({
            status: "DONE",
            startedAt: new Date(Date.now() - 5000).toISOString(),
            finishedAt: new Date().toISOString(),
            exitCode: 0,
            outputsAvailable: ["matching_report.xlsx", "summary.json"],
            lastLogLines: ["Processing complete", "Report generated"]
          });
        }
      } catch (error) {
        console.error("Failed to fetch status:", error);
      }
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(interval);
  }, [runId, status]);

  const handleFileChange = (setter: (file: File | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleDnFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setDnFiles(files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate required files
    if (!summaryFile || !poFile || !soFile || !vcustFile || !contractsFile || !accessoriesFile) {
      setError("Please upload all required files");
      setIsSubmitting(false);
      return;
    }

    if (dnFiles.length === 0) {
      setError("Please upload at least one DN file");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("summary", summaryFile);
      formData.append("po", poFile);
      formData.append("so", soFile);
      formData.append("vcust", vcustFile);
      formData.append("contracts", contractsFile);
      formData.append("accessories", accessoriesFile);
      if (referenceFile) {
        formData.append("reference", referenceFile);
      }
      if (runName) {
        formData.append("run_name", runName);
      }
      if (notes) {
        formData.append("notes", notes);
      }

      // Append DN files
      dnFiles.forEach((file) => {
        formData.append("dnFiles", file);
      });

      // Demo mode - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      const mockRunId = Math.floor(Math.random() * 1000) + 1;
      setRunId(mockRunId);
      setStatus("QUEUED");
      setStatusData({
        status: "QUEUED",
        startedAt: null,
        finishedAt: null,
        exitCode: null,
        outputsAvailable: [],
        lastLogLines: ["Run queued successfully"]
      });
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to start HMS run");
      console.error("Error submitting HMS run:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setRunId(null);
    setRunName("");
    setNotes("");
    setStatus(null);
    setStatusData(null);
    setError(null);
    setSummaryFile(null);
    setPoFile(null);
    setSoFile(null);
    setVcustFile(null);
    setContractsFile(null);
    setAccessoriesFile(null);
    setReferenceFile(null);
    setDnFiles([]);
  };

  const handleDownload = (filename: string) => {
    if (!runId) return;
    window.open(`${API_BASE}/hms/run/${runId}/download/${filename}`, "_blank");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>HMS - Huawei Matching System</h1>

      {!runId ? (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h2>Upload Files</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Summary Excel (INPUT.xlsx) *
                </label>
                <input type="file" accept=".xlsx" onChange={handleFileChange(setSummaryFile)} required />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  PO Excel (PO.xlsx) *
                </label>
                <input type="file" accept=".xlsx" onChange={handleFileChange(setPoFile)} required />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  SO Excel (SO.xlsx) *
                </label>
                <input type="file" accept=".xlsx" onChange={handleFileChange(setSoFile)} required />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  VCUST Excel (VCUST.xlsx) *
                </label>
                <input type="file" accept=".xlsx" onChange={handleFileChange(setVcustFile)} required />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Contracts Excel (CONRACTS.xlsx) *
                </label>
                <input type="file" accept=".xlsx" onChange={handleFileChange(setContractsFile)} required />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Accessories Excel (ASS.xlsx) *
                </label>
                <input type="file" accept=".xlsx" onChange={handleFileChange(setAccessoriesFile)} required />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Reference Output (OUTPUT_generated.xlsx) - Optional
                </label>
                <input type="file" accept=".xlsx" onChange={handleFileChange(setReferenceFile)} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  DN Folder (DSA/) - Select multiple .xlsx files *
                </label>
                <input
                  type="file"
                  accept=".xlsx"
                  multiple
                  onChange={handleDnFolderChange}
                  required
                  style={{ width: "100%" }}
                />
                {dnFiles.length > 0 && (
                  <div style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
                    {dnFiles.length} file(s) selected
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <h2>Run Information</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Run Name (optional)
                </label>
                <input
                  type="text"
                  value={runName}
                  onChange={(e) => setRunName(e.target.value)}
                  placeholder="e.g., Batch-2024-01"
                  style={{ width: "100%", padding: "0.5rem" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional notes about this run"
                  style={{ width: "100%", padding: "0.5rem", minHeight: "80px" }}
                />
              </div>
            </div>
          </div>

          {error && (
            <div style={{ padding: "1rem", backgroundColor: "#fee", color: "#c00", borderRadius: "4px" }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button type="submit" disabled={isSubmitting} style={{ padding: "0.75rem 1.5rem", fontSize: "1rem" }}>
              {isSubmitting ? "Starting..." : "Run Matching"}
            </button>
            <button type="button" onClick={handleReset} style={{ padding: "0.75rem 1.5rem", fontSize: "1rem" }}>
              Reset
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div style={{ marginBottom: "1rem" }}>
            <h2>Run ID: {runId}</h2>
            {runName && <p>Run Name: {runName}</p>}
          </div>

          <div style={{ marginBottom: "1rem", padding: "1rem", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <strong>Status:</strong>
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  borderRadius: "4px",
                  backgroundColor:
                    status === "DONE"
                      ? "#4caf50"
                      : status === "FAILED"
                        ? "#f44336"
                        : status === "RUNNING"
                          ? "#2196f3"
                          : "#ff9800",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {status}
              </span>
            </div>
            {statusData?.startedAt && (
              <div style={{ marginTop: "0.5rem" }}>
                <strong>Started:</strong> {new Date(statusData.startedAt).toLocaleString()}
              </div>
            )}
            {statusData?.finishedAt && (
              <div style={{ marginTop: "0.5rem" }}>
                <strong>Finished:</strong> {new Date(statusData.finishedAt).toLocaleString()}
              </div>
            )}
            {statusData?.exitCode !== null && (
              <div style={{ marginTop: "0.5rem" }}>
                <strong>Exit Code:</strong> {statusData.exitCode}
              </div>
            )}
          </div>

          {statusData && statusData.lastLogLines.length > 0 && (
            <div style={{ marginBottom: "1rem" }}>
              <h3>Log Output (last 50 lines)</h3>
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#1e1e1e",
                  color: "#d4d4d4",
                  borderRadius: "4px",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                {statusData.lastLogLines.map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </div>
          )}

          {status === "DONE" && statusData && statusData.outputsAvailable.length > 0 && (
            <div>
              <h3>Download Outputs</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {statusData.outputsAvailable.map((filename) => (
                  <button
                    key={filename}
                    onClick={() => handleDownload(filename)}
                    style={{
                      padding: "0.5rem 1rem",
                      textAlign: "left",
                      backgroundColor: "#2196f3",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Download {filename}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: "2rem" }}>
            <button onClick={handleReset} style={{ padding: "0.75rem 1.5rem", fontSize: "1rem" }}>
              Start New Run
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HmsPage;
