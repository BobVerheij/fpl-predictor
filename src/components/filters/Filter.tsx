import React, { useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useStore } from "../../stores/ZustandStore";

import * as Styled from "./FilterBar.styled";

interface FilterProps {
  isDraggable?: boolean;
  filterList?: any[];
  handleClick: (value: string | number) => void;
  value?: string | number;
  name?: string;
}

const Filter = ({
  isDraggable = false,
  filterList,
  handleClick,
  value,
  name,
}: FilterProps) => {
  const draggingIsHappening = useStore((state) => state.draggingIsHappening);
  const setSort = useStore((state) => state.setSort);
  const sort = useStore((state) => state.sort);
  const setDraggingIsHappening = useStore(
    (state) => state.setDraggingIsHappening
  );

  interface dropProps {
    name: string | number;
    value: string | number;
  }

  const [, drop] = useDrop(() => ({
    accept: "FILTER",
    drop: (): dropProps => ({
      name: name,
      value: value,
    }),
  }));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FILTER",
    item: { name, value },
    end: (item, monitor) => {
      const res: dropProps = monitor.getDropResult();
    },
    collect: (monitor) => ({
      value: value,
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    setDraggingIsHappening(isDragging);
  }, [isDragging]);

  const dragOrDrop = () => {
    if (isDraggable && filterList.includes(value)) {
      if (draggingIsHappening) {
        return drop;
      }
      return drag;
    }
    return null;
  };

  return (
    <Styled.Filter
      ref={dragOrDrop()}
      style={{
        display: isDragging && "none",
        borderRight:
          filterList.indexOf(value) === filterList.length - 1 && "none",
        borderTopRightRadius:
          filterList.indexOf(value) === filterList.length - 1 && "50px",
        borderBottomRightRadius:
          filterList.indexOf(value) === filterList.length - 1 && "50px",
        order: filterList.includes(value) ? filterList.indexOf(value) : 1000,
      }}
      selected={filterList.includes(value)}
      onClick={() => handleClick(value)}
    >
      {name ? name : value}
    </Styled.Filter>
  );
};

export default Filter;
