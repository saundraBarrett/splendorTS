import React from "react";
import styled from "styled-components";

import CardRow from "./card-row";

const BoardCardContainerDiv = styled.div`
-webkit-align-items: center;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
`

type BoardCardsProps = {
  cardBank: any[];
  playerGems?: any[];
  saveCard(arg: number): void;
  disabled: boolean;
  playerCards?: any[];
};

const BoardCards: React.FC<BoardCardsProps> = (props) => {
const {cardBank, saveCard, playerGems, disabled, playerCards } = props;
  return (
    <BoardCardContainerDiv>
      {cardBank.map((row, index) => {
        return (
          <CardRow
            count={row.length}
            index={index}
            rowCards={row.slice(0, 4)}
            key={`card-row_${index}`}
            saveCard={saveCard}
            playerGems={playerGems}
            playerCards={playerCards}
            disabled={disabled}
          />
        );
      })}
    </BoardCardContainerDiv>
  );
};

export default BoardCards;
