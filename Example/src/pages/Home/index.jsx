import React from 'react';
import { connect } from '../../rc-store';
import Todo from '../../conponents/Todo';

class Home extends React.Component {
  componentDidMount() {
    console.log('home didmont');
  }

  render() {
    const { homeStore, todoStore } = this.props;
    return (
      <div>
        <h1>{homeStore.slogan}</h1>
        {todoStore.list.length}
        <Todo />
      </div>
    );
  }
}

export default connect('homeStore', 'todoStore')(Home);
