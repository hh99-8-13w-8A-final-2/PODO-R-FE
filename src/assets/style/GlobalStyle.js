import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`


    :root{
        --white:#fff;
        --gray-1:#CCC;
        --gray-2:#888;
        --gray-3:#222;
        --black:#000;
        --maincolor-1:#BB63FF;
        --maincolor-2:#4F008C;
        --maincolor-3:rgba(187,99,255,.5);
        --error :#d74f4f;
        --success :#40c199;
    }


    body, h1, h2, h3, h4, h5, h6, input, textarea, select {
        font-family: 'SUIT-Regular', sans-serif;
    }

    
    input, textarea{
        background-color: var(--gray-3);
        border-radius: 8px;
        padding: 10px;
        box-sizing: border-box;
        color: var(--gray-2);
        border: none;
    }
    html, body {
        width: 100%;
        height: 100%;
        background-color: var(--black);
    }
    .icon {
        width: 30px;
    }
    .error {
        color: var(--error)
    }
    .success{
        color: var(--success);
    }

    /* 임의의 영역 생성 */
    ::-webkit-scrollbar {
        width: 7px;  /* 스크롤바의 너비 */
        height: 7px;
    }

    ::-webkit-scrollbar-thumb {
        height: 30%; /* 스크롤바의 길이 */
        background: var(--maincolor-1); /* 스크롤바의 색상 */
        border-radius: 10px;
    } 

    ::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, .2);  /*스크롤바 뒷 배경 색상*/
    }
`

export default GlobalStyle;