# scripts/build.ps1
$fileMap = @{
    "cursor" = "content/tool-pages/cursor-beginner-guide.md"
    "github" = "content/sops/github-download-open-with-cursor-sop.md"
    "repo" = "content/github-guides/github-repo-beginner-analysis-template.md"
    "sop_writer" = "skills/sop-writer-skill/SKILL.md"
    "tool_research" = "skills/tool-research-skill/SKILL.md"
    "github_project_reader" = "skills/github-project-reader-skill/SKILL.md"
    "mcp_helper" = "skills/mcp-helper-skill/SKILL.md"
    "prompt_optimizer" = "skills/prompt-optimizer-skill/SKILL.md"
    "error_troubleshooter" = "skills/error-troubleshooter-skill/SKILL.md"
    "ai_beginner_101" = "content/beginner-guides/ai-glossary.md"
    "gemini_sop" = "content/beginner-guides/gemini-sop.md"
    "notebooklm_sop" = "content/beginner-guides/notebooklm-sop.md"
    "ai_poster" = "content/ai-applications/ai-poster-guide.md"
    "ai_ppt" = "content/ai-applications/ai-ppt-guide.md"
    "ai_video" = "content/ai-applications/ai-video-guide.md"
    "ai_dashboard" = "content/ai-applications/ai-dashboard-guide.md"
    "ai_research" = "content/ai-applications/ai-research-guide.md"
    "ai_market_analysis" = "content/ai-applications/ai-market-analysis-guide.md"
    "claude_code" = "content/tool-pages/claude-code-guide.md"
    "trae" = "content/tool-pages/trae-guide.md"
    "codex" = "content/tool-pages/codex-guide.md"
    "workbuddy" = "content/tool-pages/workbuddy-guide.md"
    "ai_prd_guide" = "content/beginner-guides/ai-prd-guide.md"
    "risk_safety_review" = "skills/risk-safety-review-skill/SKILL.md"
    "prompt_template_skill" = "skills/prompt-template-skill/SKILL.md"
    "static_hosting_guide" = "content/deployment/static-hosting-guide.md"
    "wechat_sharing_guide" = "content/deployment/wechat-sharing-guide.md"
}

$NL = [char]10
$CRLF = [char]13 + [char]10

function Parse-Inline ($text) {
    # Escape HTML characters first
    $escaped = $text -replace '&', '&amp;' -replace '<', '&lt;' -replace '>', '&gt;'
    # Restore valid <br> tags
    $escaped = $escaped -replace '&lt;br&gt;', '<br>'
    # Replace backticks with <code>
    $escaped = [regex]::Replace($escaped, '`([^`]+)`', '<code>$1</code>')
    # Replace **bold** with <strong>
    $escaped = [regex]::Replace($escaped, '\*\*([^*]+)\*\*', '<strong>$1</strong>')
    # Replace [text](url) with <a href="url" target="_blank">text</a>
    $escaped = [regex]::Replace($escaped, '\[([^\]]+)\]\(([^)]+)\)', '<a href="$2" target="_blank">$1</a>')
    return $escaped
}

