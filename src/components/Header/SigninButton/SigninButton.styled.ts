import styled from '@emotion/styled';

export const SigninWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const LoginButton = styled.button`
    background-color: var(--point-color-0);
    border: none;
    color: #ffffff;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: filter 0.2s;  // Updated

    &:hover {
        filter: brightness(0.8);  // Updated
    }
`;

export const LogoutButton = styled(LoginButton)`
    background-color: var(--point-color-0);  // Updated
    border: none;
    color: #ffffff;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: filter 0.2s;  // Updated

    &:hover {
        filter: brightness(0.8);  // Updated
    }
`;
