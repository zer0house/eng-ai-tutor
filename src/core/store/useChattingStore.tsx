import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Message, ChattingStoreType } from '@/core/types';
import { generateRandomString } from '../utils/generateRandomString';
import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc } from "firebase/firestore"

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

export const useChattingStore = create(
  devtools<ChattingStoreType>((setState, getState) => ({
    messages: [],
    fingerprint: '',
    isWaiting: false,
    hasError: false,
    message: '',
    actions: {

      fixWelcomeMessage: async (content, userData) => {
        try {
          const docRef = await addDoc(collection(db, "chatCollection"), {
            userClass: userData.userClass,
            userTeam: userData.userTeam,
            botID: userData.botID,
            botName: userData.botName,
            topicID: userData.topicID,
            // topicName:
            role: 'assistant',
            content: content,
            chatRate: null,
            chatRateReason: null,
            chatRateOpinion: null,
            timestamp: Number(dayjs().format('YYYYMMDDHHmmss')),
          });
          // 생성된 메세지의 ID를 ChatID로 지정
          await updateDoc(docRef, { chatID: docRef.id });
          console.log("[fixWelcomeMessage] Document written with ID: ", docRef.id);

          // 메세지 객체 생성과 상태 업데이트는 try 블록 안에서 수행
          const message: Message = {
            id: docRef.id,
            sendAt: dayjs(),
            role: 'assistant',
            content: content,
          };      
          
          setState(prevState => ({
            messages: [...prevState.messages, message],
            isWaiting: false,
          }));      
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      },

      pushUserMessage: async (content, userData) => {
        // Firestore에 데이터 저장
        try {
          const docRef = await addDoc(collection(db, "chatCollection"), {
            userClass: userData.userClass,
            userTeam: userData.userTeam,
            botID: userData.botID,
            botName: userData.botName,
            topicID: userData.topicID,
            // topicName:
            role: 'user',
            content: content,
            chatRate: null,
            chatRateReason: null,
            chatRateOpinion: null,
            timestamp: Number(dayjs().format('YYYYMMDDHHmmss')),
          });
          // 생성된 메세지의 ID를 ChatID로 지정
          await updateDoc(docRef, { chatID: docRef.id });
          console.log("[pushUserMessage] Document written with ID: ", docRef.id);
          
          // 메시지 객체 생성과 상태 업데이트
          const message: Message = {
            id: docRef.id,
            sendAt: dayjs(),
            role: 'user',
            content: content,
          };      
          
          console.log("[pushUserMessage] message: ", message);
          setState(prevState => ({
            messages: [...prevState.messages, message],
            isWaiting: true, // 대화 상대의 응답을 기다리고 있는 상태
          }));      
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      },
      
      updateAssistantMessage: async (content: string) => {
        const { messages } = getState();
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.role === 'assistant' && messages.length >= 2) {  // 처음 fixWelcomeMessage로 생성된 메세지를 덮어쓰지 않도록 함
          lastMessage.content = content;
          setState({
            messages: [...messages.slice(0, -1), lastMessage]
          });
        } else {
          // 임시 메시지가 없을 경우 새 메시지 추가
          const message: Message = {
            id: generateRandomString(5),
            sendAt: dayjs(),
            role: 'assistant',
            content: content,
          };
          setState({
            messages: [...messages, message],
            isWaiting: false,
          });
          // 여기서는 짤짤이로 생성하는 곳이므로, Firestore에 데이터 저장하지 않음
          // 저장은 Body.tsx와 Input.tsx에서 마지막 누적 메세지, 즉 messages[messages.length - 1]을 가져와서 저장함
        }      
      },

      addMessage: (message: Message) => {
        setState(prevState => ({
          messages: [...prevState.messages.slice(0, -1), message]
        }));
      },
      
      setError: () => {
        setState({ hasError: true, isWaiting: false });
      },
      setFingerprint: (fingerprint) => {
        setState({ fingerprint });
      },
    },
  })),
);

export const useChattingActions = () => useChattingStore(({ actions }) => actions);
