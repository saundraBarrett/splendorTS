import React from "react";

import CardRow from "./card-row";

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
    <>
      {cardBank.map((row, index) => {
        return (
          <CardRow
            rowCards={row.slice(0, 4)}
            key={`card-row_${index}`}
            saveCard={saveCard}
            playerGems={playerGems}
            playerCards={playerCards}
            disabled={disabled}
          />
        );
      })}
    </>
  );
};

export default BoardCards;
