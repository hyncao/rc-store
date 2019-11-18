import React from 'react';
import { connect } from 'rc-store';
import Todo from '../../conponents/Todo';

function Home({ homeStore }) {
  return (
    <div>
      <h1>{homeStore.slogan}</h1>
      <Todo />
    </div>
  )
}

export default connect('homeStore')(Home);
