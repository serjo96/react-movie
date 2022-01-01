import React, { ReactChild, ReactChildren, ReactPortal } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: ReactChild | ReactChildren
  className?: string,
  el?: string
}
const Portal = ({ children, className = 'root-portal', el = 'div' }: Props):ReactPortal => {
  const [container] = React.useState(() => {
    // This will be executed only on the initial render
    // https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
    return document.createElement(el);
  });

  React.useEffect(() => {
    container.classList.add(className);
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return ReactDOM.createPortal(children, container);
};

export default Portal;