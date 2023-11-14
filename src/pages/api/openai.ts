import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
import { LEARNING_CONTENT, SYSTEM_PROMPT } from "@/constants/message";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

// Create an OpenAI API client (that's edge friendly!)
const openAIConfiguration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(openAIConfiguration);

// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = "edge";

export default async function handler(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages: initialMessages, userData } = await req.json();
  const messages = Array.isArray(initialMessages) ? initialMessages : [];
  const botName = userData?.botName || '아직 정해지지 않음';
  const userClass = userData?.userClass || '모름';
  const userTeam = userData?.userTeam || '모름';
  const todayDateTime = () => dayjs().format('YYYY년 MM월 DD일 HH시 mm분 ss초');

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    stream: true,
    temperature: 0,
    max_tokens: 1024,
    messages: [{
      role: "system",
      content: `ASSISTANT의 이름은 ${botName}. 
      USER의 모둠은 '1학년 ${userClass}반 ${userTeam}모둠', 학교는 서울에 위치한 장평중학교, 지금은 ${todayDateTime()}.
      <USER 학습 내용> ${LEARNING_CONTENT}</USER 학습 내용>,
      <ASSISTANT 규칙> ${SYSTEM_PROMPT} </ASSISTANT 규칙>`},
      ...messages], // 이전의 대화 내용 10개를 포함하여 전송 <-- 멀티턴 기능
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}


