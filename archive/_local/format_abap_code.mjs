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

let totalModified = 0;

for (const file of files) {
  const filePath = path.join(contentDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  let originalHtml = html;

  html = html.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (match, preContent) => {
    const codeMatch = preContent.match(/<code[^>]*>([\s\S]*?)<\/code>/i);
    if (!codeMatch) return match;
    
    let codeContent = codeMatch[1];
    
    // 이전 span 모두 초기화
    let pureCode = codeContent.replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '');
    pureCode = pureCode.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    
    // ABAP 하이라이트 적용
    const highlighted = highlightABAP(pureCode);
    
    // 밝은 배경 적용
    return `<pre class="shiki shiki-copy-wrapper" style="background-color: #f6f8fa; border: 1px solid #e1e4e8; color: #333333; padding: 12px; border-radius: 6px; overflow-x: auto; font-family: Consolas, Monaco, 'Courier New', monospace; font-size: 14px; line-height: 1.5;"><code>${highlighted}</code><button class="shiki-copy-button" data-copied="false">Copy</button></pre>`;
  });

  if (html !== originalHtml) {
    fs.writeFileSync(filePath, html, 'utf-8');
    totalModified++;
    console.log(`Updated: ${file}`);
  }
}

console.log(`\n완료: 총 ${files.length}개 파일 중 ${totalModified}개 파일의 코드 블록 서식 수정됨.`);
