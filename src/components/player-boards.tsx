import styled from "styled-components";
import _ from "lodash";

import PlayerBoard from "./player-board";
import { IGame } from "../types/game";

const PlayerBoardsContainer = styled.div`
  display: flex;
 flex-direction:column;
`;

const PlayerBoards = (players: IGame['players']) => {
  return (
    <PlayerBoardsContainer>
        {_.map(players, (player, index) => {
             return <PlayerBoard {...player} key={index} />
        })}
    </PlayerBoardsContainer>
  );
};

export default PlayerBoards;
