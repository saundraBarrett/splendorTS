import _ from "lodash";
import React from "react";
import styled from "styled-components";

import { cards } from "../constants/cards";
import { countOccurrences } from "../helpers";
import { ICard } from "../types/card";
import Card from "./card";
import cardBackground from "../assets/card-backgrounds.png";


const CardRowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 2fr;
  grid-column-gap: 15px;
  grid-row-gap: 0px;
  margin: 15px 0;
`;

type CardBackProps = {
  index: number;
}

const CardBackDiv = styled.div<CardBackProps>`
border: solid 1px #ccc;
  min-width: 100%;
  max-width: 100%;
  border-radius: 0.5em;
  height: var(--CARD-WIDTH);
  display: flex;
    flex-direction: column;
  background-image: url(${cardBackground});
  background-size: 500%;
  background-position: ${(props: CardBackProps) => {
    switch (props.index) {
      case 0:
        return "50% 100%";
      case 1:
        return "25% 100%";
      default:
        return "0% 100%";
    }
  }};
`

type CardRowProps = {
  rowCards: any[];
  saveCard(arg: number): void;
  playerGems?: any[];
  playerCards?: any[];
  disabled: boolean;
  count: number;
  index: number;
};



const CardRow: React.FC<CardRowProps> = (props) => {
  const { rowCards, saveCard, playerGems, disabled, playerCards, count, index } = props;

  const canAfford = (thisCard: ICard) => {
      let answer: boolean[] = [];
    _.forEach(thisCard.cost, function(value) {
        /* find player gem qty */
        let playerGem = _.find(playerGems, function (g) {
            return g.gem === value.gem;
        })
        let playerCardCount = countOccurrences(playerCards ? playerCards : [], value.gem)
        if ((playerGem.qty + playerCardCount) >= value.qty  ) {
            answer.push(true)
        }
    })
    return answer.length === thisCard.cost.length;
  };

  /* for each card in the row, render the card */
  return (
    <CardRowContainer>
      <CardBackDiv index={index}>
        <div style={{background: 'white', borderRadius: '50%', height: '2em', width: '2em', textAlign: 'center', border: 'solid 1px black', marginTop: '-.75em', marginLeft: '-.75em', justifyContent: "center", alignItems:"center", display: 'flex'}}>{count}</div></CardBackDiv>
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
