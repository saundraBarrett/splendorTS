import React, { useState } from "react";
import styled from 'styled-components'

import { IGame } from "../types/game";
import { IToken } from "../types/tokens";
import { hasDuplicates } from "../helpers";
import Token from "./token";

interface TokenBankProps {
    saveTokens(arg: Array<number>): void;
    updateTokenCount(arg: number): void;
    tokenBank: IGame["tokenBank"];
    disabled: boolean;
}

const TokenBankDiv = styled.div`
    display: flex;
    flex-direction: column;
`

const TokenBank: React.FC<TokenBankProps> = (props) => {
    const [selectedTokens, setSelectedTokens] = useState<Array<number>>([]);
    const { disabled, updateTokenCount } = props;

    const selectToken = (tokenIndex: number) => {
        updateTokenCount(tokenIndex);
        const tokens = [...selectedTokens, tokenIndex];
        setSelectedTokens(tokens);
        /* if there are 3 tokens are selected, end the turn and save the tokens to the user's hand */
        if (selectedTokens.length === 2) {
            props.saveTokens(tokens);
            setSelectedTokens([])
        }
        /* or if the tokens selected are the same and there are 2, end the turn */
        else if (selectedTokens.length === 1 && hasDuplicates(tokens)) {
            props.saveTokens(tokens);
            setSelectedTokens([])
        }
      };

    const gemDisabled = (token: IToken, tokenIndex: number) => {
        if (token.qty <= 0) {
          /* if no tokens remain */
          return true;
        } else if (
          /* disable if token does not qualify to be selected twice -  token from pile is already selected but there are less than 4 tokens left */
          selectedTokens.includes(tokenIndex) &&
          props.tokenBank[tokenIndex].qty < 2
        ) {
          return true;
        } else if (
          selectedTokens.length === 2 &&
          selectedTokens.includes(tokenIndex)
        ) {
          // 2 tokens are already selected, disable the piles that are already select
          return true;
        } else {
          return false;
        }
      };

    return (
    <TokenBankDiv>
        {props.tokenBank.map((token: IToken, tokenIndex: number) => (
          <Token token={token} disabled={gemDisabled(token, tokenIndex) || disabled} key={`${tokenIndex}`} onClick={() => {
              selectToken(tokenIndex);
            }}/>
        ))}
      </TokenBankDiv>
    )
}

export default TokenBank;