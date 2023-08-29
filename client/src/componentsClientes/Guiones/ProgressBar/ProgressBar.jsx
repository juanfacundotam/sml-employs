import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 30px;
`;

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  span {
    &.step {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid #6f76a7;
      position: relative;
    }
    &:not(:last-child):after {
      content: "";
      width: 20px;
      height: 2px;
      background: #6f76a7;
      position: absolute;
      top: 4px;
      left: 14px;
    }
    &.active.step {
      background: #e3e5f5;
      border: 2px solid #e3e5f5;
    }
    &.selected.step {
      background: transparent;
      border: 2px solid #e3e5f5;
      color: #e3e5f5;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      font-size: 10px;
    }
    &.active.step:after {
      background: #e3e5f5;
    }
    &.selected.step:after {
      top: 10px;
      left: 26px;
    }
  }
`;

const Progress = ({ value, maxValue, color, boxNumber }) => {
  const getClassName = (ratio, index) => {
    if (ratio === index + 1) {
      return "selected step";
    }
    return ratio >= index + 1 ? "active step" : "step";
  };

  return (
    <ProgressWrapper color={color}>
      {Array.from(Array(boxNumber).keys()).map((item) => {
        const ratio = (value / maxValue) * 5;
        return (
          <span key={item} className={getClassName(ratio, item)}>
            {ratio === item + 1 ? item + 1 : ""}
          </span>
        );
      })}
    </ProgressWrapper>
  );
};

const ProgressBar = ({valor}) => (
  <Container>
    <Progress value={valor} maxValue={5} color="rgb(1, 189, 111)" boxNumber={5} />
  </Container>
);

export default ProgressBar;
