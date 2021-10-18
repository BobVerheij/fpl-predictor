import React from "react";
import { useStore } from "../../stores/ZustandStore";
import * as Styled from "./FilterBar.styled";
import Filter from "./Filter";

const FilterBar = () => {
  const setPositionFilter = useStore((state) => state.setPositionFilter);
  const positionFilter = useStore((state) => state.positionFilter);

  const handleClick = (v) => {
    if (positionFilter.length === 1 && positionFilter.includes(v)) {
      setPositionFilter([1, 2, 3, 4]);
    } else if (positionFilter.length === 4) {
      setPositionFilter([v]);
    } else if (positionFilter.includes(v)) {
      setPositionFilter([...positionFilter].filter((a) => a !== v));
    } else {
      setPositionFilter([...positionFilter, v]);
    }
  };

  return (
    <Styled.FilterBar>
      <h3>Filter:</h3>
      <Filter
        filterList={positionFilter}
        handleClick={handleClick}
        value={1}
        name={"GK"}
      ></Filter>
      <Filter
        filterList={positionFilter}
        handleClick={handleClick}
        value={2}
        name={"DEF"}
      ></Filter>
      <Filter
        filterList={positionFilter}
        handleClick={handleClick}
        value={3}
        name={"MID"}
      ></Filter>
      <Filter
        filterList={positionFilter}
        handleClick={handleClick}
        value={4}
        name={"FWD"}
      ></Filter>
    </Styled.FilterBar>
  );
};
export default FilterBar;
