import { GridItemType } from "../../Types/GridItemType";
import * as C from "./styles";
import b7svg from "../../svgs/b7.svg";
import { Items } from "../../data/Items";

type Props = {
  item: GridItemType;
  onClick: () => void;
};

const GridItem = ({ item, onClick }: Props) => {
  return (
    <C.Container
      showBackground={item.permamentShown || item.shown}
      onClick={onClick}
    >
      {item.permamentShown === false && item.shown === false && (
        <C.Icon src={b7svg} alt="" opacity={0.1} />
      )}
      {(item.permamentShown || item.shown) && item.item !== null && (
        <C.Icon src={Items[item.item].icon} alt="" />
      )}
    </C.Container>
  );
};

export default GridItem;
