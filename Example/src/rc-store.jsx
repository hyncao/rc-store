import React from 'react';

let connect = () => () => { };
class WarpProvider extends React.Component {
  constructor(props) {
    super(props);
    const { children, ...rest } = this.props;
    this.state = {
      ...rest
    }
    this.connect = this.connect.bind(this);
    this.dispatch = this.dispatch.bind(this);
    export const connect = this.connect;
  }

  connect(...name) {
    return (NextComponent) => props => {
      const data = {
        ...props,
        dispatch: this.dispatch,
      };
      name.forEach((i) => {
        data[i] = this.state[i];
      })
      return (
        <>
          <NextComponent {...data} />
        </>
      )
    }
  }

  dispatch(store) {
    const { state } = this;
    const keys = Object.keys(store);
    let error;
    if (keys.every((i) => {
      const res = i in state;
      if (!res) {
        error = `Connect did not register "${i}", please check dispatch or connect`;
      }
      return res;
    })) {
      let newState = state;
      keys.forEach((i) => {
        newState = {
          ...newState,
          [i]: {
            ...newState[i],
            ...store[i]
          },
        }
      });
      this.setState({ ...newState });
    } else {
      throw new Error(error);
    }
  }

  render() {
    const { children } = this.props;
    return (
      <>
        {children}
      </>
    )
  }
};

const Provider = props => {
  debugger
  new WarpProvider(props);
}
export { Provider };
