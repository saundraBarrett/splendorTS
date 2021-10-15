import _ from "lodash";

import styled from "styled-components";
import { Gems } from "../constants/gems";
import { tokens } from "../constants/tokens";
import { IPlayer } from "../types/player";
import { countOccurrences } from "../helpers";


const PlayerDiv = styled.div`
  margin: 1em 0;
  background: rgba(0, 0, 0, 0.3);
  -webkit-border-top-right-radius: 15px;
  -webkit-border-bottom-right-radius: 15px;
  -moz-border-radius-topright: 15px;
  -moz-border-radius-bottomright: 15px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const CardCountContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 7px;
  grid-row-gap: 10px;
  padding: 0.5em;
`;

type CardCountDivProps = {
  gem?: string;
};

const CardCountDiv = styled.div<CardCountDivProps>`
  border: solid 1px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  height: 45px;
  position: relative;
  background: ${(props: CardCountDivProps) => {
    switch (props.gem) {
      case Gems.RED:
        return "rgba(var(--RUBY), var(--PLAYER-BOARD-CARD-OPACITY));";
      case Gems.BLACK:
        return "rgba(var(--ONYX), var(--PLAYER-BOARD-CARD-OPACITY));";
      case Gems.GREEN:
        return "rgba(var(--EMERALD), var(--PLAYER-BOARD-CARD-OPACITY));";
      case Gems.BLUE:
        return "rgba(var(--SAPPHIRE), var(--PLAYER-BOARD-CARD-OPACITY));";
      case Gems.WHITE:
        return "rgba(var(--DIAMOND), var(--PLAYER-BOARD-CARD-OPACITY));";
      default:
        return "transparent";
    }
  }};
`;

const GemImageContainer = styled.div<CardCountDivProps>`
  height: 20px;
  width: 20px;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  bottom: -12px;
  border-radius: 50%;
  text-align: center;
  border-width: 3px;
  border-style: solid;
  background: rgb(243, 208, 160);
  background-image: var(--TOKEN-BACKGROUND);
  font-weight: bold;
  border-color: ${(props: CardCountDivProps) => {
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

const PlayerBoard = (player: IPlayer) => {

  const playerTokenQty = (token: { id: number; gem: string }) => {
    let playerGem = _.find(player.tokens, function (t) {
      return t.gem === token.gem;
    });
    if (playerGem) {
      return playerGem.qty;
    } else {
      return 0;
    }
  };

  const playerCardQty = (token: { id: number; gem: string }) => {
    return countOccurrences(player.cards, token.gem);
  };

  return (
    <PlayerDiv>
      <h3>{player.name}</h3>
      <CardCountContainer>
        {tokens.map((token, index) => {
          return (
            <CardCountDiv gem={token.gem} key={`token_${index}_${player.uuid}`}>
              <GemImageContainer gem={token.gem}>
                {playerTokenQty(token)}
              </GemImageContainer>
              <div style={{ fontSize: "1.5em", textAlign: "center" }}>
                {player.cards && playerCardQty(token)}
              </div>
            </CardCountDiv>
          );
        })}
      </CardCountContainer>
    </PlayerDiv>
  );
};

export default PlayerBoard;
