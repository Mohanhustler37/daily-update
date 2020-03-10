 export const ThemeColors = () => {
     let rootStyle = getComputedStyle(document.body);
     return {
        themeColor1 : '#254c71',
        themeColor2 : '#c4def7',
        themeColor3 : '#ffffff',
        themeColor4 : '#d1543f',
        themeColor5 : '#feb5a9',
        themeColor6 : '#c4def7',
        themeColor7 : '#63d0b4',
        themeColor8 : '#32967c',
        themeColor9 : '#ffa500',
        themeColor10 : '#ffd485',
        themeColor11 : '#ffa500',
        themeColor12 : '#ffdb98',
        themeColor13 : '#c5221f',
        themeColor14 : '#feb5a9',
        themeColor15 : '#fba3cd',
        themeColor16 : '#de5094',
        themeColor17 : '#90ff90',
        themeColor18 : '#008000',
        themeColor19 : '#ca99ff',
        themeColor20 : '#6e1cc6',
        themeColor1_10 : rootStyle.getPropertyValue("--theme-color-1-10").trim(),
        themeColor2_10 : rootStyle.getPropertyValue("--theme-color-2-10").trim(),
        themeColor3_10 : rootStyle.getPropertyValue("--theme-color-3-10").trim(),
        themeColor4_10 : rootStyle.getPropertyValue("--theme-color-3-10").trim(),
        themeColor5_10 : rootStyle.getPropertyValue("--theme-color-3-10").trim(),
        themeColor6_10 : rootStyle.getPropertyValue("--theme-color-3-10").trim(),
        primaryColor: rootStyle.getPropertyValue("--primary-color").trim(),
        foregroundColor: rootStyle.getPropertyValue("--foreground-color").trim(),
        separatorColor: rootStyle.getPropertyValue("--separator-color").trim()
    }
}