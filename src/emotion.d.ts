import '@emotion/react';

declare module '@emotion/react' {
    export interface Theme {
        colors: {
            primary: {
                light: string;
                main: string;
            };
            text: {
                primary: string;
            };
            background: {
                default: string;
                darker: string;
            };
        };
        typography: {
            fontFamily: sting;
        };
    }
}
