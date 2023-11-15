// src/components/Header/MenuExpansion.tsx
import { FiChevronRight } from 'react-icons/fi';  // Import right arrow icon
import React from 'react';
import {
    ExpansionWrapper,
    CloseButtonWrapper,
    MenuContent,
    MenuContentCenter,
} from './MenuExpansionStyled';
import { ThemeToggle } from './ThemeToggle'; 
import { SigninButton } from './SigninButton';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
    Wrapper,
    IconWapper,
} from './Header.styled';
import { Greeting } from './Greeting';

interface MenuExpansionProps {
    isVisible: boolean;
    onToggle: () => void;  // New prop for toggling menu visibility
    userData: {
      userClass: string | null;
      userTeam: string | null;
      botID: string | null;
      botName: string | null;  
      topicID: string | null;  
    } | null;
}


const MenuExpansion: React.FC<MenuExpansionProps> = ({ isVisible, onToggle, userData }) => { 
    const ref = React.useRef<HTMLDivElement>(null);
    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node) && isVisible) {  // Check if isVisible is true
            onToggle();
        }
    };

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, onToggle, isVisible]);  // Include isVisible in the dependency array

    return (
        <Wrapper>
            <ExpansionWrapper ref={ref} style={{ transform: isVisible ? 'translateX(0)' : 'translateX(100%)' }}>
                <CloseButtonWrapper onClick={onToggle}>
                    <FiChevronRight size={24} />  {/* Use right arrow icon */}
                    <Greeting />
                </CloseButtonWrapper>
                <MenuContent>
                    <MenuContentCenter>
                        {/* Menu content here */}
                        <ThemeToggle />
                        <div style={{ height: '50px' }} />  {/* 빈 공간 */}
                        <div style={{ height: '50px' }} />  {/* 빈 공간 */}
                        <SigninButton />
                    </MenuContentCenter>
                </MenuContent>
            </ExpansionWrapper>
            <IconWapper>
                <GiHamburgerMenu size={24} onClick={onToggle} />  {/* Use onToggle prop here */}
            </IconWapper>
        </Wrapper>
    );
         
};

export default MenuExpansion;
