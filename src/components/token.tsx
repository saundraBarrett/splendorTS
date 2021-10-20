import styled from "styled-components";
import { IToken } from "../types/tokens";
import "../styles/tokens.css";
import { Gems } from "../constants/gems";

type TokenDivProps = {
  gem?: string;
  qty: number;
  disabled: boolean;
  size?: string;
};

const TokenDiv = styled.div<TokenDivProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  -webkit-text-stroke: 1px black;
   font-size: ${(props: TokenDivProps) => {
    switch (props.size) {
      case "small":
        return "1em";
      case "medium":
        return "2em";
      default:
        return "3em";
    }
  }};
  background-image: var(--TOKEN-BACKGROUND);
  cursor: pointer;
  width: ${(props: TokenDivProps) => {
    switch (props.size) {
      case "small":
        return "var(--TOKEN-SMALL)";
      case "medium":
        return "var(--TOKEN-MEDIUM)";
      default:
        return "var(--TOKEN-LARGE)";
    }
  }};
  height: ${(props: TokenDivProps) => {
    switch (props.size) {
      case "small":
        return "var(--TOKEN-SMALL)";
      case "medium":
        return "var(--TOKEN-MEDIUM)";
      default:
        return "var(--TOKEN-LARGE)";
    }
  }};
  border-radius: 50%;
  text-align: center;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5), 0 0 3px 0 rgba(0, 0, 0, 0.4) inset;
  border: solid 10px black;
  border-width: 10px;
  border-style: solid;

  opacity: ${(props: TokenDivProps) => {
    if (props.qty === 0) {
      return "0.5";
    } else {
      return "1.0";
    }
  }};
  pointer-events: ${(props: TokenDivProps) => {
    if (props.disabled) {
      return "none";
    } else {
      return "auto";
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
  disabled?: boolean;
  onClick?(arg: string): void;
  size?: string;
}

const Token: React.FC<TokenProps> = (props) => {
  const { token, disabled, onClick, size } = props;
  return (
    <TokenDiv
      size={size}
      gem={token ? token.gem : ""}
      disabled={disabled ? !disabled : false}
      qty={token ? token.qty : 0}
      onClick={() => (onClick ? onClick(token.gem) : null)}
    >
      {token.qty}
    </TokenDiv>
  );
};

export default Token;
