import React from "react";
import styled from "styled-components";
import { Gems } from "../constants/gems";
import nobles from "../constants/nobles";
import nobleBackground from "../assets/nobles.jpeg";

type NobleDivProps = {
  backgroundPosition?: string;
  compact?: boolean;
}

const NobleDiv = styled.div<NobleDivProps>`
  border-radius: 15px;
  background: red;
  height: ${(props: NobleDivProps) => props.compact ? '3em' : '9em'};
  width: ${(props: NobleDivProps) => props.compact ? '3em' : '9em'};
  display: flex;
  border: solid 1px #ccc;
  border-radius: 0.5em;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: row;
  pointer-events: none;
  margin-bottom: 1em;
  background-size: calc(10em * 5);
  background-image: url(${nobleBackground});
  background-position: ${(props: NobleDivProps) => (props.backgroundPosition ? props.backgroundPosition : '0 0')};
`;

const NobleDetailsDiv = styled.div`
  background: rgba(255, 255, 255, 0.5);
  font-size: 1.25em;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: bottom;
  -webkit-justify-content: bottom;
  -ms-flex-pack: bottom;
  justify-content: bottom;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: .25em;
`;
type NobleCostProps = {
  gem: string;
};
const NobleCostDiv = styled.div`
  padding: 0.25em;
  border-radius: 5px;
  margin-top: .25em;
  color: white;
  text-shadow: var(--TEXT-SHADOW);
  background: ${(props: NobleCostProps) => {
    switch (props.gem) {
      case Gems.RED:
        return "rgb(var(--RUBY));";
      case Gems.BLACK:
        return "rgb(var(--ONYX));";
      case Gems.GREEN:
        return "rgb(var(--EMERALD));";
      case Gems.BLUE:
        return "rgb(var(--SAPPHIRE));";
      case Gems.WHITE:
        return "rgb(var(--DIAMOND));";
      default:
        return "transparent";
    }
  }};
`;

const NoblePointsDiv = styled.div`
flex-grow: 1;
text-shadow: var(--TEXT-SHADOW);
text-align: right;
padding: 0 .25em;
color: white;
font-size: 4em;`

type NobleProps = {
  noble: number;
  compact?: boolean;
};

const Noble: React.FC<NobleProps> = (props) => {
  const { noble, compact } = props;
  const nobleDetails = nobles.find((n) => {
    return n.id === noble;
  });
  return (
    <NobleDiv backgroundPosition={nobleDetails?.backgroundPosition} compact={props.compact}>
      {!compact &&
     ( <><NobleDetailsDiv>
        {nobleDetails?.cost.map((cost) => {
          return (
            <NobleCostDiv key={`${noble}_${cost.gem}`} gem={cost.gem}>
              {cost.qty}
            </NobleCostDiv>
          );
        })}
      </NobleDetailsDiv>
      <NoblePointsDiv>
      {nobleDetails?.victoryPoints}
      </NoblePointsDiv></>)
      }
    </NobleDiv>
  );
};

export default Noble;
