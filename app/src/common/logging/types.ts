
export const ERROR = 'error';
export const WARN = 'warn';
export const INFO = 'info';
export const VERBOSE = 'verbose';
export const DEBUG = 'debug';

export type LOG_LEVELS = typeof ERROR | typeof WARN | typeof INFO | typeof VERBOSE | typeof DEBUG;
export const LOG_LEVEL_NAMES = [ERROR, WARN, INFO, VERBOSE, DEBUG];
