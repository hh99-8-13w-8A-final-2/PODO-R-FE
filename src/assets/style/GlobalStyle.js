import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`


    :root{
        --white:#fff;
        --gray-1:#CCC;
        --gray-2:#888;
        --gray-3:#222;
        --maincolor-1:#BB63FF;
        --maincolor-2:#4F008C;
    }


    body, h1, h2, h3, h4, h5, h6, input, textarea, select {
        font-family: 'SUIT-Regular', sans-serif;
    }

    
    input, textarea{
        background-color: var(--gray-3);
        border-radius: 8px;
        padding: 10px;
        box-sizing: border-box;
    }
    html, body {
        width: 100%;
        height: 100%;
        background-color: var(--gray-3);
    }
    .icon {
        width: 30px;
    }
`

export default GlobalStyle;