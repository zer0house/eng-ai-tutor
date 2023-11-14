import NextImage from 'next/image';
import { FiUser } from 'react-icons/fi';
import MenuExpansion from './MenuExpansion';
import React from 'react';
import ChatZHT from '@/styles/ChatZHT-0.6.png';
import {
  Wrapper,
  Image,
  MobileImage,
  UserInfo,
  OnlineDot,
  IconWapper,
  EnglishName,
} from './Header.styled';

interface HeaderProps {
  userData: {
    userClass: string | null;
    userTeam: string | null;
    botID: string | null;
    botName: string | null;  
    topicID: string | null;  
  } | null;
}

const Header: React.FC<HeaderProps> = ({ userData }) => {
  const [isMenuVisible, setMenuVisible] = React.useState(false);

  const handleMenuToggle = () => {
    setMenuVisible(prev => !prev);
  };
  return (
    <Wrapper>
      <UserInfo>
        <Image>
          <NextImage
            src= {ChatZHT}
            alt="profile"
            width={75}
            height={75}
          />
        </Image>
        <MobileImage>
          <NextImage
            src={ChatZHT}
            alt="mobile size profile"
            width={50}
            height={50}
          />
        </MobileImage>
        <div>
          <div>
            라잇미 <EnglishName>(Write-Me)</EnglishName>
          </div>
          <OnlineDot>
            <FiUser />
            online
          </OnlineDot>
        </div>
      </UserInfo>
      <IconWapper>
        
      </IconWapper>
      <MenuExpansion userData={userData} isVisible={isMenuVisible} onToggle={handleMenuToggle} />
    </Wrapper>
  );
};

export default Header;
