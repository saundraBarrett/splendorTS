import React from "react";
import styled from "styled-components";
import Noble from "./noble";

const BoardNobleContainer = styled.div`
align-items: center;
padding: 0 1em;`

type BoardNobleProps = {
    boardNobles: any[],
}
const BoardNobles: React.FC<BoardNobleProps> = (props) => {

    const {boardNobles} = props;

    return (
        <BoardNobleContainer>
           {boardNobles && boardNobles.map((noble) => {
               return <Noble key={`noble_${noble}`}noble={noble}/>
           })}
        </BoardNobleContainer>
    )
}

export default BoardNobles;