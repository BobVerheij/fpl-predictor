import Search from "antd/lib/input/Search";
import React from "react";
import { useStore } from "../../stores/ZustandStore";

export const SearchBar = () => {
  const setSearch = useStore((state) => state.setSearch);
  const search = useStore((state) => state.search);

  return (
    <Search
      onChange={(event) => {
        setSearch(event.target.value.toString());
      }}
      addonBefore="Player or Team"
      placeholder={search ? search : ""}
    ></Search>
  );
};
