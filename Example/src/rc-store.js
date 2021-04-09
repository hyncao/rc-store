import { Provider as _Provider, connect as _connect } from 'rc-store';

export const Provider = _Provider;
export const connect = _connect;

// import React, { useState, useCallback, useEffect } from 'react';

// const context = React.createContext();
// const Consumer = context.Consumer;

// export const Provider = ({ children, ...rest }) => {
//   const [data, setData] = useState({ ...rest });
//   const update = useCallback((state) => {
//     setData((prev) => {
//       const next = { ...prev };
//       for (let key in state) {
//         Object.assign(next[key], state[key]);
//       }
//       return next;
//     });
//   }, []);
//   return <context.Provider value={{ update, ...data }}>{children}</context.Provider>;
// };

// const Connect = ({ context, originProps, component, name }) => {
//   const dispatch = (state) => {
//     if (Object.prototype.toString.call(state) !== '[object Object]') {
//       return new Promise(() => {
//         throw new Error('rc-store dispatch api need a Object param');
//       });
//     }
//     const keys = Object.keys(state);
//     let error;
//     if (
//       keys.every((i) => {
//         const res = name.includes(i);
//         if (!res) {
//           error = `Connect did not register "${i}", please check dispatch or connect in "${component.name}" Component`;
//         }
//         return res;
//       })
//     ) {
//       const { update } = context;
//       update({ ...state });
//       return new Promise((res) => {
//         const newProps = { ...context };
//         for (let key in state) {
//           Object.assign(newProps[key], state[key]);
//         }
//         res(newProps);
//       });
//     } else {
//       return new Promise(() => {
//         throw new Error(error);
//       });
//     }
//   };

//   const props = { dispatch, ...originProps };
//   name.forEach((i) => {
//     props[i] = { ...context[i] };
//   });
//   return <React.Fragment>{React.createElement(component, { ...props })}</React.Fragment>;
// };

// export const connect = (...name) => (Component) => (props) => {
//   if (name.length === 0) {
//     console.error('rc-store connect api need a String Array param');
//   }
//   if (!name.every((i) => typeof i === 'string')) {
//     console.error('rc-store connect api need a String Array param');
//   }
//   return (
//     <Consumer>
//       {(context) => (
//         <Connect context={context} originProps={props} component={Component} name={name} />
//       )}
//     </Consumer>
//   );
// };
