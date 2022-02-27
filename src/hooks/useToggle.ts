import { useCallback, useState } from 'react';

type ToggleFuncType = () => void;

export const useToggle = (initialState = false): [boolean, ToggleFuncType] => {
  // Initialize the state
  const [state, setState] = useState<boolean>(initialState);
  // Define and memorize toggler function in case we pass down the comopnent,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback<ToggleFuncType>((): void => setState(state => !state), []);
  return [state, toggle];
};
