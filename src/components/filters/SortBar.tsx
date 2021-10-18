import React, { useState } from "react";
import { useStore } from "../../stores/ZustandStore";
import * as Styled from "./FilterBar.styled";
import Filter from "./Filter";

const SortBar = () => {
  const setSort = useStore((state) => state.setSort);
  const sort = useStore((state) => state.sort);

  const handleClick = (v) => {
    if (sort.includes(v)) {
      if (sort.length === 1) {
        setSort(["total_points"]);
      } else {
        setSort([...sort].filter((a) => a !== v));
      }
    } else {
      setSort([...sort, v]);
    }
  };

  return (
    <Styled.FilterBar>
      <h3>Sort:</h3>
      <Filter
        isDraggable
        filterList={sort}
        handleClick={handleClick}
        name={"total points"}
        value={"total_points"}
      ></Filter>
      <Filter
        isDraggable
        filterList={sort}
        handleClick={handleClick}
        value={"bonus"}
      ></Filter>
      <Filter
        isDraggable
        filterList={sort}
        handleClick={handleClick}
        value={"bps"}
      ></Filter>
      <Filter
        isDraggable
        filterList={sort}
        handleClick={handleClick}
        value={"creativity"}
      ></Filter>
      <Filter
        isDraggable
        filterList={sort}
        handleClick={handleClick}
        value={"influence"}
      ></Filter>
      <Filter
        isDraggable
        filterList={sort}
        handleClick={handleClick}
        value={"threat"}
      ></Filter>
      <Filter
        isDraggable
        filterList={sort}
        handleClick={handleClick}
        name={"ict index"}
        value={"ict_index"}
      ></Filter>
    </Styled.FilterBar>
  );
};
export default SortBar;
