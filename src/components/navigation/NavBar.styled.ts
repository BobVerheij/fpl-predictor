import styled from "styled-components";

export const NavBar = styled.nav`
  width: 100vw;
  background-color: var(--primary);

  align-self: center;
  margin-bottom: 40px;
  box-shadow: 0 0 5em rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

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
  margin: 0 auto;
  width: 90vw;
  max-width: 400px;
  display: flex;
  align-items: center;
  flex-flow: rows;
  justify-content: center;
  gap: 12px;
  :first-child {
    margin-right: auto;
  }
`;

export const ColorPickerWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 4px;
`;

export const ColorPicker = styled.input`
  width: 48px;
  height: 16px;
  border-radius: 24px;
  padding: 0;
  border: none;
  outline: none;

  ::-webkit-color-swatch-wrapper {
    outline: none;
    padding: 0;
  }
  ::-webkit-color-swatch {
    border: 1px solid white;
    border-radius: 24px;
    outline: none;
  }
`;
