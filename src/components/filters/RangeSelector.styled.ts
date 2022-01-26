import styled from "styled-components";

export const RangeSelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;

  margin: 2rem auto 1rem auto;

  position: relative;

  overflow: visible;

  ::before {
    content: "Stats Range";
    position: absolute;
    text-align: center;
    padding: 1rem;
    padding-top: 0.25rem;
    background: white;
    color: var(--primary);
    font-weight: 900;
    font-size: 0.66rem;
    top: -75%;
    border-radius: 1rem 1rem 0 0;
    z-index: 0;
  }

  select {
    width: 100%;
  }

  select {
    background: var(--primary) !important;

    border: 2px solid var(--secondary) !important;
    border-left: none !important;
    border-right: none !important;

    color: white;

    box-shadow: none !important;

    :active,
    :focus,
    :hover {
      background: var(--primary) !important;
    }
  }

  select:first-of-type {
    border-radius: 1rem 0 0 1rem;
    border-right: 0 !important;
    border-left: 2px solid var(--secondary) !important;

    > * {
      text-align: left;
    }
  }
  select:last-of-type {
    border-radius: 0 1rem 1rem 0;
    border-left: 0 !important;
    border-right: 2px solid var(--secondary) !important;

    > * {
      text-align: right;
    }
  }
`;

export const RangeSelector = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  z-index: 1;
  text-align: center;
  height: 2rem;
  padding: 0 1rem;
  font-weight: 900;
  outline: none;
`;
