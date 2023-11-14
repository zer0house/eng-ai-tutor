import { useEffect, useState} from 'react';
import styled from '@emotion/styled';
import { Body } from '@/components/Body';
import Header from '@/components/Header/Header';
import { Input } from '@/components/Input';
import { useFingerprint } from '@/core/hooks';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserData } from '@/core/types';

const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--background-color-secondary);

  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
    overflow: hidden;
  }
`;


export default function Home() {
  // 로그인 여부 확인
  const router = useRouter();
  const { data: sessionData } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/signin");
    },
  });
  useFingerprint();

  // 로그인한 사용자의 정보를 가져옴
  const [userData, setUserData] = useState<UserData | null>(null);
  
  // 로그인한 사용자가 데이터베이스에 등록되어 있는지 확인
  useEffect(() => {
    async function fetchUserData() {
      if (sessionData?.user && 'id' in sessionData.user) {  // 'id'가 user 오브젝트에 있는지 체크
        const q = query(collection(db, 'userInfo'), where("userIDCode", "==", sessionData.user.id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          const fetchedUserData = {
            userSchool: docData.userSchool,
            userStuID: docData.userStuID,
            userName: docData.userName,
            userIDCode: docData.userIDCode,
            botID: '000000', // 임시로 챗봇 ID, 이름 넣어둠
            botName: 'Sci-Ai-Tutor',
            topicID: null,
          };
          setUserData(fetchedUserData);
        } else {
          router.replace("/signin/profile");
        }
        // if (fetchedUserData.botID === null) {
        //   챗봇 선택하는 페이지로 이동
        // }
      }
    }
    fetchUserData();
  }, [sessionData, router]);

  // 추가로, 나중에 챗봇 여러개 선택하게 할 거면, 기본 챗봇 선택하게 하는 페이지도 만들어야 함
  // 메뉴바에 챗봇 선택하는 버튼 만들어서, 챗봇 선택하는 페이지로 이동하게 하고, 그 페이지에서 챗봇 선택하면, 그 챗봇으로 이동하게 하기
  // 이동하는 방법은 그 페이지에서 챗봇 선택하면, 챗봇 선택하는 페이지에서 챗봇 선택한 걸 botID로 받아서 이를 다시 return의 userData와 함께 보내기

  return (
    <Layout>
      <Header userData={userData} /> {/* Pass the userData object to the Header component */}
      <Body userData={userData} />
      <Input userData={userData} />
    </Layout>
  );
}
