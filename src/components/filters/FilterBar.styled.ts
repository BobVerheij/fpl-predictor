import styled from "styled-components";

export const FilterBar = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: stretch;
  height: auto;
  margin: 4px auto;
  width: 80%;
  h3 {
    text-transform: uppercase;

    text-align: end;
    font-size: 0.8rem;
    padding: 8px 12px;
    line-height: 9px;
    border-radius: 100px 0 0 100px;

    margin: 4px;
    background-color: var(--primary);
    color: white;
    margin-right: 0;
  }
  width: 90vw;
  max-width: 400px;
`;

export const Filter = styled.a<{ selected?: boolean }>`
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 900;
  text-align: left;
  font-size: 0.8rem;
  padding: 8px 12px;
  line-height: 9px;
  border-radius: 100px;

  margin: 4px;

  text-align: center;
  color: ${(props) => (!props.selected ? "white" : "var(--primary)")};
  background-color: ${(props) =>
    props.selected ? "var(--secondary)" : "var(--primary)"};
  opacity: ${(props) => (props.selected ? "1;" : "0.2;")};

  transition: transform 0.2s ease;

  ${(props) =>
    props.selected &&
    "margin: 4px 0; border-radius: 0; border-right: 2px solid var(--primary);"};

  :hover {
    opacity: 0.8;
  }
`;
