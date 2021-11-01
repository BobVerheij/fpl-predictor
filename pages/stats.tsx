import React from "react";
import Slider from "../src/components/slider/Slider";
import { useStore } from "../src/stores/ZustandStore";
import { useState } from "react";
import { NewBootstrap, NewElement } from "../src/types/Types";

import SortBar from "../src/components/filters/SortBar";

import NavBar from "../src/components/navigation/NavBar";
import FilterBar from "../src/components/filters/FilterBar";

import LoadingAnimation from "../src/components/loading/LoadingAnimation";
import { highestOptions } from "../src/constants/HighestOptions";
import StatsContainer from "../src/components/stats/StatsContainer";

const StatsPage = () => {
  const [calcStart, setCalcStart] = useState<number>(1);
  const bootstrap = useStore((state) => state.bootstrap);
  const current = useStore((state) => state.current);
  const isLoading = useStore((state) => state.isLoading);

  const positionFilter = useStore((state) => state.positionFilter);
  const sort = useStore((state) => state.sort);

  const calcRange = [calcStart, current];

  const sortByAverages = (elements: NewElement[]) => {
    return elements
      ?.map((element) => ({
        ...element,
        sortStats: {
          a:
            element.history?.reduce(
              (acc, history) =>
                (acc +=
                  history.gameweek >= calcRange[0] - 1 &&
                  parseInt(history.stats[sort[0]]) | history.stats[sort[0]]),
              0
            ) /
            (calcRange[1] - (calcRange[0] - 1)),
          b:
            sort[1] &&
            element.history?.reduce(
              (acc, history) =>
                (acc +=
                  history.gameweek >= calcRange[0] - 1 &&
                  parseInt(history.stats[sort[1]]) | history.stats[sort[1]]),
              0
            ) /
              (calcRange[1] - (calcRange[0] - 1)),
        },
      }))
      ?.filter(
        (element) =>
          element.sortStats.a !== 0 && (sort[1] && element.sortStats.b) !== 0
      )
      .sort((a, b) => {
        if (b.sortStats.b && a.sortStats.b) {
          return b.sortStats.a / b.sortStats.b - a.sortStats.a / a.sortStats.b;
        }
        return b.sortStats.a - a.sortStats.a;
      });
  };

  const filteredElements = (
    bootstrap: NewBootstrap,
    offset?: number,
    limit?: number
  ) => {
    return sortByAverages(
      bootstrap?.elements?.filter((element) =>
        positionFilter.includes(element.element_type)
      )
    )?.slice(offset | 0, limit | 20);
  };

  return (
    <>
      <NavBar />
      {isLoading && <LoadingAnimation />}
      <FilterBar></FilterBar>
      <SortBar></SortBar>

      <Slider
        onBlur={setCalcStart}
        current={current}
        calcStart={calcStart}
      ></Slider>

      <div
        style={{
          margin: "0 auto",
          maxWidth: "400px",
          display: "flex",
          flexFlow: "row wrap",
        }}
      >
        {filteredElements(bootstrap)?.map((element: NewElement) => (
          <StatsContainer
            element={element}
            calcRange={calcRange}
          ></StatsContainer>
        ))}
      </div>
    </>
  );
};

export default StatsPage;