function Convert-MarkdownToHtml ($mdContent) {
    $NL = [char]10
    if ($mdContent -like '---*') {
        $parts = $mdContent -split '---'
        if ($parts.Length -ge 3) {
            $endIdx = $parts.Length - 1
            $slice = $parts[2..$endIdx]
            $mdContent = ($slice -join '---').Trim()
        }
    }

    $lines = $mdContent -split "\r?\n"
    $html = ""
    $inList = $false
    $listType = $null
    $inCode = $false
    $codeBlock = @()
    $inTable = $false
    $tableRows = @()

    foreach ($line in $lines) {
        $trimmed = $line.Trim()
        if ($trimmed.StartsWith('```')) {
            if ($inCode) {
                $inCode = $false
                $codeText = ($codeBlock -join $NL) -replace '&', '&amp;' -replace '<', '&lt;' -replace '>', '&gt;'
                $html += "<pre>" + $codeText + "</pre>" + $NL
                $codeBlock = @()
            } else {
                $inCode = $true
            }
            continue
        }

        if ($inCode) {
            $codeBlock += $line
            continue
        }

        if ($trimmed.StartsWith('|')) {
            if ($inList) {
                $html += "</" + $listType + ">" + $NL
                $inList = $false
            }
            $inTable = $true
            $tableRows += $line
            continue
        } else {
            if ($inTable) {
                $html += "<div class='table-wrap'><table>" + $NL
                $isHeader = $true
                foreach ($row in $tableRows) {
                    $rawCells = $row -split '\|'
                    if ($rawCells.Length -le 2) {
                        continue
                    }
                    $cells = $rawCells[1..($rawCells.Length-2)] | ForEach-Object { $_.Trim() }
                    if ($row -match '\-\-\-') {
                        continue
                    }
                    $html += "  <tr>"
                    foreach ($cell in $cells) {
                        $tag = if ($isHeader) { "th" } else { "td" }
                        $val = Parse-Inline $cell
                        $html += "<" + $tag + ">" + $val + "</" + $tag + ">"
                    }
                    $html += "</tr>" + $NL
                    $isHeader = $false
                }
                $html += "</table></div>" + $NL
                $inTable = $false
                $tableRows = @()
            }
        }

        if ($line.StartsWith('# ')) {
            if ($inList) { $html += "</" + $listType + ">" + $NL; $inList = $false }
            continue
        }
        if ($line.StartsWith('## ')) {
            if ($inList) { $html += "</" + $listType + ">" + $NL; $inList = $false }
            $title = $line.Substring(3).Trim()
            $val = Parse-Inline $title
            $html += "<h2>" + $val + "</h2>" + $NL
            continue
        }
        if ($line.StartsWith('### ')) {
            if ($inList) { $html += "</" + $listType + ">" + $NL; $inList = $false }
            $title = $line.Substring(4).Trim()
            $val = Parse-Inline $title
            $html += "<h3>" + $val + "</h3>" + $NL
            continue
        }

        if ($line.StartsWith('> ') -or $line.StartsWith('💡')) {
            if ($inList) { $html += "</" + $listType + ">" + $NL; $inList = $false }
            $text = if ($line.StartsWith('> ')) { $line.Substring(2).Trim() } else { $line.Trim() }
            $text = $text -replace '\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]', ''
            $val = Parse-Inline ($text.Trim())
            $html += "<div class='notice'>" + $val + "</div>" + $NL
            continue
        }

        $ulMatch = $line -match '^[\-\*]\s+(.*)'
        if ($ulMatch) {
            $val = $Matches[1]
            if (-not $inList -or $listType -ne 'ul') {
                if ($inList) { $html += "</" + $listType + ">" + $NL }
                $html += "<ul>" + $NL
                $inList = $true
                $listType = 'ul'
            }
            $val2 = Parse-Inline $val
            $html += "  <li>" + $val2 + "</li>" + $NL
            continue
        }

        $olMatch = $line -match '^\d+\.\s+(.*)'
        if ($olMatch) {
            $val = $Matches[1]
            if (-not $inList -or $listType -ne 'ol') {
                if ($inList) { $html += "</" + $listType + ">" + $NL }
                $html += "<ol>" + $NL
                $inList = $true
                $listType = 'ol'
            }
            $val2 = Parse-Inline $val
            $html += "  <li>" + $val2 + "</li>" + $NL
            continue
        }

        if ($line.Trim() -eq "") {
            continue
        }

        if ($inList) { $html += "</" + $listType + ">" + $NL; $inList = $false }
        $val = Parse-Inline ($line.Trim())
        $html += "<p>" + $val + "</p>" + $NL
    }

    if ($inList) { $html += "</" + $listType + ">" + $NL }
    return $html
}

