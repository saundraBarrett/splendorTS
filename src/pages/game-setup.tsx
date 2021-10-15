import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

import { tokenSet } from "../helpers";
import { firebase } from "../initFirebase";
import { IGame } from "../types/game";

const db = firebase.database();

type GameProps = {
  id: string;
};

const GameSetupPage = () => {
  const history = useHistory();
  const [game, setGame] = useState<IGame | null>(null);
  const [playerUUID] = useState(uuidv4())
  const [playerName, setPlayerName] = useState("Player");
  const [playerTokens] = useState(tokenSet());
  const [player] = useState({
    name: playerName,
    tokens: playerTokens,
    cards: [],
    victoryPoints: 0,
    nobles: [],
    uuid: playerUUID
  });

  const { id } = useParams<GameProps>();

  useEffect(() => {
    const ref = db.ref(`games/${id}`);
    ref.on("value", (snapshot) => {
      setGame(snapshot.val());
    });
    localStorage.setItem(`${id}`, playerUUID);
  }, [id, playerUUID]);

  // Let user add themselves to an existing game
  const addPlayer = () => {
    const copy = { ...game };
    let thisPlayer = player;
    thisPlayer.name = playerName
    copy?.players?.push(thisPlayer);
    let newPlayers = copy.players;
    copy.players = newPlayers;
    db.ref(`games/${id}`).set(copy);
  }

  /* To do: randomly generate starting board */
  return (
    <div>
     <form
        onSubmit={(e) => {
          e.preventDefault();
          addPlayer()
          history.push({
            // to do: add intermediary step to the invite page that adds players into the system
            pathname:  `/game/${id}/play`
         })
        }}
      >
        <input
          name="player"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
       
        <button type="submit">Lets Play</button>
      </form>
      
    </div>
  );
};

export default GameSetupPage;
