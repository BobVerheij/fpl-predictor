import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle<{
  mainColor: string;
  secondaryColor: string;
}>`
:root {
--primary: ${(props) => props.mainColor};
--secondary: ${(props) => props.secondaryColor};
--primary80: ${(props) => `${props.mainColor}80`};
--primary60: ${(props) => `${props.mainColor}60`};
--primary40: ${(props) => `${props.mainColor}40`};
--primary20: ${(props) => `${props.mainColor}20`};
--secondary80: ${(props) => `${props.secondaryColor}80`};
--secondary60: ${(props) => `${props.secondaryColor}60`};
--secondary40: ${(props) => `${props.secondaryColor}40`};
--secondary20: ${(props) => `${props.secondaryColor}20`};

--header-height: 4rem;
}

* {
	box-sizing: border-box;
	font-family: Arial, Helvetica, sans-serif;
	transition-property: box-shadow, background-color, color, border-color;

}

body{
	align-items: center;
	background-attachment: fixed;
	background-origin: padding-box;
	background-position: bottom left;
	background-repeat: no-repeat;
	background: var(--primary);
	display: flex;
	flex-flow: column;
	justify-content: start;
	margin: 0;
	overscroll-behavior-x: none;
	padding: 20px;
}
`;

export default GlobalStyle;
