# UkrMadera - corrige flechas Unicode para evitar que iOS las renderice como emoji.
# Ejecutar desde la raiz del proyecto: powershell -ExecutionPolicy Bypass -File .\fix-arrows.ps1

$src = Join-Path (Get-Location) "src"
if (-not (Test-Path $src)) {
    Write-Error "No encuentro la carpeta src. Ejecuta este script desde la raiz del proyecto UkrMadera."
    exit 1
}

$replacements = @{
    "↗" = "↗︎"  # U+2197 + U+FE0E: presentacion de texto
    "↘" = "↘︎"  # U+2198 + U+FE0E
    "→" = "→︎"  # U+2192 + U+FE0E
    "←" = "←︎"  # U+2190 + U+FE0E
}

$files = Get-ChildItem -Path $src -Recurse -File -Include *.tsx,*.ts,*.jsx,*.js
$changed = @()

foreach ($file in $files) {
    $content = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8
    $original = $content

    foreach ($key in $replacements.Keys) {
        # Evita duplicar FE0E si el script se ejecuta mas de una vez.
        $plain = [regex]::Escape($key) + "(?!`u{FE0E})"
        $content = [regex]::Replace($content, $plain, $replacements[$key])
    }

    if ($content -ne $original) {
        Set-Content -LiteralPath $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $changed += $file.FullName.Replace((Get-Location).Path + "\", "")
    }
}

Write-Host ""
Write-Host "Flechas corregidas para presentacion de texto en iOS." -ForegroundColor Green
if ($changed.Count -eq 0) {
    Write-Host "No habia archivos pendientes de corregir."
} else {
    Write-Host "Archivos modificados:"
    $changed | ForEach-Object { Write-Host " - $_" }
}
Write-Host ""
Write-Host "Ahora ejecuta: npm run build"
