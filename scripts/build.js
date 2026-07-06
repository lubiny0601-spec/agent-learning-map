import fs from 'fs';
import path from 'path';

const fileMap = {
  cursor: 'content/tool-pages/cursor-beginner-guide.md',
  github: 'content/sops/github-download-open-with-cursor-sop.md',
  repo: 'content/github-guides/github-repo-beginner-analysis-template.md',
  sop_writer: 'skills/sop-writer-skill/SKILL.md',
  tool_research: 'skills/tool-research-skill/SKILL.md',
  github_project_reader: 'skills/github-project-reader-skill/SKILL.md',
  mcp_helper: 'skills/mcp-helper-skill/SKILL.md',
  prompt_optimizer: 'skills/prompt-optimizer-skill/SKILL.md',
  error_troubleshooter: 'skills/error-troubleshooter-skill/SKILL.md',
  ai_beginner_101: 'content/beginner-guides/ai-glossary.md',
  gemini_sop: 'content/beginner-guides/gemini-sop.md',
  notebooklm_sop: 'content/beginner-guides/notebooklm-sop.md',
  ai_poster: 'content/ai-applications/ai-poster-guide.md',
  ai_ppt: 'content/ai-applications/ai-ppt-guide.md',
  ai_video: 'content/ai-applications/ai-video-guide.md',
  ai_dashboard: 'content/ai-applications/ai-dashboard-guide.md',
  ai_research: 'content/ai-applications/ai-research-guide.md',
  ai_market_analysis: 'content/ai-applications/ai-market-analysis-guide.md',
  claude_code: 'content/tool-pages/claude-code-guide.md',
  trae: 'content/tool-pages/trae-guide.md',
  codex: 'content/tool-pages/codex-guide.md',
  workbuddy: 'content/tool-pages/workbuddy-guide.md',
  ai_prd_guide: 'content/beginner-guides/ai-prd-guide.md',
  risk_safety_review: 'skills/risk-safety-review-skill/SKILL.md',
  prompt_template_skill: 'skills/prompt-template-skill/SKILL.md',
  static_hosting_guide: 'content/deployment/static-hosting-guide.md',
  wechat_sharing_guide: 'content/deployment/wechat-sharing-guide.md'
};

function mdToHtml(md) {
  // Strip YAML frontmatter
  let cleanMd = md;
  if (md.trim().startsWith('---')) {
    const parts = md.split('---');
    if (parts.length >= 3) {
      cleanMd = parts.slice(2).join('---').trim();
    }
  }

  const lines = cleanMd.split(/\r?\n/);
  let html = '';
  let inList = false;
  let listType = null; // 'ul' or 'ol'
  let inCode = false;
  let codeBlock = [];
  let inTable = false;
  let tableRows = [];

  const closeList = () => {
    if (inList) {
      html += `</${listType}>\n`;
      inList = false;
      listType = null;
    }
  };

  const closeTable = () => {
    if (inTable) {
      html += '<div class="table-wrap"><table>\n';
      tableRows.forEach((row, index) => {
        const cells = row.split('|').map(c => c.trim()).filter((c, i, arr) => i > 0 && i < arr.length - 1);
        if (cells.length === 0) return;
        if (row.includes('---') && index === 1) return; // separator row
        
        html += '  <tr>';
        cells.forEach(cell => {
          const tag = (index === 0 || (index === 1 && tableRows[0].includes('---'))) ? 'th' : 'td';
          html += `<${tag}>${parseInline(cell)}</${tag}>`;
        });
        html += '</tr>\n';
      });
      html += '</table></div>\n';
      inTable = false;
      tableRows = [];
    }
  };

  const parseInline = (text) => {
    // Handle inline code: `code`
    text = text.replace(/`([^`]+)`/g, (match, code) => {
      const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<code>${escaped}</code>`;
    });
    return text;
  };

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Code block
    if (line.trim().startsWith('```')) {
      if (inCode) {
        inCode = false;
        const codeText = codeBlock.join('\n')
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        html += `<pre>${codeText}</pre>\n`;
        codeBlock = [];
      } else {
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeBlock.push(line);
      continue;
    }

    // Table
    if (line.trim().startsWith('|')) {
      closeList();
      inTable = true;
      tableRows.push(line);
      continue;
    } else {
      closeTable();
    }

    // Headers
    if (line.startsWith('# ')) {
      closeList();
      continue; // Skip main h1 since we display it dynamically in the reader header
    }
    if (line.startsWith('## ')) {
      closeList();
      const title = line.substring(3).trim();
      html += `<h2>${parseInline(title)}</h2>\n`;
      continue;
    }
    if (line.startsWith('### ')) {
      closeList();
      const title = line.substring(4).trim();
      html += `<h3>${parseInline(title)}</h3>\n`;
      continue;
    }

    // Blockquotes / Warnings / Tips
    if (line.startsWith('> ') || line.startsWith('💡')) {
      closeList();
      let text = line.startsWith('> ') ? line.substring(2).trim() : line.trim();
      text = text.replace(/\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/gi, '').trim();
      html += `<div class="notice">${parseInline(text)}</div>\n`;
      continue;
    }

    // Lists
    const ulMatch = line.match(/^[\-\*]\s+(.*)/);
    const olMatch = line.match(/^\d+\.\s+(.*)/);

    if (ulMatch) {
      if (!inList || listType !== 'ul') {
        closeList();
        html += '<ul>\n';
        inList = true;
        listType = 'ul';
      }
      html += `  <li>${parseInline(ulMatch[1])}</li>\n`;
      continue;
    }

    if (olMatch) {
      if (!inList || listType !== 'ol') {
        closeList();
        html += '<ol>\n';
        inList = true;
        listType = 'ol';
      }
      html += `  <li>${parseInline(olMatch[1])}</li>\n`;
      continue;
    }

    // Blank line
    if (line.trim() === '') {
      continue;
    }

    // Regular paragraph
    closeList();
    html += `<p>${parseInline(line.trim())}</p>\n`;
  }

  closeList();
  closeTable();
  return html;
}

function parseMarkdownFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/);
  
  // Extract Title
  let title = '';
  // Check YAML title first
  let yamlTitle = '';
  if (content.trim().startsWith('---')) {
    const yamlPart = content.split('---')[1];
    const titleMatch = yamlPart.match(/name:\s*["']?([^"'\r\n]+)["']?/);
    if (titleMatch) yamlTitle = titleMatch[1];
  }

  for (let line of lines) {
    if (line.startsWith('# ')) {
      title = line.substring(2).trim();
      break;
    }
  }
  if (!title && yamlTitle) {
    title = yamlTitle;
  }

  // Extract Prompt
  let prompt = '';
  let inPromptSection = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('## ') && (line.includes('Prompt') || line.includes('模板') || line.includes('指令'))) {
      inPromptSection = true;
      continue;
    } else if (line.startsWith('## ') && inPromptSection) {
      inPromptSection = false;
    }
    
    if (inPromptSection) {
      if (line.startsWith('```')) {
        let codeContent = [];
        i++;
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeContent.push(lines[i]);
          i++;
        }
        prompt = codeContent.join('\n');
        break;
      }
    }
  }

  if (!prompt) {
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].startsWith('```')) {
        let codeContent = [];
        let j = i - 1;
        while (j >= 0 && !lines[j].startsWith('```')) {
          codeContent.unshift(lines[j]);
          j--;
        }
        if (codeContent.length > 0) {
          prompt = codeContent.join('\n');
          break;
        }
        i = j;
      }
    }
  }

  if (!prompt) {
    prompt = '请根据项目结构解释当前代码。';
  }

  // Extract TOC
  const toc = [];
  lines.forEach(line => {
    if (line.startsWith('## ')) {
      const heading = line.substring(3).trim();
      if (!heading.includes('---')) {
        toc.push(heading);
      }
    }
  });

  const html = mdToHtml(content);

  return {
    title,
    prompt,
    toc,
    html
  };
}

function build() {
  console.log('Starting content compilation...');
  const compiledContent = {};

  for (const [key, relativePath] of Object.entries(fileMap)) {
    const fullPath = path.resolve(relativePath);
    console.log(`Parsing [${key}] from ${relativePath}...`);
    const data = parseMarkdownFile(fullPath);
    if (data) {
      compiledContent[key] = data;
    }
  }

  const htmlPath = path.resolve('prototype/index.html');
  let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

  const startMarker = '// <!-- BUILD_CONTENT_START -->';
  const endMarker = '// <!-- BUILD_CONTENT_END -->';

  const startIndex = htmlContent.indexOf(startMarker);
  const endIndex = htmlContent.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1) {
    console.error('Error: Markers for content build not found in prototype/index.html');
    process.exit(1);
  }

  const contentStr = `const content = ${JSON.stringify(compiledContent, null, 2)};`;
  const newHtmlContent = htmlContent.substring(0, startIndex + startMarker.length) +
    '\n    ' + contentStr + '\n    ' +
    htmlContent.substring(endIndex);

  fs.writeFileSync(htmlPath, newHtmlContent, 'utf-8');
  console.log('Build completed successfully! Content synchronized in prototype/index.html');
}

build();
