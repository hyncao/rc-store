import React from 'react';

const context = React.createContext();
const Consumer = context.Consumer;

export const Provider = ({ children, ...rest }) => {
  return (
    <context.Provider value={rest}>
      {children}
    </context.Provider>
  )
};

export const connect = (...name) => Component => props => {
  class Connect extends React.Component {
    constructor() {
      super();
      this.state = {
        data: null,
      };
      this.dispatch = this.dispatch.bind(this);
    }

    componentDidMount() {
      const { context } = this.props;
      const injectObj = {};
      name.forEach((i) => {
        injectObj[i] = context[i];
      })
      this.setState({
        data: { ...props, ...injectObj, dispatch: this.dispatch },
      })
    }

    dispatch(store) {
      const { data } = this.state;
      const keys = Object.keys(store);
      let error;
      if (keys.every((i) => {
        const res = i in data;
        if (!res) {
          error = `Connect did not register "${i}", please check dispatch or connect in "${Component.name}" Component`;
        }
        return res;
      })) {
        let newData = data;
        keys.forEach((i) => {
          newData = {
            ...newData,
            [i]: {
              ...newData[i],
              ...store[i]
            },
          }
        });
        this.setState({ data: newData });
      } else {
        throw new Error(error);
      }
    }

    render() {
      const { data } = this.state;
      if (data) {
        return <Component {...data} />;
      }
      return null;
    }
  }

  return (
    <Consumer>
      {context => <Connect context={context} />}
    </Consumer>
  );
};
