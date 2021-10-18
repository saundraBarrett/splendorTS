import React from "react";
import styled from "styled-components";
import { ICard } from "../types/card";
import GemImage from "./gem-image";
import cardBackground from "../assets/card-backgrounds.png";

type CardDivType = {
  canAfford?: boolean; ///Passing Optional Props
  disabled?: boolean;
  backgroundPosition?: string;
};

const CardDiv = styled.div<CardDivType>`
  border: solid 1px #ccc;
  min-width: 100%;
  max-width: 100%;
  border-radius: 0.5em;
  height: var(--CARD-WIDTH);
  display: flex;
    flex-direction: column;
  background-image: url(${cardBackground});
  background-position: ${(props: CardDivType) => (props.backgroundPosition ? props.backgroundPosition : '0 0')};
  border-color: green;
  border-width: ${(props: CardDivType) => (props.canAfford ? "5px" : "0")};
  border-style: solid;
  background-size: 500%;
  pointer-events: ${(props: CardDivType) => {
    if (props.disabled || !props.canAfford) {
      return "none";
    }
    else {
        return "auto"
    }
  }};
`;

const CardTop = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background: rgba(255, 255, 255, 0.7);
  padding: 0.5em;
  overflow: hidden;
`;
const CardBottom = styled.div`
  display: flex;
  justify-content: bottom;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
  padding: .25em;
`;

type CardProps = {
  card: ICard;
  saveCard(arg: number): void;
  canAfford: boolean;
  disabled: boolean;
};

const Card: React.FC<CardProps> = (props) => {
  const { saveCard, card, canAfford, disabled } = props;

  return (
    <CardDiv
      canAfford={canAfford}
      disabled={disabled}
      onClick={() => saveCard(card.id)}
      backgroundPosition={card.backgroundPosition}
    >
      <CardTop>
        <div
          style={{
            textShadow: "var(--TEXT-SHADOW)",
            color: "white",
            fontSize: "2em",
            minHeight: "1em",
          }}
        >
          {card.victoryPoints > 0 && card.victoryPoints}
        </div>
        <div style={{ textAlign: "right", height: "2.5em" }}>
          <GemImage gem={card.gem} />
        </div>
      </CardTop>
      <CardBottom>
        {card.cost.map((cost, index) => {
          return (
            <div key={`${cost.gem}_${index}`}
              className={`${cost.gem}`}
              style={{
                borderRadius: "50%",
                height: "1.25em",
                width: "1.25em",
                textAlign: "center",
                fontSize: "1.5em",
                border: "solid 1px white",
              }}
            >
              {cost.qty}
            </div>
          );
        })}
      </CardBottom>
    </CardDiv>
  );
};

export default Card;
