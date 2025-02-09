require("dotenv").config();
const OpenAI = require("openai");
const { fetchReferendum } = require("../common/fetchReferendum");
const { systemRoleMessage } = require("./common");

const openai = new OpenAI({
  baseURL: "https://api.moonshot.cn/v1",
  apiKey: process.env.MOONSHOT_API_KEY, // 在这里将 MOONSHOT_API_KEY 替换为你从 Kimi 开放平台申请的 API Key
});

async function main() {
  const referendum = await fetchReferendum(1410);
  // const content = "";

  const completion = await openai.chat.completions.create({
    messages: [
      systemRoleMessage,
      {
        role: "user",
        content: referendum.content,
      },
    ],
    model: "moonshot-v1-8k",
  });

  console.log(completion.choices[0].message.content);
}

main();
