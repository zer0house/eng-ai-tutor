import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
    ProfileContainer, 
    FormContainer, 
    InputContainer, 
    Label, 
    Input, 
    SubmitButton,
    Select,
} from '@/styles/signin/profile.styled';

interface User {
    id: string;
    name: string;
    // ... other properties of user
  }

function UserProfile() {
    const router = useRouter();
    const { data } = useSession();

    const [userName, setUserName] = useState("");
    const [userStuID, setUserStuID] = useState(0);
    const [userPhone, setUserPhone] = useState("");
    const [userSchool, setUserSchool] = useState<string | null>(null);

    const userIDCode = data?.user ? (data.user as User).id : undefined;
    const userNick = data?.user?.name;   

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userData = {
            userIDCode,
            userNick,
            userName,
            userStuID,
            userPhone,
            userSchool,
        };

        try {
            await addDoc(collection(db, 'userInfo'), userData);
            router.replace("/");  // 성공적으로 저장 후 메인 페이지로 리다이렉트
        } catch (error) {
            console.error("Error saving user info:", error);
        }
    };
  
    return (
        <ProfileContainer>
            <FormContainer onSubmit={handleSubmit}>
                <InputContainer>
                    <Label>학교:</Label>
                    <Select
                        value={userSchool || ""} 
                        onChange={e => setUserSchool(e.target.value)} 
                        required
                    >
                        <option value="" disabled>==선택하세요==</option>
                        <option value="신도고등학교">신도고등학교</option>
                        <option value="관련연구자">관련연구자</option>
                    </Select>
                </InputContainer>
                <InputContainer>
                    <Label>이름:</Label>
                    <Input 
                        type="text" 
                        value={userName} 
                        onChange={e => setUserName(e.target.value)} 
                        placeholder="이름" 
                        required 
                    />
                </InputContainer>
                <InputContainer>
                    {userSchool !== "관련연구자" && (
                        <>
                            <Label>학번:</Label>
                            <Input 
                                type="number" 
                                value={userStuID} 
                                onChange={e => setUserStuID(parseInt(e.target.value))}
                                placeholder="5자리 숫자"
                                required 
                            />
                        </>
                    )}
                </InputContainer>
                <InputContainer>
                    <Label>연락처:</Label>
                    <Input 
                        type="text" 
                        value={userPhone} 
                        onChange={e => setUserPhone(e.target.value)} 
                        placeholder={userSchool === "관련연구자" ? "연락처 또는 이메일" : "010-0000-0000"} 
                        required 
                    />
                </InputContainer>
                <SubmitButton type="submit">Submit</SubmitButton>
            </FormContainer>
        </ProfileContainer>
    );    
}

export default UserProfile;
