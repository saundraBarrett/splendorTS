import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { Gems } from '../constants/gems';

import { countOccurrences } from '../helpers';
import { IPlayer } from '../types/player';
import Token from './token';

type PlayerGemDivProps = {
    gem: string;
}

const PlayerGemContainerDiv = styled.div`
display: flex;
padding: 1em;
background: rgba(3,3,3,1);
color: white;
`

const PlayerGemDiv = styled.div<PlayerGemDivProps>`
border: solid 1px rgba(0, 0, 0, 0.25);
grid-template-columns: 2fr 1fr;
  border-radius: 5px;
  height: 2em;
  width: 3em;
  position: relative;
  display: grid;
  align-items: center;
  column-gap: 0px;
  font-size: 2em;
  padding: .25em;
  background: ${(props: PlayerGemDivProps) => {
    switch (props.gem) {
      case Gems.RED:
        return "rgba(var(--RUBY), 1);";
      case Gems.BLACK:
        return "rgba(var(--ONYX), 1);";
      case Gems.GREEN:
        return "rgba(var(--EMERALD), 1);";
      case Gems.BLUE:
        return "rgba(var(--SAPPHIRE), 1);";
      case Gems.WHITE:
        return "rgba(var(--DIAMOND), 1);";
      default:
        return "transparent";
    }
  }};
`

const TokenCountDiv = styled.div`
border-radius: 50%;
border: solid 1px black;
`

const CardCountDiv = styled.div`
text-align: center;
padding: .25em;
border-radius: 5px;
border: solid 1px black;`

type PlayerDetailsProps = {
    player?: IPlayer
}



const PlayerDetails: React.FC<PlayerDetailsProps> = (props) => {
    let { player } = props;
    return (
    <PlayerGemContainerDiv>
        My Gems
        <TokenCountDiv>/10</TokenCountDiv>
        {_.filter(player?.tokens, function(token) {
            return token.gem !== Gems.YELLOW
        }).map((t) => {
            let thisToken = {'gem': t.gem, 'qty': t.qty}
            return <PlayerGemDiv gem={t.gem}>
                <Token token={thisToken} size='small' >{t.qty}</Token> 
                <CardCountDiv>
                {countOccurrences(player?.cards ? player.cards : [], t.gem)}
                </CardCountDiv>
            </PlayerGemDiv>
        })}
    </PlayerGemContainerDiv>
    )
}

export default PlayerDetails;