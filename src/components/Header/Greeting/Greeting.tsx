// src\components\Header\Greeting\Greeting.tsx
import { Greeting as GreetingStyled } from './Greeting.Styled';

interface GreetingProps {
  userName: string;
}

const Greeting: React.FC<GreetingProps> = ({ userName }) => (
    <GreetingStyled>
        {userName}님, <br/>
        안녕하세요😀
    </GreetingStyled>
);

export default Greeting;
