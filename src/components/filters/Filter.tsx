import React, { useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useStore } from "../../stores/ZustandStore";

import * as Styled from "./FilterBar.styled";

interface FilterProps {
  isDraggable?: boolean;
  filterList: any[];
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
  const setDraggingIsHappening = useStore(
    (state) => state.setDraggingIsHappening
  );

  const position = filterList.indexOf(value);
  // console.log(position);

  interface dropProps {
    name: string | number;
    value: string | number;
    pos: number;
  }

  const [, drop] = useDrop(() => ({
    accept: "FILTER",
    drop: (): dropProps => ({
      name: name,
      value: value,
      pos: position,
    }),
  }));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FILTER",
    item: { name: name, value: value, pos: position },
    end: (item, monitor) => {
      const res: dropProps = monitor.getDropResult();
      if (item && res) {
        console.log(`Dropped ${item.pos} to ${res.pos}`);
        const list = [...filterList.splice(res.pos, 0, item.value)];
        console.log(list);
      }
    },
    collect: (monitor) => ({
      value: value,
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    setDraggingIsHappening(isDragging);
  }, [isDragging]);

  const canBeDragged = filterList.includes(value) && isDraggable;

  return (
    <Styled.Filter
      ref={canBeDragged && draggingIsHappening ? drop : drag}
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
