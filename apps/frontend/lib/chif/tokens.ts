import { isAndroid } from '@lib/platform/detection'

export const TRACKING = isAndroid ? 0.1 : 0

export const colors = {
  light: {
    destructive: 'hsl(0 84.2% 60.2%)',
    destructive_foreground: 'hsl(0 0% 98%)',
  },
};

export const space = {
  _2xs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  _2xl: 24,
  _3xl: 28,
  _4xl: 32,
  _5xl: 40,
} as const;

export const fontSize = {
  _2xs: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  _2xl: 22,
  _3xl: 26,
  _4xl: 32,
  _5xl: 40,
} as const;

export const lineHeight = {
  none: 1,
  normal: 1.5,
  relaxed: 1.625,
} as const;

export const borderRadius = {
  _2xs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  full: 999,
} as const;

/**
 * These correspond to Inter font files we actually load.
 */
export const fontWeight = {
  normal: '400',
  bold: '600',
  heavy: '800',
} as const;
