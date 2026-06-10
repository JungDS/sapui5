import fs from 'fs';
import path from 'path';

const contentDir = path.resolve('docs/abap/lesson-content');
const filePattern = /^THEORY-\d{2}-M\d{2}\.html$/;

const files = fs.readdirSync(contentDir).filter(file => filePattern.test(file));

function highlightABAP(code) {
  const keywords = [
    "DATA", "TYPE", "TYPES", "TABLE", "OF", "WRITE", "SELECT", "FROM", "WHERE", "INTO", 
    "APPEND", "INSERT", "READ", "MODIFY", "DELETE", "LOOP", "AT", "ENDLOOP", "IF", "ELSE", 
    "ELSEIF", "ENDIF", "CASE", "WHEN", "ENDCASE", "DO", "WHILE", "ENDDO", "ENDWHILE", 
    "REPORT", "PARAMETERS", "SELECT-OPTIONS", "FORM", "ENDFORM", "USING", "CHANGING", 
    "CALL", "FUNCTION", "EXPORTING", "IMPORTING", "TABLES", "EXCEPTIONS", "CLASS", "ENDCLASS", 
    "METHODS", "PUBLIC", "PRIVATE", "PROTECTED", "SECTION", "INITIALIZATION", 
    "START-OF-SELECTION", "END-OF-SELECTION", "SELECTION-SCREEN", "MODULE", "ENDMODULE", 
    "CONSTANTS", "VALUE", "IS", "NOT", "INITIAL", "CLEAR", "REFRESH", "FREE", "SORT", 
    "BY", "ASCENDING", "DESCENDING", "WITH", "KEY", "BINARY", "SEARCH", "FIELD-SYMBOLS", 
    "ASSIGNING", "ASSIGN", "TO", "UNASSIGN", "CREATE", "OBJECT", "REF", "SIGN", "OPTION", 
    "LOW", "HIGH", "INCLUDE", "EXCLUDE", "LIKE", "BEGIN", "END"
  ];

  keywords.sort((a, b) => b.length - a.length);

  const keywordRegex = new RegExp(`(^|[^a-zA-Z0-9_])(${keywords.join('|')})(?=[^a-zA-Z0-9_]|$)`, 'gi');

  const lines = code.split('\n');
  const highlightedLines = lines.map(line => {
    let comment = '';
    let codePart = line;
    
    // 전체 줄 주석 처리
    if (/^\s*\*/.test(line)) {
      line = line.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<span style="color: #888888; font-style: italic;">${line}</span>`;
    }
    
    // 인라인 주석 처리
    const quoteIndex = line.indexOf('"');
    if (quoteIndex !== -1) {
      codePart = line.substring(0, quoteIndex);
      comment = line.substring(quoteIndex);
      comment = comment.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    
    // 코드 HTML 특수문자 인코딩
    codePart = codePart.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // 문자열 리터럴 보호
    const strings = [];
    codePart = codePart.replace(/'([^']*)'/g, (m) => {
      strings.push(`<span style="color: #22863a;">${m}</span>`);
      return `STRMARKER${strings.length - 1}ENDMARKER`;
    });
    
    // 키워드 하이라이팅
    codePart = codePart.replace(keywordRegex, (match, p1, p2) => {
      return `${p1}<span style="color: #005cc5; font-weight: bold;">${p2}</span>`;
    });
    
    // 숫자 하이라이팅
    codePart = codePart.replace(/\b(\d+)\b/g, '<span style="color: #22863a;">$1</span>');
    
    // 문자열 복원
    strings.forEach((str, idx) => {
      codePart = codePart.replace(`STRMARKER${idx}ENDMARKER`, str);
    });
    
    // 주석 덧붙이기
    if (comment) {
      codePart += `<span style="color: #888888; font-style: italic;">${comment}</span>`;
    }
    
    return codePart;
  });
  
  return highlightedLines.join('\n');
}

function generateNavyEditor(rawCode) {
  // Remove leading/trailing blank lines securely
  let cleanCode = rawCode.replace(/^\s*[\r\n]/g, '').replace(/[\r\n]\s*$/g, '');
  
  const highlighted = highlightABAP(cleanCode);
  const lines = cleanCode.split('\n');
  const lineNumbersHtml = lines.map((_, i) => i + 1).join('<br>');
  
  return `<!-- ABAP_MOCKUP_START -->
<div class="abap-editor-mockup shiki-copy-wrapper" style="background-color: #f6f8fa; border: 1px solid #d0d0d0; border-radius: 8px; overflow: hidden; margin: 16px 0; font-family: 'D2Coding', Consolas, Monaco, 'Courier New', monospace; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
  <div class="abap-editor-header" style="background-color: #343e6a; padding: 8px 12px; display: flex; align-items: center;">
    <div style="display: flex; gap: 6px;">
      <span style="width: 12px; height: 12px; background-color: #ff5f56; border-radius: 50%; display: inline-block;"></span>
      <span style="width: 12px; height: 12px; background-color: #ffbd2e; border-radius: 50%; display: inline-block;"></span>
      <span style="width: 12px; height: 12px; background-color: #27c93f; border-radius: 50%; display: inline-block;"></span>
    </div>
    <div style="margin-left: auto; color: #ffa03b; font-weight: bold; font-size: 12px; letter-spacing: 1px;">ABAP</div>
    <div style="margin-left: 16px;">
      <button class="shiki-copy-button" data-copied="false" style="background-color: transparent; border: 1px solid rgba(255,255,255,0.4); border-radius: 4px; padding: 2px 8px; font-size: 12px; cursor: pointer; color: rgba(255,255,255,0.8); transition: all 0.2s;">Copy</button>
    </div>
  </div>
  <div class="abap-editor-body" style="display: flex; background-color: #f6f8fa;">
    <div class="line-numbers" style="background-color: #f0f0e1; color: #888; padding: 12px 8px; text-align: right; border-right: 1px solid #d0d0d0; user-select: none; min-width: 32px; line-height: 1.5;">
      ${lineNumbersHtml}
    </div>
    <pre class="shiki" style="background-color: transparent; color: #333333; padding: 12px; margin: 0; border: none; overflow-x: auto; font-family: 'D2Coding', Consolas, Monaco, 'Courier New', monospace; font-size: 14px; line-height: 1.5; width: 100%;"><code>${highlighted}</code></pre>
  </div>
</div>
<!-- ABAP_MOCKUP_END -->`;
}

let totalModified = 0;

for (const file of files) {
  const filePath = path.join(contentDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  let originalHtml = html;

  // 1. Un-wrap existing Navy Mockups back to raw <pre><code>
  html = html.replace(/<!-- ABAP_MOCKUP_START -->[\s\S]*?<!-- ABAP_MOCKUP_END -->/gi, (match) => {
    const codeMatch = match.match(/<code[^>]*>([\s\S]*?)<\/code>/i);
    if (!codeMatch) return match;
    let codeContent = codeMatch[1].replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '');
    codeContent = codeContent.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    return `<pre><code>${codeContent}</code></pre>`;
  });

  // 2. Process ALL <pre> blocks (both un-wrapped ones and any plain ones like THEORY-19~21)
  html = html.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (match, preContent) => {
    // If it's already an ABAP_MOCKUP_START block (shouldn't happen because we un-wrapped, but just in case)
    if (match.includes('ABAP_MOCKUP_START')) return match;

    const codeMatch = preContent.match(/<code[^>]*>([\s\S]*?)<\/code>/i);
    if (!codeMatch) return match;
    
    let codeContent = codeMatch[1];
    
    // Strip spans (highlighting)
    let pureCode = codeContent.replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '');
    
    // Strip buttons (in case it had a trailing copy button from a bad previous run)
    pureCode = pureCode.replace(/<button[^>]*>[\s\S]*?<\/button>/gi, '');
    
    // Unescape HTML entities to get raw ABAP code
    pureCode = pureCode.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    
    // Generate the full Navy Editor Mockup
    return generateNavyEditor(pureCode);
  });

  if (html !== originalHtml) {
    fs.writeFileSync(filePath, html, 'utf-8');
    totalModified++;
    console.log(`Updated: ${file}`);
  }
}

console.log(`\n완료: 총 ${files.length}개 파일 중 ${totalModified}개 파일의 코드 블록 서식 수정됨.`);
