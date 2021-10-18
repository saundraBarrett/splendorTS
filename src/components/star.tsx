import styled from "styled-components";


type StarProps = {
    content?: string | number;
}

const StarDiv = styled.div`
height: 50px;
width: 50px;
-webkit-clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
text-align: center;
font-size: 1em;
display: flex;
align-items: center;
justify-content: center;
font-weight: bold;
background: rgb(var(--GOLD));
color: black;
    
    &:before {  
        display: inline-block;
        height: 100%;
        background: blue;
        vertical-align: middle;
        content: '';
    }
`

const Star: React.FC<StarProps> = (props) => {
    return <StarDiv>{props?.content}</StarDiv>
}

export default Star;