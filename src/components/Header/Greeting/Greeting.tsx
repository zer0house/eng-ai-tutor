// src\components\Header\Greeting\Greeting.tsx
import { Greeting as GreetingStyled } from './Greeting.Styled';
import { useState, useEffect } from 'react';

const Greeting = () => {
  const [userClass, setUserClass] = useState('Guest');
  const [userTeam, setUserTeam] = useState('Guest');

  useEffect(() => {
    const storedUserClass = localStorage.getItem('userClass');
    const storedUserTeam = localStorage.getItem('userTeam');

    if (storedUserClass && storedUserTeam) {
      setUserClass(storedUserClass);
      setUserTeam(storedUserTeam);
    }
  }, []);

  return (
    <GreetingStyled>
      1학년 {userClass}반 {userTeam}모둠 분들, <br/>
      안녕하세요😀
    </GreetingStyled>
  );
}

export default Greeting;
