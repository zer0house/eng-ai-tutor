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
    userName: string | null;  // 여기에서 타입을 업데이트합니다.
}


const MenuExpansion: React.FC<MenuExpansionProps> = ({ isVisible, onToggle, userName }) => { 
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
                    <Greeting userName={userName || 'Guest'} />  {/*userName이 null일 경우 기본값으로 'Guest'를 사용합니다.*/}
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
