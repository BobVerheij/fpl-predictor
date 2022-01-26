import React, { useEffect } from "react";
import { useStore } from "../../stores/ZustandStore";
import * as Styled from "./RangeSelector.styled";

export const RangeSelector = () => {
  const current = useStore((state) => state.current);
  const setRange = useStore((state) => state.setRange);
  const range = useStore((state) => state.range);
  const setSpan = useStore((state) => state.setSpan);
  const liveDetails = useStore((state) => state.liveDetails);

  const rangeItems = Array.apply(null, Array(liveDetails?.length - 1 || 1)).map(
    function () {}
  );

  return (
    <>
      <Styled.RangeSelectorContainer>
        <Styled.RangeSelector
          value={range[0] + 1}
          defaultValue={liveDetails?.length}
          onChange={(event) => {
            setRange([parseInt(event.target.value) - 1, range[1]]);
          }}
        >
          {rangeItems.slice(0, range[1] + 1).map((_, index) => (
            <option
              // selected={index === range[0]}
              key={`OptionFrom${index}`}
              value={index + 1}
            >
              GW {index + 1}
            </option>
          ))}
        </Styled.RangeSelector>
        <Styled.RangeSelector
          defaultValue={1}
          onChange={(event) => {
            console.log("changed to", event.target.value);
            setSpan(parseInt(event.target.value));
          }}
        >
          {range[1] - range[0] >= 0 && <option value={1}>Weekly</option>}
          {range[1] - range[0] >= 1 && <option value={2}>Bi-weekly</option>}
          {range[1] - range[0] >= 3 && <option value={4}>Monthly</option>}
          {range[1] - range[0] >= 7 && <option value={8}>Bi-monthly</option>}
          {(range[1] - range[0]) / 2 >= 0 && (
            <option value={Math.floor(range[1] / 2)}>Half-Season</option>
          )}
          {range[1] - range[0] > 0 && (
            <option value={range[1] - 1}>Start-Now</option>
          )}
        </Styled.RangeSelector>
        <Styled.RangeSelector
          value={range[1]}
          defaultValue={liveDetails?.length}
          onChange={(event) => {
            const val = parseInt(event.target.value);
            const check = range[0] + 1 > val;

            setRange([check ? val : range[0], val]);
          }}
        >
          {rangeItems.slice(0, 1000).map((_, index) => (
            <option key={`OptionTo${index}`} value={index}>
              GW {index + 1}
            </option>
          ))}
        </Styled.RangeSelector>
      </Styled.RangeSelectorContainer>
      <p>{range[0]}</p>
      <p>{range[1]}</p>
    </>
  );
};
