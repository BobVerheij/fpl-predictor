import { Select } from "antd";
import React from "react";
import { useStore } from "../../stores/ZustandStore";
import * as Styled from "./RangeSelector.styled";

export const RangeSelector = () => {
  const setRange = useStore((state) => state.setRange);
  const range = useStore((state) => state.range);
  const current = useStore((state) => state.current);
  const setSpan = useStore((state) => state.setSpan);

  const rangeItems = Array.apply(null, Array(current)).map(function () {});

  return (
    <Styled.RangeSelector>
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
    </Styled.RangeSelector>
  );
};
