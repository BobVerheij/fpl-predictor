import React, { useEffect } from "react";

import { Button, Select } from "antd";
import { Element } from "fpl-api";
import { fetchFixtures } from "../src/services/fetchApiData";
import { useState } from "react";
import { useStore } from "../src/stores/ZustandStore";
import { uuid } from "uuidv4";

import FilterBar from "../src/components/filters/FilterBar";
import SortBar from "../src/components/filters/SortBar";
import StatsContainer from "../src/components/stats/StatsContainer";
import { RangeSelector } from "../src/components/stats/RangeSelector.styled";

interface IPLayerValues {
  id: number;
  stat: number;
  count: number;
  difficulties: number[];
}

const StatsPage = () => {
  const bootstrap = useStore((state) => state.bootstrap);
  const current = useStore((state) => state.current);
  const fixtures = useStore((state) => state.fixtures);
  const liveDetails = useStore((state) => state.liveDetails);
  const positionFilter = useStore((state) => state.positionFilter);
  const sort = useStore((state) => state.sort);
  const setFixtures = useStore((state) => state.setFixtures);
  const range = useStore((state) => state.range);
  const setRange = useStore((state) => state.setRange);
  const setSpan = useStore((state) => state.setSpan);
  const span = useStore((state) => state.span);

  const [playerValues, setPlayerValues] = useState<
    { id: number; stat: number; count: number }[]
  >([]);

  console.log(range[1] - span, range[1]);

  const updateValues = () => {
    let baseValues: IPLayerValues[] = [];
    liveDetails?.slice(range[0] - span, range[1]).map((details) => {
      return details.elements.map((element) => {
        if (baseValues.find((values) => values.id === element.id)) {
          if (element.stats["minutes"]) {
            baseValues.find((values) => values.id === element.id).count++;
          }
          baseValues.find((values) => values.id === element.id).stat +=
            parseInt(element.stats[sort[0]]);
        } else {
          baseValues.push({
            id: element.id,
            stat: parseInt(element.stats[sort[0]]),
            count: 1,
            difficulties: [0],
          });
        }
      });
    });

    setPlayerValues(baseValues);
  };

  useEffect(() => {
    (async () => {
      setFixtures(await fetchFixtures());
    })();

    updateValues();
  }, []);

  useEffect(() => {
    setRange([0, current]);
  }, [current]);

  useEffect(() => {
    updateValues();
  }, [range, sort, span]);

  const bestPlayers: {
    player: Element;
    stat: number;
    count: number;
    difficulties: number[];
  }[] = [...playerValues]
    .map((values) => {
      const player = bootstrap?.elements?.find(
        (element) => element?.id === values?.id
      );
      const stat = values.stat / values.count;
      return { player, stat, count: values.count };
    })
    .filter((element) => positionFilter.includes(element.player.element_type))
    .filter((element) => element.count > span / 2)
    .sort((a, b) => b.stat - a.stat)
    .map((element) => {
      const { player } = element;
      const difficulties = [...fixtures]
        .filter(
          (fixture) =>
            (fixture.team_a === player.team ||
              fixture.team_h === player.team) &&
            !fixture.finished &&
            fixture.kickoff_time
        )
        .sort(
          (a, b) =>
            new Date(a.kickoff_time).getTime() -
            new Date(b.kickoff_time).getTime()
        )
        .slice(0, 5)
        .map((fixture) => {
          if (fixture.team_a === player.team) {
            return fixture.team_a_difficulty;
          }
          return fixture.team_h_difficulty;
        });
      return { ...element, difficulties };
    })
    .filter((element) => {
      const sum = element.difficulties.reduce((acc, diff) => acc + diff, 0);
      return sum / element.difficulties.length <= 3;
    })
    // .filter((element) => element.player.team_code === 21)
    .slice(0, 40);

  const rangeItems = Array.apply(null, Array(current)).map(function () {});

  console.log(bestPlayers);

  return (
    <>
      <FilterBar></FilterBar>
      <SortBar></SortBar>
      <RangeSelector>
        <Select
          onChange={(value: number) => {
            setRange([value, range[1]]);
          }}
          defaultValue={0}
        >
          {rangeItems.slice(0, range[1]).map((_, index) => (
            <Select.Option value={index}>GW {index + 1}</Select.Option>
          ))}
        </Select>

        <Select
          onChange={(value) => {
            setSpan(value);
          }}
          defaultValue={4}
        >
          <Select.Option value={1}>Weekly</Select.Option>
          <Select.Option value={2}>Bi-weekly</Select.Option>
          <Select.Option value={4}>Monthly</Select.Option>
          <Select.Option value={8}>Bi-monthly</Select.Option>
          <Select.Option value={Math.floor(range[1] / 2)}>
            Half-Season
          </Select.Option>
          <Select.Option value={range[1] - 1}>Start-Now</Select.Option>
          <Select.Option value={range[1]}>Full Season</Select.Option>
        </Select>

        <Select
          onChange={(value: number) => {
            setRange([range[0], value]);
          }}
          defaultValue={range[1]}
        >
          {rangeItems.slice(range[0], 40).map((_, index) => (
            <Select.Option value={index + range[0] + 1}>
              GW {index + 1 + range[0]}
            </Select.Option>
          ))}
        </Select>
      </RangeSelector>

      <div
        style={{
          margin: "0 auto",
          maxWidth: "400px",
          display: "flex",
          flexFlow: "column nowrap",
          gap: "1rem",
        }}
      >
        {bestPlayers.map((element) => (
          <StatsContainer key={uuid()} element={element}></StatsContainer>
        ))}
      </div>
    </>
  );
};

export default StatsPage;
