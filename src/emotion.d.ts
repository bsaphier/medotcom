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
            background: string;
        };
        typography: {
            fontFamily: sting;
        };
    }
}
