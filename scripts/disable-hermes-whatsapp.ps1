# Disable Hermes WhatsApp (Baileys + Cloud) without wiping other config.
# Windows PowerShell:
#   powershell -ExecutionPolicy Bypass -File .\scripts\disable-hermes-whatsapp.ps1

$ErrorActionPreference = "Stop"

$HermesHome = if ($env:HERMES_HOME) { $env:HERMES_HOME } else { Join-Path $env:LOCALAPPDATA "hermes" }
$EnvFile = Join-Path $HermesHome ".env"
$HermesExe = Join-Path $HermesHome "hermes-agent\venv\Scripts\hermes.exe"

Write-Host "==> Disabling WhatsApp in Hermes"
Write-Host "    HERMES_HOME=$HermesHome"

if (-not (Test-Path $EnvFile)) {
  New-Item -ItemType File -Path $EnvFile -Force | Out-Null
}

$content = Get-Content -Raw -Path $EnvFile -ErrorAction SilentlyContinue
if ($null -eq $content) { $content = "" }

function Set-EnvKey([string]$text, [string]$key, [string]$value) {
  $pattern = "(?m)^\s*#?\s*$([regex]::Escape($key))\s*=.*$"
  $line = "$key=$value"
  if ($text -match $pattern) {
    return [regex]::Replace($text, $pattern, $line)
  }
  if ($text.Length -gt 0 -and -not $text.EndsWith("`n")) {
    $text += "`r`n"
  }
  return $text + $line + "`r`n"
}

$content = Set-EnvKey $content "WHATSAPP_ENABLED" "false"
$content = Set-EnvKey $content "WHATSAPP_CLOUD_ENABLED" "false"
Set-Content -Path $EnvFile -Value $content -NoNewline
Write-Host "    Set WHATSAPP_ENABLED=false"
Write-Host "    Set WHATSAPP_CLOUD_ENABLED=false"

# Stop gateway so WhatsApp bridge dies immediately
if (Test-Path $HermesExe) {
  Write-Host "==> Stopping Hermes gateway (if running)"
  & $HermesExe gateway stop 2>$null
  & $HermesExe gateway status 2>$null
} elseif (Get-Command hermes -ErrorAction SilentlyContinue) {
  hermes gateway stop 2>$null
  hermes gateway status 2>$null
}

# Also kill any leftover WhatsApp bridge / hermes node helpers if stuck
Get-Process -Name "hermes","node" -ErrorAction SilentlyContinue |
  Where-Object { $_.Path -like "*hermes*" -or $_.CommandLine -like "*whatsapp*" } |
  ForEach-Object {
    Write-Host "    Stopping process $($_.Id) ($($_.ProcessName))"
    Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
  }

Write-Host ""
Write-Host "==> WhatsApp stopped/disabled"
Write-Host "    To re-enable later: hermes whatsapp"
Write-Host "    Then: hermes gateway restart"
