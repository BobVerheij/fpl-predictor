import styled from "styled-components";

export const Slider = styled.div<{ count: number }>`
  padding: 20px 0;
  margin: 0 auto;

  width: 90vw;
  max-width: 400px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  > div {
    padding: 4px;
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    > div {
      font-size: 0.8rem;
      font-weight: bold;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${(props) => `${100 / props.count}%`};
      z-index: 10;
    }
  }

  input[type="range"] {
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    width: 100%; /* Specific width is required for Firefox. */
    background: transparent; /* Otherwise white in Chrome */
    padding: 0 ${(props) => `calc(${100 / props.count / 2}% - 2.5px)`};
  }

  input[type="range"]::-webkit-slider-thumb {
    margin-top: -12px;
    -webkit-appearance: none;

    border-radius: 2px;
    width: 10px;
    height: 10px;
    background-color: var(--primary);

    cursor: pointer;
    transform: rotate(45deg);
  }

  input[type="range"]:focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }

  input[type="range"]::-ms-track {
    width: 100%;
    cursor: pointer;

    /* Hides the slider so custom styles can be added */
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
`;
