import styled from "styled-components";

export const RangeSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 2rem auto 1rem auto;

  position: relative;

  overflow: visible;

  ::before {
    content: "Gameweek Range";
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
  }

  .ant-select-arrow {
    display: none;
  }

  .ant-select {
  }

  .ant-select-selector {
    background: var(--primary) !important;
    border: 2px solid var(--secondary) !important;

    color: white;
    padding: 0;
    outline: 0;

    box-shadow: none !important;

    * {
      padding: 0 0.5rem !important;
      text-align: left;
      font-weight: 900;
      border: 0 !important;
    }

    :active,
    :focus,
    :hover {
      background: var(--primary) !important;
    }
  }

  .ant-select:first-of-type > .ant-select-selector {
    border-radius: 1rem 0 0 1rem;
    border-right: 0 !important;

    > * {
      text-align: left;
    }
  }
  .ant-select:last-of-type > .ant-select-selector {
    border-radius: 0 1rem 1rem 0;
    border-left: 0 !important;

    > * {
      text-align: right;
    }
  }
`;
