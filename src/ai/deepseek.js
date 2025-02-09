require("dotenv").config();
const OpenAI = require("openai");
const { fetchReferendum } = require("../common/fetchReferendum");
const { systemRoleMessage } = require("./common");

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
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
    model: "deepseek-chat",
  });

  console.log(completion.choices[0].message.content);
}

main();