function Parse-MarkdownFile ($filePath) {
    if (-not (Test-Path $filePath)) {
        Write-Error "File not found: $filePath"
        return $null
    }

    $content = Get-Content -Path $filePath -Raw -Encoding utf8
    $lines = $content -split "\r?\n"
    
    $title = ""
    if ($content.StartsWith('---')) {
        $parts = $content -split '---'
        if ($parts.Length -ge 2) {
            if ($parts[1] -match 'name:\s*(.*)') {
                $title = $Matches[1].Trim().Trim('"').Trim("'")
            }
        }
    }
    
    if ($title -eq "") {
        foreach ($line in $lines) {
            if ($line.StartsWith('# ')) {
                $title = $line.Substring(2).Trim()
                break
            }
        }
    }

    $prompt = ""
    $inPromptSection = $false
    for ($i = 0; $i -lt $lines.Length; $i++) {
        $line = $lines[$i]
        if ($line.StartsWith('## ') -and ($line -match 'Prompt')) {
            $inPromptSection = $true
            continue
        } elseif ($line.StartsWith('## ') -and $inPromptSection) {
            $inPromptSection = $false
        }
        
        if ($inPromptSection) {
            if ($line.StartsWith('```')) {
                $codeContent = @()
                $i++
                while ($i -lt $lines.Length -and -not $lines[$i].StartsWith('```')) {
                    $codeContent += $lines[$i]
                    $i++
                }
                $prompt = $codeContent -join [char]10
                break
            }
        }
    }

    if ($prompt -eq "") {
        for ($i = $lines.Length - 1; $i -ge 0; $i--) {
            if ($lines[$i].StartsWith('```')) {
                $codeContent = @()
                $j = $i - 1
                while ($j -ge 0 -and -not $lines[$j].StartsWith('```')) {
                    $codeContent = @($lines[$j]) + $codeContent
                    $j--
                }
                if ($codeContent.Length -gt 0) {
                    $prompt = $codeContent -join [char]10
                    break
                }
                $i = $j
            }
        }
    }

    if ($prompt -eq "") {
        $prompt = "Please explain this project structure."
    }

    $toc = @()
    foreach ($line in $lines) {
        if ($line.StartsWith('## ')) {
            $heading = $line.Substring(3).Trim()
            if ($heading -notmatch '---') {
                $toc += $heading
            }
        }
    }

    $html = Convert-MarkdownToHtml $content

    $result = [PSCustomObject]@{
        title = $title
        prompt = $prompt
        toc = $toc
        html = $html
    }
    return $result
}

Write-Host "Starting content compilation in Powershell..."
$compiledContent = @{}

foreach ($key in $fileMap.Keys) {
    $relativePath = $fileMap[$key]
    Write-Host "Parsing [$key] from $relativePath..."
    $data = Parse-MarkdownFile $relativePath
    if ($data -ne $null) {
        $compiledContent[$key] = $data
    }
}

$jsonContent = $compiledContent | ConvertTo-Json -Depth 10

$htmlPath = "prototype/index.html"
$htmlContent = Get-Content -Path $htmlPath -Raw -Encoding utf8

$startMarker = '// <!-- BUILD_CONTENT_START -->'
$endMarker = '// <!-- BUILD_CONTENT_END -->'

$startIndex = $htmlContent.IndexOf($startMarker)
$endIndex = $htmlContent.IndexOf($endMarker)

if ($startIndex -eq -1 -or $endIndex -eq -1) {
    Write-Error "Error: Markers for content build not found in prototype/index.html"
    exit 1
}

$CRLF = [char]13 + [char]10
$contentStr = "const content = $jsonContent;"
$newHtmlContent = $htmlContent.Substring(0, $startIndex + $startMarker.Length) + $CRLF + "    " + $contentStr + $CRLF + "    " + $htmlContent.Substring($endIndex)

[System.IO.File]::WriteAllText((Resolve-Path $htmlPath), $newHtmlContent, [System.Text.Encoding]::UTF8)
Write-Host "Build completed successfully via Powershell!"
