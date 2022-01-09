import styled from "styled-components";

export const NavBar = styled.nav`
  width: 100vw;
  background-color: var(--primary);
  box-shadow: 0 0 5em rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100000;
  display: flex;

  height: var(--header-height);

  h3 {
    color: white;
  }
  a {
    font-size: 0.8rem;
    color: white;
    font-weight: 900;
    text-decoration: none;
  }
`;

export const NavContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-flow: rows;
  justify-content: flex-start;
  gap: 0.5rem;
  padding: 0 1.5rem;
`;

export const ColorPickerWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

export const ColorPicker = styled.input`
  width: 33%;
  height: 1.5rem;
  border-radius: 1rem;
  padding: 0;
  border: none;
  outline: none;

  ::-webkit-color-swatch-wrapper {
    outline: none;
    padding: 0;
  }
  ::-webkit-color-swatch {
    border: 1px solid white;
    border-radius: 1rem;
    outline: none;
  }
`;
