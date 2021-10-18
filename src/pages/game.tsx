import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import _ from "lodash";
import styled from "styled-components";

import { firebase } from "../initFirebase";
import TokenBank from "../components/token-bank";
import { IGame } from "../types/game";
import PlayerBoards from "../components/player-boards";
import BoardCards from "../components/boards-cards";
import { cards } from "../constants/cards";
import { countOccurrences } from "../helpers";
import BoardNobles from "../components/board-nobles";
import nobles from "../constants/nobles";
import { Gems } from "../constants/gems";
import { IPlayer } from "../types/player";

const db = firebase.database();

type GameProps = {
  id: string;
};

const GameBoardContainerDiv = styled.div`
  display: grid;
  padding: 0 2em;
  grid-template-columns: 2fr 6fr repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 0px;
  @media (min-width: 1200px) { 
    grid-template-columns: 5fr repeat(2, 1fr) 2fr;
  }
`;

const GamePage = () => {
  const history = useHistory();
  const [game, setGame] = useState<IGame | null>(null);
  const { id } = useParams<GameProps>();
  const [playerUUID] = useState(localStorage.getItem(id));

  useEffect(() => {
    const ref = db.ref(`games/${id}`);
    ref.on("value", (snapshot) => {
      setGame(snapshot.val());
    });

    return () => {
      ref.off();
    };
  }, [id]);

  useEffect(() => {
    const ref = db.ref(`games/${id}`);
    ref.on("value", (snapshot) => {
      setGame(snapshot.val());
    });

    return () => {
      ref.off();
    };
  }, [id]);

  const evaluateVictorPoints = (activePlayer: IPlayer) => {
    if (activePlayer.victoryPoints >= 10) {
      alert(`${activePlayer.name} Wins`)
    }
  }

  const updateTokenCount = (tokenIndex: number) => {
    if (!game) {
      return;
    }
    const copy = { ...game };
    copy.tokenBank[tokenIndex].qty = copy.tokenBank[tokenIndex].qty - 1;
    saveToDB(copy);
  };

  const setNextTurn = (activePlayerIndex: number, players: any[]) => {
    /*  find the next player and set the turn to them
    if the index is the last index, start at the beginning */
    if (activePlayerIndex + 1 === players.length) {
      /* set back to the beginning player */
      return players[0].uuid;
    } else {
      /* set turn to the next player */
      return players[activePlayerIndex + 1].uuid;
    }
  };

  const saveToDB = (copy: IGame) => {
    db.ref(`games/${id}`).set(copy);
  };

  const saveTokens = (tokens: Array<number>) => {
    if (!game) {
      return;
    }
    const copy = { ...game };

    /* find out who made the move */
    let activePlayerIndex = _.findIndex(copy.players, function (o) {
      return o.uuid === copy.turn;
    });

    /* for each selected token, remove from the bank and add to users token collection */
    _.forEach(tokens, function(tokenIndex) {
      copy.players[activePlayerIndex].tokens[tokenIndex].qty =
      copy.players[activePlayerIndex].tokens[tokenIndex].qty + 1;
    })

    copy.turn = setNextTurn(activePlayerIndex, copy.players);

    /* save to firebase DB */
    saveToDB(copy);
  };

  const getActivePlayerName = () => {
    if (!game) {
      return;
    }
    let activePlayer = _.find(game.players, function (o) {
      return o.uuid === game.turn;
    });

    return activePlayer?.name
  }

  const saveCard = (card: number) => {
    if (!game) {
      return;
    }
    const copy = { ...game };
    /* find out who made the move */
    let activePlayerIndex = _.findIndex(copy.players, function (o) {
      return o.uuid === copy.turn;
    });

    /* find the card in the constants to get the level */
    const thisCard = _.find(cards, function (c) {
      return c.id === card;
    });

    let cardGem;

    if (thisCard) {
    let cardRowIndex;
      switch (thisCard.level) {
        case 1:
          cardRowIndex = 2
          break;
        case 2: 
          cardRowIndex = 1
          break;
        case 3:
          cardRowIndex = 0
          break;
      }


      if (cardRowIndex !== undefined) {
        cardGem = thisCard.gem;
        let cardIndex = _.findIndex(copy.cardBank[cardRowIndex], function (c) {
          return c === card;
        });
  
        /* replace the selected card with the 5th card and remove the 5th card */
        if(copy.cardBank.length > 4) {
          copy.cardBank[cardRowIndex][cardIndex] = copy.cardBank[cardRowIndex][5];
          copy.cardBank[cardRowIndex].splice(5, 1);
        }
        else {
          copy.cardBank[cardRowIndex].splice(cardIndex, 1);
        }  
      }

      /* take the gem from the user and put it back into the bank */
      _.forEach(thisCard.cost, function(token) {
        const tokenBankIndex = _.findIndex(copy.tokenBank, function(t) {
          return t.gem === token.gem
        })
        const playerTokenIndex = _.findIndex(copy.players[activePlayerIndex].tokens, function(p) {
          return p.gem === token.gem
        })

        /* if the player has card, check to see how many tokens should be spent */
        if (copy.players[activePlayerIndex].cards) {
          const playerCardCount = countOccurrences(copy.players[activePlayerIndex].cards, token.gem);
          if (playerCardCount < token.qty) {
            copy.tokenBank[tokenBankIndex].qty = copy.tokenBank[tokenBankIndex].qty + (token.qty-playerCardCount);
            copy.players[activePlayerIndex].tokens[playerTokenIndex].qty = copy.players[activePlayerIndex].tokens[playerTokenIndex].qty - (token.qty-playerCardCount);
          }
        }
        else {
          copy.players[activePlayerIndex].tokens[playerTokenIndex].qty= copy.players[activePlayerIndex].tokens[playerTokenIndex].qty - token.qty;
          copy.tokenBank[tokenBankIndex].qty = copy.tokenBank[tokenBankIndex].qty + (token.qty);
        }

        console.log(thisCard)
        console.log(copy.players[activePlayerIndex].victoryPoints)

        /* add victory points to player */
        copy.players[activePlayerIndex].victoryPoints = copy.players[activePlayerIndex].victoryPoints + thisCard.victoryPoints;
      })
    }
    
    /* add the card to the users cards array */
    if (copy.players[activePlayerIndex].cards) {
      copy.players[activePlayerIndex].cards = [
        ...copy.players[activePlayerIndex].cards,
        cardGem,
      ];
    }
    else {
      copy.players[activePlayerIndex].cards = [cardGem]
    }

    /* check if player gets noble */
    _.forEach(copy.boardNobles, function(boardNoble, index) {
      let noble = _.find(nobles, function(n) {
        return n.id === boardNoble
      })
      let canAfford: any[] = [];
      _.forEach(noble?.cost, function(cost) {
        let playerCardCount = countOccurrences(copy.players[activePlayerIndex].cards, cost.gem)
        if (playerCardCount >= cost.qty) {
          canAfford.push(true)
        }
      })
      if (canAfford.length === noble?.cost.length) {
        copy.players[activePlayerIndex].victoryPoints = copy.players[activePlayerIndex].victoryPoints + noble.victoryPoints;
        if (copy.players[activePlayerIndex].nobles) {
          copy.players[activePlayerIndex].nobles = [
            ...copy.players[activePlayerIndex].nobles,
            noble.id,
          ];
        }
        else {
          copy.players[activePlayerIndex].nobles = [noble.id]
        }
        copy.boardNobles.splice(index, 1)
      }
    })

    copy.turn = setNextTurn(activePlayerIndex, copy.players);
    
    saveToDB(copy);
    evaluateVictorPoints(game.players[activePlayerIndex])
    
  };

  const getPlayerBank = () => {
    if (!game) {
      return;
    }
    let activePlayer = _.find(game.players, function (o) {
      return o.uuid === game.turn;
    });

    return activePlayer?.tokens;
  };

  const getPlayerCards = () => {
    if (!game) {
      return;
    }
    // iterate through tokens and cards to get total amounts
    // {gem: 'Name', tokens: number, card: number}
    let activePlayer = _.find(game.players, function (o) {
      return o.uuid === game.turn;
    });

    return activePlayer?.cards;
  };

  if (!game) return <div>Loading Game</div>;
  // if (game && game.players.length < 2) return <div>Waiting For Other Players to Join</div>;

  return (
    <main>
      <h1>{game.turn === playerUUID ? "Your Turn" :  `${getActivePlayerName()}'s Turn`}</h1>
      <GameBoardContainerDiv>
          
          <BoardCards
            cardBank={game.cardBank}
            saveCard={saveCard}
            playerGems={getPlayerBank()}
            playerCards={getPlayerCards()}
            disabled={game.turn !== playerUUID}
          />
          <TokenBank
            tokenBank={game.tokenBank}
            saveTokens={saveTokens}
            disabled={game.turn !== playerUUID}
            updateTokenCount={updateTokenCount}
          />
        <BoardNobles boardNobles={game.boardNobles}/>
        <PlayerBoards {...game.players} />
      </GameBoardContainerDiv>

      <button
        onClick={() => {
          history.push({
            pathname: `/new`,
          });
        }}
      >
        Start New Game
      </button>
    </main>
  );
};

export default GamePage;
