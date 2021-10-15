import styled from 'styled-components'
import { IToken } from '../types/tokens';
import '../styles/tokens.css';
import { Gems } from '../constants/gems';

type TokenDivProps = {
    gem?: string;
    disabled: boolean;
}

const TokenDiv = styled.div<TokenDivProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    -webkit-text-stroke: 1px black;
    font-size: 3em;
    background-image: var(--TOKEN-BACKGROUND);
      cursor: pointer;
      width: 65px;
      height: 65px;
      border-radius: 50%;  
      text-align: center;
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5), 0 0 3px 0 rgba(0, 0, 0, 0.4) inset;
      border: solid 10px black;
      border-width: 10px;
      border-style: solid;
      margin-bottom: .25em;
      pointer-events: ${(props: TokenDivProps) => {
        if (props.disabled) {
          return "none";
        }
        else {
            return "auto"
        }
      }};
      border-color: ${(props: TokenDivProps) => {
        switch (props.gem) {
          case Gems.RED:
            return "rgba(var(--RUBY), 1);";
          case Gems.BLACK:
            return "rgba(var(--ONYX), 1);";
          case Gems.BLUE:
            return "rgba(var(--SAPPHIRE), 1);";
          case Gems.GREEN:
            return "rgba(var(--EMERALD), 1);";
          case Gems.WHITE:
            return "rgba(var(--DIAMOND), 1);";
          default:
            return "transparent";
        }
      }};
    `;

// token is the quantity remaining in the bank
interface TokenProps {
    token: IToken;
    disabled: boolean;
    onClick(arg: string): void;
}

const Token: React.FC<TokenProps> = (props) => {
    console.log(props)
    return (        
        <TokenDiv gem={props.token.gem} disabled={props.disabled} onClick={() => props.onClick(props.token.gem)}>{props.token.qty}</TokenDiv>
    )
}

export default Token;