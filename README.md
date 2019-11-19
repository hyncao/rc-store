# rc-store

A mini store buy react-content.

## Usage

```javascript
// stores/index.js
const homeStore = {
  slogan: 'welcome to rc-store',
}
const todoStore = {
  list: [],
  value: '',
}
export default {
  homeStore, todoStore,
}

// App.js
import { Provider } from 'rc-store';
import store from './Stores';

<Provider {...store}>
  <Home />
</Provider>

// Home.jsx
import { connect } from 'rc-store';

class Home extends React.Component {
  componentDidMount() {
    console.log(this.props.homeStore);
    // {
    //   slogan: 'welcome to rc-store',
    // }
  }
}

// or you can use decorator like this
// @connect('homeStore')
// class Home extends React.Component
export default connect('homeStore')(Home);
```