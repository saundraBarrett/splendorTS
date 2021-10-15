import sapphire from "../assets/sapphire.png";
import emerald from "../assets/emerald.png";
import ruby from "../assets/ruby.png";
import diamond from "../assets/diamond.png";
import onyx from "../assets/onyx.png";
import gold from "../assets/gold.png";
import styled from "styled-components";

type GemProps = {
  height?: string;
  gem?: string;
}
const GemDiv = styled.img<GemProps>`
  height: ${(props: GemProps) => (props.height ? props.height : '100%')};
`;

// return image to be used in different places
const GemImage: React.FC<GemProps> = (props) => {
  const { gem, height } = props
  switch (gem) {
    case "SAPPHIRE":
      return <GemDiv src={sapphire} height={height}/>;
    case "EMERALD":
      return <GemDiv src={emerald} height={height} />;
    case "RUBY":
      return <GemDiv src={ruby} height={height} />;
    case "DIAMOND":
      return <GemDiv src={diamond} height={height} />;
    case "ONYX":
      return <GemDiv src={onyx} height={height} />;
    case "GOLD":
      return <GemDiv src={gold}  height={height}/>;
    default:
      return null;
  }
};

export default GemImage;
