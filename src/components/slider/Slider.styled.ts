import styled from "styled-components";

export const Slider = styled.div<{ url: string; count: number }>`
  margin: 24px auto;
  width: 90vw;
  max-width: 400px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: relative;

  * {
    transition: none;
  }

  :hover {
    ::-webkit-slider-thumb {
      background-color: var(--secondary);
    }
  }
  > div {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
  }

  input[type="range"] {
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    background: none;
    cursor: pointer;
    font-size: 0.8rem;
    height: 2em;
    max-width: 400px;
    transform: translateY(calc(-100% - 0.1em));
    width: 100%; /* Specific width is required for Firefox. */
    border-radius: 10px;
    box-shadow: 0 0 0 0.5em var(--primary), 0.8em 0.8em 0.4em rgba(0, 0, 0, 0.1),
      -0.8em -0.8em 0.4em rgba(255, 255, 255, 0.05);

    :hover {
      ::-webkit-slider-thumb {
        transform: translateY(calc(100% + 1em));
        background-color: var(--secondary);
      }
    }

    ::-webkit-slider-thumb {
      font-size: 0.8rem;
      -webkit-appearance: none;
      width: ${(props) => `calc(${100 / (props.count + 1)}%)`};
      height: 1em;
      background-color: var(--primary);
      border-radius: 1em;
      /* mask: url(${(props) => props.url}) no-repeat center / contain; */
      transform: translateY(calc(100% + 100% - 1em));
      cursor: pointer;
      transition: transform 0.2s ease-out, background-color 0.2s ease;

      :active,
      :hover {
        background-color: var(--secondary);
      }
    }
    :focus {
      outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
    }
    ::-ms-track {
      width: 100%;
      cursor: pointer;

      /* Hides the slider so custom styles can be added */
      border-color: transparent;
      color: transparent;
    }
  }
`;

export const SubWeek = styled.div<{
  index: number;
  calcStart: number;
  current: number;
}>`
  pointer-events: none;
  width: ${(props) => `${100 / props.current}%`};

  font-size: 0.75rem;
  font-weight: bold;
  height: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1em;

  border-top: ${(props) =>
    props.index + 1 > props.calcStart ? "0.2em solid var(--secondary)" : ""};
  border-bottom: ${(props) =>
    props.index + 1 > props.calcStart ? "0.2em solid var(--secondary)" : ""};
  color: ${(props) =>
    props.index + 1 === props.calcStart || props.index + 1 === props.current
      ? "white"
      : ""};
  border-top-right-radius: ${(props) =>
    props.index + 1 === props.calcStart ||
    (props.index + 1 < props.current && props.index + 1 > props.calcStart)
      ? "0px"
      : ""};
  border-bottom-right-radius: ${(props) =>
    props.index + 1 === props.calcStart ||
    (props.index + 1 < props.current && props.index + 1 > props.calcStart)
      ? "0px"
      : ""};
  border-top-left-radius: ${(props) =>
    props.index + 1 === props.current ||
    (props.index + 1 < props.current && props.index + 1 > props.calcStart)
      ? "0px"
      : ""};
  border-bottom-left-radius: ${(props) =>
    props.index + 1 === props.current ||
    (props.index + 1 < props.current && props.index + 1 > props.calcStart)
      ? "0px"
      : ""};
  background-color: ${(props) =>
    props.index + 1 === props.calcStart || props.index + 1 === props.current
      ? "var(--secondary)"
      : props.index % 2 === 1
      ? "transparent"
      : "rgba(1, 1, 1, 0.1)"};

  ${(props) => props.calcStart === props.current && `border-radius: 2em`};
  z-index: 100;
  :hover {
    background-color: var(--secondary);
  }
`;
