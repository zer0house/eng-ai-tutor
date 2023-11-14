import { Message as MessageType } from '@/core/types';
import { MessageFlexWrapper, MessageWrapper, MessageBodyWrapper, Time, RatingButtonWrapper } from './Message.styled';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from "firebase/firestore"
import { useState } from 'react';

// Rating 버튼 컴포넌트에 상태를 추가
const RatingButton = ({ chatId }: { chatId: string }) => {
  const [currentRating, setCurrentRating] = useState<'good' | 'bad' | null>(null);

  const handleRating = async (newRating: 'good' | 'bad') => {
    // 이미 선택된 버튼을 누르면 레이팅을 null로 설정합니다.
    const isSameRating = currentRating === newRating;
    const ratingToSet = isSameRating ? null : newRating;

    setCurrentRating(ratingToSet); // 클릭한 버튼에 대한 시각적 피드백을 즉시 제공
    const chatDocRef = doc(db, "chatCollection", chatId);
    try {
      await updateDoc(chatDocRef, { chatRate: ratingToSet });
      console.log(`Rating updated to ${ratingToSet} for ChatID: ${chatId}`);
      // 데이터베이스에 업데이트가 성공했을 때 상태를 최종적으로 업데이트
      setCurrentRating(ratingToSet);
    } catch (error) {
      console.error("Error updating document: ", error);
      // 에러가 발생했을 경우, 시각적 피드백을 되돌립니다.
      setCurrentRating(currentRating);
    }
  };

  return (
    <>
      <button 
        onClick={() => handleRating('good')}
        style={{
          backgroundColor: currentRating === 'good' ? 'green' : 'transparent',
          color: 'black', // 배경색 변경으로 인해 텍스트 색상도 변경할 수 있습니다.
          width: '50px',
        }}
      >
        👍
      </button>
      <button 
        onClick={() => handleRating('bad')}
        style={{
          backgroundColor: currentRating === 'bad' ? 'red' : 'transparent',
          color: 'black', // 배경색 변경으로 인해 텍스트 색상도 변경할 수 있습니다.
          width: '50px',
        }}
      >
        👎
      </button>
    </>
  );
};



const Message = ({ message: { id, sendAt, role, content } }: { message: MessageType }) => {
  return (
    <MessageFlexWrapper>
      <MessageWrapper $role={role}>
        <MessageBodyWrapper $role={role}>
          {content}
          {/* Rating 버튼을 메시지 옆에 추가합니다. */}
          {role === 'assistant' && (
            <RatingButtonWrapper>
              <RatingButton chatId={id} />
            </RatingButtonWrapper>
          )}
        </MessageBodyWrapper>
        <Time>{sendAt.format('HH:mm A')}</Time>
      </MessageWrapper>
    </MessageFlexWrapper>
  );
};

export default Message;
