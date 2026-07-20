# Repair Hermes Agent on Windows after a failed/partial update.
# Safe: keeps %LOCALAPPDATA%\hermes config, .env, sessions, memories, skills.
#
# Usage (PowerShell):
#   .\scripts\repair-hermes.ps1
#   # or:
#   irm https://raw.githubusercontent.com/...  # if published
#
# Quick one-liner for the certifi crash:
#   & "$env:LOCALAPPDATA\hermes\hermes-agent\venv\Scripts\python.exe" -m pip install --force-reinstall certifi requests

$ErrorActionPreference = "Stop"

$HermesHome = if ($env:HERMES_HOME) { $env:HERMES_HOME } else { Join-Path $env:LOCALAPPDATA "hermes" }
$AgentDir = Join-Path $HermesHome "hermes-agent"
$VenvPython = Join-Path $AgentDir "venv\Scripts\python.exe"
$VenvPip = Join-Path $AgentDir "venv\Scripts\pip.exe"
$HermesExe = Join-Path $AgentDir "venv\Scripts\hermes.exe"

Write-Host "==> Hermes Windows repair starting"
Write-Host "    HERMES_HOME=$HermesHome"
Write-Host "    AGENT_DIR=$AgentDir"

function Test-HermesProcess {
  Get-Process -Name "hermes" -ErrorAction SilentlyContinue
}

$running = Test-HermesProcess
if ($running) {
  Write-Host "==> Stop Hermes Desktop / hermes.exe first (Windows locks venv files while running)."
  Write-Host "    Running PIDs: $($running.Id -join ', ')"
  Write-Host "    Close Hermes Desktop, then re-run this script."
  Write-Host "    Or: Stop-Process -Name hermes -Force"
  exit 1
}

if (-not (Test-Path $AgentDir)) {
  Write-Host "==> Hermes agent directory not found at $AgentDir"
  Write-Host "    Reinstall with the official Windows installer, or:"
  Write-Host '    iex (irm https://hermes-agent.nousresearch.com/install.ps1)'
  exit 1
}

Push-Location $AgentDir
try {
  Write-Host "==> Checking whether certifi/requests import works"
  $check = & $VenvPython -c "import certifi, requests; print(certifi.where())" 2>&1
  if ($LASTEXITCODE -ne 0) {
    Write-Host "==> Broken venv detected (missing certifi or requests)"
    Write-Host "    Reinstalling Python dependencies into the existing venv..."

    # Prefer uv if Hermes shipped it; otherwise use venv pip.
    $UvCandidates = @(
      (Join-Path $HermesHome "bin\uv.exe"),
      (Join-Path $HermesHome "uv.exe"),
      "uv"
    )
    $Uv = $UvCandidates | Where-Object {
      if ($_ -eq "uv") { Get-Command uv -ErrorAction SilentlyContinue } else { Test-Path $_ }
    } | Select-Object -First 1

    if ($Uv) {
      Write-Host "    Using uv: $Uv"
      $env:VIRTUAL_ENV = Join-Path $AgentDir "venv"
      & $Uv pip install --python $VenvPython -e ".[all]"
    } else {
      Write-Host "    Using pip"
      & $VenvPython -m pip install --upgrade pip
      & $VenvPython -m pip install --force-reinstall certifi
      & $VenvPython -m pip install -e ".[all]"
    }

    Write-Host "==> Re-checking imports"
    & $VenvPython -c "import certifi, requests, hermes_cli; print('OK', certifi.where())"
    if ($LASTEXITCODE -ne 0) {
      throw "Dependencies still broken after reinstall"
    }
  } else {
    Write-Host "    venv OK: $check"
  }

  if (Test-Path $HermesExe) {
    Write-Host "==> Running hermes doctor --fix"
    & $HermesExe doctor --fix
  }
}
finally {
  Pop-Location
}

Write-Host ""
Write-Host "==> Repair complete"
if (Test-Path $HermesExe) {
  & $HermesExe version
}
Write-Host ""
Write-Host "Next:"
Write-Host "  hermes chat"
Write-Host "  hermes setup     # if chat asks for an API key"
Write-Host "  hermes doctor"
