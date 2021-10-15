import React, { useState } from "react";
import { useHistory } from "react-router";
import _ from "lodash";

import { v4 as uuidv4 } from "uuid";
import { cards } from "../constants/cards";
import { tokenSet } from "../helpers";
import { firebase } from "../initFirebase";

const db = firebase.database();

const NewGamePage = () => {
  const history = useHistory();
  const [playerName, setPlayerName] = useState("Player1");
  const [playerUUID] = useState(uuidv4());
  const [playerTokens] = useState(tokenSet());
  const [boardTokens] = useState(tokenSet(true));
  const level1Cards = _(cards)
    .filter((c) => c.level === 1)
    .map("id")
    .shuffle()
    .value();
  console.log(level1Cards);

  const level2Cards = _(cards)
    .filter((c) => c.level === 2)
    .map("id")
    .shuffle()
    .value();

  const level3Cards = _(cards)
    .filter((c) => c.level === 3)
    .map("id")
    .shuffle()
    .value();

  const [player] = useState({
    name: playerName,
    tokens: playerTokens,
    cards: null,
    victoryPoints: 0,
    uuid: playerUUID,
  });

  const startNewGame = () => {
    let thisPlayer = player;
    thisPlayer.name = playerName;
    thisPlayer.uuid = playerUUID;
    const gamesRef = db.ref("games");
    const newGameRef = gamesRef.push();
    newGameRef.set({
      players: [thisPlayer],
      turn: playerUUID,
      first: 0,
      cardBank: [level3Cards, level2Cards, level1Cards],
      tokenBank: boardTokens,
    });
    localStorage.setItem(`${newGameRef.key}`, playerUUID);
    history.push({
      // to do: add intermediary step to the invite page that adds players into the system
      pathname: `/game/${newGameRef.key}/play`,
    });
  };

  /* To do: randomly generate starting board */
  return (
    <div>
      <h1>Start New Game</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          startNewGame();
        }}
      >
        <input
          name="player1"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button type="submit">Lets Play</button>
      </form>
    </div>
  );
};

export default NewGamePage;
