import { useEffect, useState } from "react";
import * as C from "./App.styles";
import InfoItem from "./components/InfoItem";
import logoImage from "./assets/devmemory_logo.png";
import Button from "./components/Button";
import RestartIcon from "./svgs/restart.svg";
import { GridItemType } from "./Types/GridItemType";
import { Items } from "./data/Items";
import GridItem from "./components/GridItem";
import { formatTimeElapsed } from "./Helpers/formatTimeElapsed";

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);
  useEffect(() => {
    resetAndCreateGrid();
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);
  // Verifica se as cartas são iguais
  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItems.filter((item) => item.shown === true);
      if (opened.length === 2) {
        // Verificação 1 - Se eles são iguais, torna-los "permanente"
        if (opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].permamentShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid);
          setShownCount(0);
          // Verificação 2 - Se eles não são iguais, fecha as cartas
        } else {
          setTimeout(() => {
            let tmpGrid = [...gridItems];
            for (let w in tmpGrid) {
              tmpGrid[w].shown = false;
            }
            setGridItems(tmpGrid);
            setShownCount(0);
          }, 1000);
        }
        setMoveCount((moveCount) => moveCount + 1);
      }
    }
  }, [shownCount, gridItems]);
  // Verificando se o jogo acabou
  useEffect(() => {
    if (
      moveCount > 0 &&
      gridItems.every((item) => item.permamentShown === true)
    ) {
      setPlaying(false);
    }
  }, [moveCount, gridItems]);
  const resetAndCreateGrid = () => {
    // Resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);
    // Criar o grid
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < Items.length * 2; i++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permamentShown: false,
      });
    }
    // Preenchendo o grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < Items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (Items.length * 2));
        }
        tmpGrid[pos].item = i;
      }
    }
    // Jogar no state
    setGridItems(tmpGrid);
    // Começar o jogo
    setPlaying(true);
  };
  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let cloneGrid = [...gridItems];
      if (
        cloneGrid[index].permamentShown === false &&
        cloneGrid[index].shown === false
      ) {
        cloneGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }
      setGridItems(cloneGrid);
    }
  };

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} alt="" width="200" />
        </C.LogoLink>
        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
        </C.InfoArea>
        <Button
          label="Reiniciar"
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
