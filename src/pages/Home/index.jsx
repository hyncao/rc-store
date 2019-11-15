import React from 'react';
import { connect } from '../../rc-store';

function Home({ homeStore }) {
  const add = () => {
    homeStore.count++;
    console.log(homeStore)
  }

  return (
    <div>
      <p>{homeStore.count}</p>
      <button onClick={add}>点我</button>
    </div>
  )
}

export default connect('homeStore')(Home);
