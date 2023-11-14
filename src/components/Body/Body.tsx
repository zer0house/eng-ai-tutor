import { Fragment, useEffect, useRef } from 'react';
import { useChattingActions, useChattingStore } from '@/core/store';
import { FIX_INIT_MESSAGE, GEN_INIT_MESSAGE } from '@/constants';
import { Wrapper, Date } from './Body.styled';
import { Message } from './Message';
import TypingSpinner from './Message/TypingSpinner';
import { BodyProps } from '@/core/types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc } from "firebase/firestore"
import { generateRandomString } from '@/core/utils/generateRandomString';


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');


const Body: React.FC<BodyProps> = ({userData}) => {
  const scrollRef = useRef<HTMLElement>(null);
  const messagesBodyRef = useRef<HTMLDivElement>(null);
  const { messages, isWaiting, fingerprint } = useChattingStore((state) => state);
  const { fixWelcomeMessage, updateAssistantMessage, setError, addMessage } = useChattingActions();

  // messages 배열이 업데이트 될 때마다 스크롤을 맨 아래로 이동합니다.
  useEffect(() => {
    if (!messagesBodyRef.current) return;
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = messagesBodyRef.current.scrollHeight;
  }, [messages]);  

  useEffect(() => {
    if (!userData) return;
    // 대화 시작할 때마다 새로운 topicID 생성
    const topicID = generateRandomString(20); // 20자리 랜덤 문자열 생성
    console.log("topicID: ", topicID);
    // userData에 topicID 추가
    userData.topicID = topicID;
    // topicCollection에 새로운 문서 추가, topicID를 문서 ID로 지정
    // ${botID} ${botName} ${userIDCode} ${userName} ${userSchool} ${userStuID} ${topicID} ${topicName} ${topicRate} ${topicRateReason}  ${topictRateOpinion} ${timestamp}
    // topicRate, topicRateReason, topicRateOpinion은 null로 지정
    // timestamp는 현재 시간으로 지정
    // topicName은 null로 지정
    // Input 컴포넌트에서 처음 입력한 메세지를 ChatGPT 이용한 src\pages\api\topicMaker에 전달하여 요약 받고 이를 topicName으로 지정, 이를 chatCollection에도 업데이트
    // if topicName === null --> const topicName = await fetch('/api/topicMaker', {
    // 사용자는 topicCollection에서 자신의 userIDCode와 일치하는 문서를 찾아서 topicID에 해당하는 문서의 topicName을 가져올 수 있음
    // 해당 topicID에 해당하는 ChatCollection의 문서들을 모두 가져와서 messages 배열에 추가
    // 이 때 userData.topicID도 입력받지만 topicID 새로 생성X, 웰컴메세지 생성 X


    fixWelcomeMessage(FIX_INIT_MESSAGE, userData).catch(error => {
        console.error("Error calling fixWelcomeMessage:", error);
    });
  }, [userData?.userClass , userData?.userTeam, fixWelcomeMessage]);

  useEffect(() => {
    if (!userData) return;
    const GenWelcomeMessage = async () => {
      try {
        const gen = await fetch('/api/openai', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              { role: "assistant", content: GEN_INIT_MESSAGE }
            ],
            fingerprint: fingerprint,
            userData: userData,
          }),
        });
  
        if (!gen.ok) {
          setError();
          console.log(gen.statusText);
          throw new Error(gen.statusText);
        }
  
        const data = gen.body;
        if (!data) {
          return;
        }
        const reader = data.getReader();
        const decoder = new TextDecoder();
  
        let done = false;
        let messageResponse = '';
        while (!done && reader) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          messageResponse += chunkValue;
          updateAssistantMessage(messageResponse, userData);
        }
  
      // After the chatbot response is completely generated:
        const { messages } = useChattingStore.getState(); // Get the current state directly

        try {
          // 새 문서를 추가하고 생성된 참조를 얻습니다.
          const docRef = await addDoc(collection(db, "chatCollection"), {
            userClass: userData.userClass,
            userTeam: userData.userTeam,
            botID: userData.botID,
            botName: userData.botName,
            topicID: userData.topicID,
            // topicName:
            // 마지막 메세지의 role과 content를 가져옴
            role: messages[messages.length - 1].role,
            content: messages[messages.length - 1].content,
            chatRate: null,
            chatRateReason: null,
            chatRateOpinion: null,
            timestamp: Number(dayjs().format('YYYYMMDDHHmmss')),
          });
          // 생성된 문서의 ID를 사용하여 같은 문서에 chatID 필드를 추가/업데이트 합니다.
          await updateDoc(docRef, { chatID: docRef.id });
          console.log("[GenWelcomeMessage] Document written with ID: ", docRef.id);
    
          // 생성된 문서의 ID를 사용하여 챗봇 웰컴 메시지 객체의 id를 업데이트
          const updatedMessage = {
            ...messages[messages.length - 1], // 마지막 메시지 객체를 복사
            id: docRef.id, // 새로운 Firestore 문서 ID로 업데이트
          };

          // 챗봇 웰컴 메시지 객체 업데이트
          addMessage(updatedMessage); // `addMessage`는 메시지를 상태에 추가하는 함수로, useChattingStore에서 제공해야 함

        } catch (error) {
          console.error("Error adding document: ", error);
        }    

      } catch (error) {
        console.error('Error fetching chatbot response:', error);
      }
    };
  
    GenWelcomeMessage();
  }, [userData?.userClass, userData?.userTeam, fingerprint, setError, updateAssistantMessage]);
  

  return (
    <Wrapper ref={scrollRef}>
      <div ref={messagesBodyRef}>
        {messages.map((message, index) => {
          const isNewDate =
            index === 0 || message.sendAt.diff(messages[index - 1].sendAt, 'day') > 0;
          return (
            <Fragment key={message.id}>
              {isNewDate && <Date>{message.sendAt.format('YYYY년MM월DD일')}</Date>}
              <Message message={message}  />
            </Fragment>
          );
        })}
        {isWaiting && <TypingSpinner />}
      </div>
    </Wrapper>
  );
};

export default Body;
