const fs = require('fs');
const readline = require('readline');

const logPath = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\35ae9b63-46da-4b5c-9ef6-cd961d49ef00\\.system_generated\\logs\\overview.txt';
const outputPath = 'C:\\Users\\ASUS\\Desktop\\Revnity\\recover_files.js';

async function processLineByLine() {
  const fileStream = fs.createReadStream(logPath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const files = {};

  for await (const line of rl) {
    try {
        const data = JSON.parse(line);
        if (data.type === 'PLANNER_RESPONSE' && data.tool_calls) {
            for (const call of data.tool_calls) {
                if (call.name === 'write_to_file' || call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') {
                    if (call.args && call.args.TargetFile) {
                        const target = call.args.TargetFile.replace(/"/g, '');
                        if (target.includes('c:\\Users\\ASUS\\Desktop\\Revnity\\src') || target.includes('c:/Users/ASUS/Desktop/Revnity/src')) {
                            files[target] = call.args.CodeContent ? call.args.CodeContent.replace(/^"|"$/g, '').replace(/\\n/g, '\n').replace(/\\"/g, '"') : (files[target] || "");
                        }
                    }
                }
            }
        }
    } catch (e) {}
  }
  
  for (const [filePath, content] of Object.entries(files)) {
      console.log(`Recovered: ${filePath}`);
      fs.writeFileSync(`C:\\Users\\ASUS\\Desktop\\Revnity\\recovered_` + filePath.split('\\').pop(), content);
  }
}

processLineByLine();
