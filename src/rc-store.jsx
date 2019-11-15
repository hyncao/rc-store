import React from 'react';

const context = React.createContext();

export const Provider = ({ children, ...rest }) => {
  return (
    <context.Provider value={rest}>
      {children}
    </context.Provider>
  )
};

export const Consumer = context.Consumer;

export const connect = name => Component => props => (
  <Consumer>
    {context => <Component {...{ ...props, [name]: context[name] }} />}
  </Consumer>
);
