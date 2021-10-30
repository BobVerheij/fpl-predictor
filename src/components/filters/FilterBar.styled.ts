import styled from "styled-components";

export const FilterBar = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: stretch;
  height: auto;
  margin: 4px auto;

  width: 90vw;
  max-width: 400px;

  h3 {
    text-transform: uppercase;

    text-align: end;
    font-size: 0.6rem;
    padding: 0.8em 1.2em;
    line-height: 1.2em;
    border-radius: 10em 0 0 10em;

    margin: 0.3em;
    background-color: var(--primary);
    color: white;
    margin-right: 0;
  }
`;

export const Filter = styled.a<{ selected?: boolean }>`
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 900;
  text-align: left;
  font-size: 0.6rem;
  padding: 0.8em 1.2em;
  line-height: 1.2em;
  border-radius: 10em;
  margin: 0.3em;

  text-align: center;
  color: ${(props) => (!props.selected ? "white" : "var(--primary)")};
  background-color: ${(props) =>
    props.selected ? "var(--secondary)" : "var(--primary)"};
  opacity: ${(props) => (props.selected ? "1;" : "0.2;")};

  transition: transform 0.2s ease;

  ${(props) =>
    props.selected &&
    "margin: 0.3em 0; border-radius: 0; border-right: 0.3em solid var(--primary);"};

  :hover {
    opacity: 0.8;
  }
`;
