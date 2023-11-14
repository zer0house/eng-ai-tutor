// src\components\Header\Greeting\Greeting.tsx
import { Greeting as GreetingStyled } from './Greeting.Styled';

interface GreetingProps {
  userClass: string | null;
  userTeam: string | null;
}

const Greeting: React.FC<GreetingProps> = ({ userClass, userTeam }) => (
    <GreetingStyled>
        1학년 {userClass}반 {userTeam}모둠 분들, <br/>
        안녕하세요😀
    </GreetingStyled>
);

export default Greeting;
