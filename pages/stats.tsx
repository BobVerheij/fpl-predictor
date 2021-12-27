import React, { useEffect } from "react";
import { fetchFixtures } from "../src/services/fetchApiData";
import { NewBootstrap, NewElement } from "../src/types/Types";
import { useState } from "react";
import { useStore } from "../src/stores/ZustandStore";
import { uuid } from "uuidv4";
import FilterBar from "../src/components/filters/FilterBar";
import Slider from "../src/components/slider/Slider";
import SortBar from "../src/components/filters/SortBar";
import StatsContainer from "../src/components/stats/StatsContainer";
import { stat } from "fs";
import { Element } from "fpl-api";
import { Button, Select } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { values } from "lodash";
import { element } from "prop-types";

const StatsPage = () => {
  const [calcStart, setCalcStart] = useState<number>(1);
  const bootstrap = useStore((state) => state.bootstrap);
  const current = useStore((state) => state.current);
  const positionFilter = useStore((state) => state.positionFilter);
  const sort = useStore((state) => state.sort);
  const liveDetails = useStore((state) => state.liveDetails);
  const [playerValues, setPlayerValues] = useState<
    { id: number; stat: number; count: number }[]
  >([]);

  const [fixtures, setFixtures] = useState(null);

  const [range, setRange] = useState([0, current]);

  const updateValues = () => {
    let baseValues: { id: number; stat: number; count: number }[] = [];

    liveDetails?.slice(range[0], range[1]).map((details) => {
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
  }, [range, sort]);

  const bestPlayers: { player: Element; stat: number; count: number }[] = [
    ...playerValues,
  ]
    .map((values) => {
      const player = bootstrap?.elements?.find(
        (element) => element?.id === values?.id
      );
      const stat = values.stat / values.count;
      return { player, stat, count: values.count };
    })
    .filter((element) => positionFilter.includes(element.player.element_type))
    .filter((element) => element.count > 0.66 * (range[1] - range[0]))
    // .filter((element) => !element.player.chance_of_playing_next_round)
    .sort((a, b) => b.stat - a.stat)
    .slice(0, 20);

  const rangeItems = Array.apply(null, Array(current)).map(function () {});

  return (
    <>
      <FilterBar></FilterBar>
      <SortBar></SortBar>

      {/* <Slider
        onBlur={setCalcStart}
        current={current}
        calcStart={calcStart}
      ></Slider> */}
      <div
        style={{
          display: "flex",
          gap: "0.3rem",
          alignItems: "center",
          margin: "1rem",
        }}
      >
        <Select
          style={{ minWidth: 100 }}
          id="beginRangeSelet"
          onChange={(value) => {
            setRange([value, range[1]]);
          }}
          defaultValue={range[0] || 0}
        >
          {rangeItems.slice(0, range[1]).map((_, index) => (
            <Select.Option value={index}>GW {index + 1}</Select.Option>
          ))}
        </Select>

        <Select
          style={{ minWidth: 100 }}
          id="endRangeSelect"
          onChange={(value) => {
            setRange([range[0], value]);
          }}
          placeholder={"GW"}
          defaultValue={rangeItems.length}
        >
          {rangeItems.slice(range[0], 10000).map((_, index) => (
            <Select.Option value={index + range[0] + 1}>
              GW {index + 1 + range[0]}
            </Select.Option>
          ))}
        </Select>

        <Button style={{ minWidth: 50 }} disabled>
          {range[0] + 1}
        </Button>
        <Button style={{ minWidth: 50 }} disabled>
          {range[1]}
        </Button>
        <Button style={{ minWidth: 80 }} disabled>
          {range[1] - range[0]} GW
        </Button>
      </div>

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
          <React.Fragment key={element?.player?.web_name}>
            <StatsContainer
              key={uuid()}
              element={element}
              range={range}
            ></StatsContainer>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default StatsPage;
