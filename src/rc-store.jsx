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

export const connect = name => Component => props => {
  class Connect extends React.Component {
    constructor() {
      super();
      this.state = {
        data: null,
      };
    }

    componentDidMount() {
      const {context} = this.props;
      this.setState({
        data: { ...props, [name]: context[name] },
      })
    }

    UNSAFE_componentWillReceiveProps(next) {
      debugger
    }

    render() {
      const { data } = this.state;
      if (data) {
        return (
          <>
            <Component {...data} />
          </>
        )
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
