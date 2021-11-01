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


}

* {
	box-sizing: border-box;
	font-family: Arial, Helvetica, sans-serif;
	transition: all 1s ease-in-out;
	transition-property: box-shadow, background-color, color, border-color;

}

body{
	margin: 0;
	padding: 20px;
	display: flex;
	flex-flow: column;
	justify-content: start;
	align-items: center;
	background: var(--primary);
	/* background-image: url("images/blocks.svg"); */
	background-attachment: fixed;
	background-repeat: no-repeat;
	background-origin: padding-box;
	background-position: bottom left;
}
`;

export default GlobalStyle;
