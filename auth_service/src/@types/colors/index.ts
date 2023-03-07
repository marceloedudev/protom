// Type definitions for Colors.js 1.2
// Project: https://github.com/Marak/colors.js
// Definitions by: Bart van der Schoor <https://github.com/Bartvds>, Staffan Eketorp <https://github.com/staeke>
// Definitions: https://github.com/Marak/colors.js

export interface Color {
    (text: string): string;

    black: Color;
    red: Color;
    green: Color;
    yellow: Color;
    blue: Color;
    magenta: Color;
    cyan: Color;
    white: Color;
    gray: Color;
    grey: Color;

    bgBlack: Color;
    bgRed: Color;
    bgGreen: Color;
    bgYellow: Color;
    bgBlue: Color;
    bgMagenta: Color;
    bgCyan: Color;
    bgWhite: Color;

    reset: Color;
    bold: Color;
    dim: Color;
    italic: Color;
    underline: Color;
    inverse: Color;
    hidden: Color;
    strikethrough: Color;
}

export const black: Color;
export const red: Color;
export const green: Color;
export const yellow: Color;
export const blue: Color;
export const magenta: Color;
export const cyan: Color;
export const white: Color;
export const gray: Color;
export const grey: Color;

export const bgBlack: Color;
export const bgRed: Color;
export const bgGreen: Color;
export const bgYellow: Color;
export const bgBlue: Color;
export const bgMagenta: Color;
export const bgCyan: Color;
export const bgWhite: Color;

export const reset: Color;
export const bold: Color;
export const dim: Color;
export const italic: Color;
export const underline: Color;
export const inverse: Color;
export const hidden: Color;
export const strikethrough: Color;

declare global {
    interface String {
        black: string;
        red: string;
        green: string;
        yellow: string;
        blue: string;
        magenta: string;
        cyan: string;
        white: string;
        gray: string;
        grey: string;

        bgBlack: string;
        bgRed: string;
        bgGreen: string;
        bgYellow: string;
        bgBlue: string;
        bgMagenta: string;
        bgCyan: string;
        bgWhite: string;

        reset: string;
        // @ts-ignore
        bold: string;
        dim: string;
        italic: string;
        underline: string;
        inverse: string;
        hidden: string;
        strikethrough: string;
    }
}
