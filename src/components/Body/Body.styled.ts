import { TABLET_BREAK_POINT } from '@/constants';
import { mediaQuery } from '@/styles/mediaQuery';
import styled from '@emotion/styled';

export const Wrapper = styled.section`
  flex: auto;
  padding: 30px 20px 15px 20px;
  overflow-y: auto;
  background-color: var(--background-color-secondary);

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: var(--gnb-icon-color);
  }
`;

export const Date = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
`;


export const Button = styled.button`
  position: fixed;
  bottom: 130px;
  ${mediaQuery(TABLET_BREAK_POINT)} {
    bottom: 110px;
  }
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: var(--point-color-0);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--point-color-0);
  }
  

`;