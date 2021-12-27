import { Button, Card } from "antd";
import React from "react";

const Stat = ({ value, highest }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px",
          height: "20px",
          width: "80px",
        }}
      >
        <p
          style={{
            padding: "0",
            margin: "0",
            width: "30%",
            textAlign: "center",
            fontSize: "0.8rem",
            fontWeight: "bold",
          }}
        >
          {value}
        </p>
        {highest ? (
          <div
            style={{
              marginLeft: "4px",
              borderRadius: "10px",
              height: "4px",
              width: "50%",
              backgroundColor: "var(--primary)",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                borderRadius: "10px",
                height: "inherit",
                width: `${(value / highest) * 100}%`,
                backgroundColor: "var(--secondary)",
              }}
            ></div>
          </div>
        ) : (
          <div
            style={{
              marginLeft: "4px",
              borderRadius: "10px",
              height: "4px",
              width: "50%",
              backgroundColor: "var(--primary)",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                borderRadius: "10px",
                height: "inherit",
                width: `0`,
                backgroundColor: "var(--secondary)",
              }}
            ></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Stat;
