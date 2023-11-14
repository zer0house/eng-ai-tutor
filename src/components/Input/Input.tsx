import { KeyboardEvent, useEffect, useCallback, useRef } from 'react';
import { FiNavigation } from 'react-icons/fi';
import { Wrapper, ChatTextArea, SendButton } from './Input.styled';
import { useChattingActions, useChattingStore } from '@/core/store';
import { InputProps  } from '@/core/types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc } from "firebase/firestore"


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

const Input: React.FC<InputProps> = ({userData}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { hasError, isWaiting, fingerprint } = useChattingStore((state) => state);
  const { pushUserMessage, updateAssistantMessage, setError, addMessage } = useChattingActions();

  // 사용자가 입력한 메세지는 textareaRef에 저장되고

  const onChange = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  const onSubmit = useCallback(async () => {
    if (!textareaRef.current) return;
    const message = textareaRef.current.value; // textareaRef에 저장된 메세지를 message에 저장
    if (message.length === 0 || !userData) return;
    pushUserMessage(message, userData); // 사용자가 입력한 message를 pushUserMessage에 전달(useChattingStore.tsx)
    if (textareaRef.current) {
      textareaRef.current.value = '';
    } 
    // 거기서 messages가 이어 붙여짐

    const { messages: previousMessages } = useChattingStore.getState(); // messages를 가져옴. previousMessages로 추가 지정

    //최근 메세지 10개 전달 및 전달 형식 변환(role, content만 전달)
    const recentMessages = previousMessages.slice(-10).map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    recentMessages.push({ role: 'user', content: message });

    try {
      // recentMessages를 openai api로 전달
      const res = await fetch('/api/openai', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: recentMessages,
          fingerprint: fingerprint,
          userData: userData,
        }),
      });
      

      if (!res.ok) {
        setError();
        console.log(res.statusText);
        throw new Error(res.statusText);
      }

      const data = res.body;
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

      // Firestore에 데이터 저장
      
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
        console.log("[ChatResponse] Document written with ID: ", docRef.id);
  
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
  }, [userData, fingerprint, setError, pushUserMessage, updateAssistantMessage]);

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // 기본 줄바꿈 동작 방지
      onSubmit();
    }
  };

  useEffect(() => {
    onChange();
  }, []);

  const disabled = hasError || isWaiting;
  return (
    <Wrapper>
      <ChatTextArea
        ref={textareaRef}
        onChange={onChange}
        placeholder={hasError ? '에러가 발생했습니다. 새로고침해주세요.' : '과학에 대해서 궁금한 걸 물어보세요!'}
        disabled={disabled}
        onKeyDown={onKeyDown}
      />
      <SendButton type="button" onClick={onSubmit} disabled={disabled} aria-label="send message">
        <FiNavigation size={30} color="#fefefe" />
      </SendButton>
    </Wrapper>
  );
};

export default Input;
