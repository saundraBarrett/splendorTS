import _ from "lodash";
import React from "react";
import styled from "styled-components";

import { cards } from "../constants/cards";
import { countOccurrences } from "../helpers";
import { ICard } from "../types/card";
import Card from "./card";

const CardRowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 2fr;
  grid-column-gap: 15px;
  grid-row-gap: 0px;
  margin: 15px 0;
`;

type CardRowProps = {
  rowCards: any[];
  saveCard(arg: number): void;
  playerGems?: any[];
  playerCards?: any[];
  disabled: boolean;
};

const CardRow: React.FC<CardRowProps> = (props) => {
  const { rowCards, saveCard, playerGems, disabled, playerCards } = props;

  const canAfford = (thisCard: ICard) => {
      let answer: boolean[] = [];
    _.forEach(thisCard.cost, function(value) {
        /* find player gem qty */
        let playerGem = _.find(playerGems, function (g) {
            return g.gem === value.gem;
        })
        let playerCardCount = countOccurrences(playerCards ? playerCards : [], value.gem)
        console.log(playerCardCount)
        if (playerGem.qty >= value.qty || playerCardCount >= value.qty ) {
            answer.push(true)
        }
    })
    return answer.length === thisCard.cost.length;
  };
  /* for each card in the row, render the card */
  return (
    <CardRowContainer>
      {_.map(rowCards, (card, index) => {
        let thisCard = _.find(cards, function (c) {
          return c.id === card;
        });
        if (thisCard) {
          return (
            <Card
              key={`card_${card}`}
              card={thisCard}
              saveCard={saveCard}
              canAfford={canAfford(thisCard)}
              disabled={disabled}
            />
          );
        }
      })}
    </CardRowContainer>
  );
};

export default CardRow;
