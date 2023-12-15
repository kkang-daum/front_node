const fs = require("fs");
const crypto = require("crypto");

const readStream = fs.createReadStream("./quiz.txt", { highWaterMark: 16 });
const data = [];
readStream.on("data", (chunk) => {
  data.push(chunk);
  console.log("data:", chunk, chunk.length);
});
readStream.on("end", () => {
  console.log("end:", Buffer.concat(data).toString());
});
readStream.on("error", (err) => {
  console.log("error:", err);
});

const algorithm = "aes-256-cbc";
const key = process.env.QUIZ_KEY;
const iv = process.env.QUIZ_IV;
if (!key || !iv) {
  console.error("Error: Key or IV not provided.");
  process.exit(1);
}
let result = ''
const cipher = crypto.createCipheriv(algorithm, key, iv);
fs.readFile("./quiz.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  result = cipher.update(data, "utf-8", "base64");
  result += cipher.final("base64");
  console.log("암호화 결과:", result);

  
});

// 시스템 변수는 프로그램이 실행되는 환경에 미리 설정되어 있어야 합니다.
// 터미널에서 아래와 같이 시스템 변수를 설정하고 코드를 실행할 수 있습니다.
// export YOUR_AES_KEY=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
// export YOUR_AES_IV=aaaaaaaaaaaaaaaa
// quiz.js
// 위의 코드에서 your_script.js는 실제로 작성한 코드 파일의 이름으로 대체되어야 합니다.
//이렇게 시스템 변수를 설정한 후 코드를 실행하면, 코드 내에서 해당 시스템 변수를 읽어와서 사용합니다.

const writeStream = fs.createWriteStream("./quiz2.cipher.txt", "utf-8");
writeStream.write(result);
writeStream.end();

writeStream.on("finish", () => {
  console.log("암호화된 데이터를 파일에 쓰기 완료");
});

writeStream.on("error", (err) => {
  console.error("파일 쓰기 오류:", err);
});