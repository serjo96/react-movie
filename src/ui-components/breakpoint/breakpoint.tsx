import useBreakpoints, { BreakpointsNames } from '~/utils/useMediaQuery';
import React, { ReactElement } from 'react';

type MyProps = {
  children: ReactElement;
  at: BreakpointsNames | BreakpointsNames[];
}

export default function Breakpoint ({ at, children }: MyProps): ReactElement | null {
  let breakpoints = [];

  if (!at || !at.length) {
    console.error('<Breakpoint>: must specify a breakpoint for the `at` prop.');
  }
  if (Array.isArray(at)) {
    breakpoints = [...at];
  } else {
    breakpoints.push(at);
  }

  const { active } = useBreakpoints();
  return breakpoints.includes(active) ? children : null;
}
