import { useEffect, useState} from 'react';
import styled from '@emotion/styled';
import { Body } from '@/components/Body';
import Header from '@/components/Header/Header';
import { Input } from '@/components/Input';
import { useFingerprint } from '@/core/hooks';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
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
  const { data: sessionData } = useSession();
  useFingerprint();

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // 로컬 스토리지에서 반과 모둠 정보를 가져옵니다.
    const storedUserClass = localStorage.getItem('userClass');
    const storedUserTeam = localStorage.getItem('userTeam');

    if (!sessionData && (!storedUserClass || !storedUserTeam)) {
      // 세션 데이터가 없고 로컬 스토리지에도 정보가 없으면 로그인 페이지로 리디렉션
      router.replace("/signin");
    } else if (storedUserClass && storedUserTeam) {
      // 로컬 스토리지에 정보가 있으면 userData 상태를 설정합니다.
      setUserData({      
        userClass: storedUserClass,
        userTeam: storedUserTeam,
        botID: '000000', // 임시 챗봇 ID
        botName: '라잇미(Write-Me)', // 임시 챗봇 이름
        topicID: null, // 주제 ID
      });
    }
  }, [sessionData, router]);

  // if (fetchedUserData.botID === null) {
  //   챗봇 선택하는 페이지로 이동
  // }

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
