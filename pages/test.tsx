import { CloudFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Card, Rate } from "antd";
import React from "react";

// #ed7f00, #ea650d, #e54414

const Test = () => {
  const Cover = () => {
    return (
      <div style={{ maxHeight: 100, overflow: "scroll", padding: "1.5rem" }}>
        <h3 style={{ color: "#e54414" }}> AWS Technical Essentials</h3>
        <p>
          AWS Technical Essentials introduces you to AWS products, services, and
          common solutions. It provides you with fundamentals to become more
          proficient in identifying AWS services so that you can make informed
          decisions about IT solutions based on your business requirements and
          get started working on AWS.
        </p>
      </div>
    );
  };

  return (
    <Card
      cover={Cover()}
      style={{ margin: "100px 0", maxWidth: "30%" }}
      bodyStyle={{
        position: "relative",
        display: "flex",
        gap: "1rem",
        flexFlow: "row nowrap",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "0.5rem",
        backgroundColor: "#ea650d",
        overflow: "visible",
      }}
    >
      <h4 style={{ padding: 0, margin: 0, color: "white" }}>
        AWS Technical Essentials
      </h4>
      <ExclamationCircleOutlined color={"#ffffff"} />
      <CloudFilled color={"#ffffff"} />
      <Button
        style={{
          marginLeft: "auto",
          padding: "0.5rem",
          height: "auto",
          minHeight: 0,
        }}
      >
        visit
      </Button>
      <div
        style={{
          position: "absolute",
          bottom: -40,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Rate disabled defaultValue={2} character={({ index }) => index + 1} />
      </div>
    </Card>
  );
};

export default Test;
