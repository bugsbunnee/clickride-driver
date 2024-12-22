/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';

export const APP_COLORS = {
  MODAL_OPAQUE: '#00000040',
  BLACK: '#000',
  BORDER: '#0286FF',
  BORDER_LIGHT: '#F2F2F2',
  BORDER_MID: '#B7B7B7',
  DANGER: '#A80000',
  DANGER_LIGHT: '#f5e9e9',
  DEW: '#F5F5F5',
  DEW_MID: '#f7f8fa',
  DEW_DARK: '#D9D9D9',
  DARK: '#333333',
  GRAY: '#858585',
  GRAY_LIGHT: '#EBEBEB',
  GRAY_MID: '#E2E8F0',
  GRAY_SEMI: '#797879',
  GRAY_DARK: "#575862",
  GRAY_DEEP: "#BCBCBC",
  INPUT: '#F6F8FA',
  PLACEHOLDER: '#ADADAD',
  PRIMARY: '#F58634',
  PRIMARY_LIGHT: '#FFF3EA',
  ROUTE: '#5285ec',
  SHADOW: 'rgba(100, 100, 111, 0.8)',
  SKELETON: '#DDDDDD',
  SUCCESS: '#0CC25F',
  SUCCESS_LIGHT: '#E7F9EF',
  SUCCESS_MID: '#D6F2E1',
  SUCCESS_DARK: '#00A835',
  WHITE: '#FFF',
  YELLOW: '#FFCC00',
};

const colors = {
  light: {
    background: APP_COLORS.WHITE,
    black: APP_COLORS.BLACK,
    border: APP_COLORS.BORDER,
    borderLight: APP_COLORS.BORDER_LIGHT,
    borderMid: APP_COLORS.BORDER_MID,
    danger: APP_COLORS.DANGER,
    dangerLight: APP_COLORS.DANGER_LIGHT,
    dark: APP_COLORS.DARK,
    dew: APP_COLORS.DEW,
    dewMid: APP_COLORS.DEW_MID,
    dewDark: APP_COLORS.DEW_DARK,
    gray: APP_COLORS.GRAY,
    grayLight: APP_COLORS.GRAY_LIGHT,
    graySemi: APP_COLORS.GRAY_SEMI,
    grayMid: APP_COLORS.GRAY_MID,
    grayDark: APP_COLORS.GRAY_DARK,
    grayDeep: APP_COLORS.GRAY_DEEP,
    input: APP_COLORS.INPUT,
    modalOpaque: APP_COLORS.MODAL_OPAQUE,
    placeholder: APP_COLORS.PLACEHOLDER,
    primary: APP_COLORS.PRIMARY,
    primaryLight: APP_COLORS.PRIMARY_LIGHT,
    route: APP_COLORS.ROUTE,
    shadow: APP_COLORS.SHADOW,
    skeleton: APP_COLORS.SKELETON,
    success: APP_COLORS.SUCCESS,
    successLight: APP_COLORS.SUCCESS_LIGHT,
    successMid: APP_COLORS.SUCCESS_MID,
    successDark: APP_COLORS.SUCCESS_DARK,
    text: APP_COLORS.WHITE,
    tint: tintColorLight,
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    white: APP_COLORS.WHITE,
    yellow: APP_COLORS.YELLOW,
  },
  dark: {
    background: APP_COLORS.WHITE,
    black: APP_COLORS.BLACK,
    border: APP_COLORS.BORDER,
    borderLight: APP_COLORS.BORDER_LIGHT,
    borderMid: APP_COLORS.BORDER_MID,
    danger: APP_COLORS.DANGER,
    dangerLight: APP_COLORS.DANGER_LIGHT,
    dark: APP_COLORS.DARK,
    dew: APP_COLORS.DEW,
    dewMid: APP_COLORS.DEW_MID,
    dewDark: APP_COLORS.DEW_DARK,
    gray: APP_COLORS.GRAY,
    grayLight: APP_COLORS.GRAY_LIGHT,
    grayMid: APP_COLORS.GRAY_MID,
    graySemi: APP_COLORS.GRAY_SEMI,
    grayDark: APP_COLORS.GRAY_DARK,
    grayDeep: APP_COLORS.GRAY_DEEP,
    input: APP_COLORS.INPUT,
    modalOpaque: APP_COLORS.MODAL_OPAQUE,
    placeholder: APP_COLORS.PLACEHOLDER,
    primary: APP_COLORS.PRIMARY,
    route: APP_COLORS.ROUTE,
    shadow: APP_COLORS.SHADOW,
    skeleton: APP_COLORS.SKELETON,
    success: APP_COLORS.SUCCESS,
    successLight: APP_COLORS.SUCCESS_LIGHT,
    successMid: APP_COLORS.SUCCESS_MID,
    successDark: APP_COLORS.SUCCESS_DARK,
    text: APP_COLORS.WHITE,
    tint: tintColorLight,
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    white: APP_COLORS.WHITE,
    yellow: APP_COLORS.YELLOW,
  },
};

export default colors;