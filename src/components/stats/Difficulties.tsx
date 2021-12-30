import React from "react";

interface IDifficulties {
  values: number[];
}

export const Difficulties = ({ values }: IDifficulties) => {
  const average = values.reduce((acc, val) => acc + val, 0);

  const getColor = (i) => {
    switch (i) {
      case 1:
        return "rgb(1, 252, 122)";
      case 2:
        return "rgb(1, 252, 122)";
      case 3:
        return "rgb(253, 255, 123)";
      case 4:
        return "rgb(255, 22, 81)";
      case 5:
        return "rgb(128, 7, 45)";
      default:
        return "white";
    }
  };

  return (
    <>
      <p>Average {average / values.length}</p>
      <p>Matches {values.length}</p>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          gap: "0.2rem",
          alignItems: "center",
        }}
      >
        {values.map((value, index) => {
          const color = getColor(value);
          return (
            <p
              style={{
                width: 12,
                height: 12,
                borderRadius: 4,
                backgroundColor: color,
                textAlign: "center",
                boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)",
                border: "1px solid black",
              }}
              key={index}
            ></p>
          );
        })}
      </div>
    </>
  );
};
