import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
--primary: rgba(55, 0, 60, 1);
--secondary: rgba(3, 255, 134, 1);
}

* {
	box-sizing: border-box;
	font-family: Arial, Helvetica, sans-serif;
}

body{
	margin: 0;
	padding: 0;
	display: flex;
	flex-flow: column;
	justify-content: start;
	align-items: center;
}
`;

export default GlobalStyle;
