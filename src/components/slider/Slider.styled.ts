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

  > div {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    > div {
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: bold;
      height: 2em;
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${(props) => `${100 / props.count}%`};
    }
  }

  input[type="range"] {
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    background: none; /* Otherwise white in Chrome */
    cursor: pointer;
    font-size: 0.8rem;
    height: 2em;
    max-width: 400px;
    transform: translateY(calc(-100% - 0.1em));
    width: 100%; /* Specific width is required for Firefox. */

    :hover {
      ::-webkit-slider-thumb {
        transform: translateY(calc(100% + 1em));
      }
    }

    ::-webkit-slider-thumb {
      z-index: 10;
      font-size: 0.8rem;
      -webkit-appearance: none;
      width: ${(props) => `calc(${100 / props.count}%)`};
      height: 0.75em;
      background-color: var(--primary);
      mask: url(${(props) => props.url}) no-repeat center / contain;
      transform: translateY(calc(100% + 0.8em));
      cursor: pointer;
      transition: transform 0.2s ease-out, background-color 0.2s ease;

      :active {
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
      background: transparent;
      border-color: transparent;
      color: transparent;
    }
  }
`;
