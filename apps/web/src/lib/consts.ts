import { version } from '../../package.json';

export const USER_AGENT = `cookware/${version}`;
export const IS_DEV = process.env.NODE_ENV == 'development';
export const IS_PROD = !IS_DEV;
