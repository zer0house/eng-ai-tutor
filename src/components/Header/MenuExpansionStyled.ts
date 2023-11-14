// src/components/Header/MenuExpansionStyled.ts
import styled from '@emotion/styled';

export const ExpansionWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 30%;
  min-width: 200px;
  height: 100%;
  background-color: var(--background-color-primary);
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;  // Update here
  justify-content: flex-start;  // Update here
  z-index: 1000;
`;

export const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  background-color: var(--background-color-primary);
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
`;


export const MenuContent = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

export const MenuContentCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  & > div {
    height: 50px;
  }
`;
