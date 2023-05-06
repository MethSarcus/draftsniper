import {
  SimpleGrid,
  Box,
  Center,
  useStyleConfig,
  HStack,
} from "@chakra-ui/react";

type MyProps = {
  variant: string;
  size: string;
};

const FlexPositionBadge = (props: MyProps) => {
  const { variant, size, ...rest } = props;
  const styles = useStyleConfig("FlexPositionBadge", { variant, size });
  let includedPositions = [];

  switch (variant) {
    case "SUPER_FLEX": {
      includedPositions.push(<Center key={"w"} h={"50%"} bg="position.WR">W</Center>);
      includedPositions.push(<Center key={"r"} h={"50%"} bg="position.RB">R</Center>);
      includedPositions.push(<Center key={"t"} h={"50%"} bg="position.TE">T</Center>);
      includedPositions.push(<Center key={"q"} h={"50%"} bg="position.QB">Q</Center>);
      break;
    }
    case "REC_FLEX": {
      includedPositions.push(<Center key={"w"} h={"100%"} bg="position.WR">W</Center>);
      includedPositions.push(<Center key={"t"} h={"100%"} bg="position.TE">T</Center>);
      break;
    }
    case "WRRB_FLEX": {
      includedPositions.push(<Center key={"w"} h={"100%"} bg="position.WR">W</Center>);
      includedPositions.push(<Center key={"r"} h={"100%"} bg="position.RB">R</Center>);
      break;
    }
    case "IDP_FLEX": {
      includedPositions.push(<Center key={"dl"} h={"100%"} bg="position.DL">DL</Center>);
      includedPositions.push(<Center key={"db"} h={"100%"} bg="position.DB">DB</Center>);
      includedPositions.push(<Center key={"lb"} h={"100%"} bg="position.LB">LB</Center>);
      break;
    }
    case "FLEX": {
      includedPositions.push(<Center key={"w"} h={"100%"} bg="position.WR">W</Center>);
      includedPositions.push(<Center key={"r"} h={"100%"} bg="position.RB">R</Center>);
      includedPositions.push(<Center key={"t"} h={"100%"} bg="position.TE">T</Center>);
      break;
    }
    
    case "BN": {
      break;
    }
  }
  return (
    <SimpleGrid __css={styles} {...rest}>
      {includedPositions}
    </SimpleGrid>
  );
};

export default FlexPositionBadge;
