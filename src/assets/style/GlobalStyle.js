import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    
    @font-face {
    font-family: 'SUIT-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    }   

    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');

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
`

export default GlobalStyle;