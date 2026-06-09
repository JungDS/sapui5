import fs from 'fs';
import path from 'path';

const contentDir = path.resolve('docs/abap/lesson-content');

// THEORY-01 부터 THEORY-10 까지 읽어올 정규식
const filePattern = /^THEORY-(0[1-9]|10)-M\d{2}\.html$/;

const files = fs.readdirSync(contentDir).filter(file => filePattern.test(file));

let totalModified = 0;

for (const file of files) {
  const filePath = path.join(contentDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  let originalHtml = html;

  // 1. Text Node 치환 (HTML 태그 외부의 텍스트만 처리)
  // />([^<]+)</g 매치를 사용하면 태그 사이의 텍스트를 잡을 수 있습니다.
  html = html.replace(/>([^<]+)</g, (match, text) => {
    let replaced = text;
    
    // THEORY-01-M02 -> Chapter 1, Lesson 2
    replaced = replaced.replace(/(?<![-a-zA-Z])THEORY-0?(\d+)-M0?(\d+)/g, "Chapter $1, Lesson $2");
    
    // THEORY-01 -> Chapter 1
    replaced = replaced.replace(/(?<![-a-zA-Z])THEORY-0?(\d+)(?!-M)/g, "Chapter $1");
    
    // 단독으로 쓰인 M02 -> Lesson 2 (선택적)
    // 대체로 "다음 M03에서는" -> "다음 Lesson 3에서는"
    replaced = replaced.replace(/\bM0?(\d+)\b/g, "Lesson $1");

    return ">" + replaced + "<";
  });

  // HTML 내 텍스트 치환에서 놓친 부분, 혹시 문장 시작이 > 밖에서 시작된 경우 대비
  // 단, href="THEORY..." 같은 속성에는 영향이 없도록 안전하게 텍스트만 치환해야 하지만, 
  // 위 정규식은 <...> 사이의 내용을 건드리지 않습니다. (첫 노드나 끝 노드 처리 확인)
  // 만약 파일 전체가 < 태그로 시작하고 끝나지 않는 예외적 텍스트가 있다면 아래와 같이 보완합니다.
  // 이 프로젝트 HTML은 모두 <!-- 로 시작하거나 태그로 시작하므로 안전합니다.

  // 2. 코드 블록 Shiki 포맷팅 래핑
  // <pre><code>...</code></pre> 구조를 찾아서 Shiki Wrapper 로 감싸기
  // 주의: 이미 래핑된 경우 건너뛰기
  html = html.replace(/<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi, 
    (match, codeContent) => {
      // 이미 shiki가 적용되어 있다면 무시
      if (match.includes('class="shiki')) return match;
      return `<pre class="shiki shiki-copy-wrapper" style="background-color: #282c34"><code>${codeContent}</code><button class="shiki-copy-button" data-copied="false">Copy</button></pre>`;
    }
  );

  if (html !== originalHtml) {
    fs.writeFileSync(filePath, html, 'utf-8');
    totalModified++;
    console.log(`Updated: ${file}`);
  }
}

console.log(`\n완료: 총 ${files.length}개 파일 중 ${totalModified}개 파일 수정됨.`);
