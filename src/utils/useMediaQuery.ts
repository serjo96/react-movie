import useMediaQuery from '~/hooks/mediaHook';
/**
 * Get a set of boolean representing which breakpoint is active
 * and which breakpoints are inactive.
 *
 * Inspired by: https://github.com/contra/react-responsive/issues/162#issuecomment-592082035
 */

export enum Breakpoints {
  isXs = '(max-with: 576px)',
  isSm = '(min-width: 576px)',
  isMd = '(min-width: 768px)',
  isLg = '(min-width: 992px)',
  isXl= '(min-width: 1200px)',
  isXxl= '(min-width: 1400px)',
}

export enum BreakpointsNames {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl'
}

export default function useBreakpoints () {
  const breakpoints = {
    isXs: useMediaQuery(Breakpoints.isXs),
    isSm: useMediaQuery(Breakpoints.isSm),
    isMd: useMediaQuery(Breakpoints.isMd),
    isLg: useMediaQuery(Breakpoints.isLg),
    isXl: useMediaQuery(Breakpoints.isXl),
    isXxl: useMediaQuery(Breakpoints.isXxl),
    active: BreakpointsNames.XS
  };
  if (breakpoints.isXs) breakpoints.active = BreakpointsNames.XS;
  if (breakpoints.isSm) breakpoints.active = BreakpointsNames.SM;
  if (breakpoints.isMd) breakpoints.active = BreakpointsNames.MD;
  if (breakpoints.isLg) breakpoints.active = BreakpointsNames.LG;
  if (breakpoints.isXl) breakpoints.active = BreakpointsNames.XL;
  if (breakpoints.isXxl) breakpoints.active = BreakpointsNames.XXL;
  return breakpoints;
}
