import styled from "styled-components";

export const Timeline = styled.div<{ active: boolean }>`
  align-items: center;
  display: ${({ active }) => (active ? "flex" : "none")};
  flex-flow: column nowrap;
  height: 100%;
  justify-content: flex-end;
  left: -0.5rem;
  position: absolute;
  bottom: 0;
  width: 1rem;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const Dot = styled.div<{
  type?: "past" | "present" | "future";
  message?: string;
}>`
  overflow: visible;
  position: relative;
  align-items: center;
  border-radius: 10rem;
  border: 2px solid;
  color: ${({ type }) => (type === "present" ? "white" : "var(--primary)")};
  cursor: ${({ type }) => (type === "present" ? "auto" : "pointer")};
  display: flex;
  font-size: 0.5rem;

  height: ${({ type }) => (type === "present" ? "1rem" : "10px")};
  justify-content: center;
  width: ${({ type }) => (type === "present" ? "1rem" : "10px")};

  border-color: ${({ type }) =>
    type === "past"
      ? "var(--primary)"
      : type === "future"
      ? "var(--secondary)"
      : "var(--primary)"};

  background-color: ${({ type }) =>
    type === "past"
      ? "white"
      : type === "future"
      ? "var(--secondary)"
      : "var(--primary)"};

  :hover {
    background-color: black;
    border-color: black;
    color: white;
  }
`;

export const Line = styled.div<{ hide?: boolean }>`
  border: none;

  border-left: 2px solid var(--primary);
  height: 1.85rem;
  opacity: ${({ hide }) => (!hide ? "1" : "0")};
  width: 2px;
`;

export const Message = styled.div<{}>`
  @keyframes fade {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  animation: fade 6s ease-out 0s 1 both;
  bottom: 0rem;
  top: 0rem;

  right: calc(100% - 0.5rem);

  width: 150px;
  position: absolute;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 0.5rem;

  div {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    gap: 0.3rem;
    background-color: var(--primary);
    padding: 0.3rem 0.6rem;
    color: white;
    border-radius: 100rem;
    font-size: 0.66rem;
  }

  p {
    margin: 0;
  }
`;
