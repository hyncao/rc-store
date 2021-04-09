# rc-store

A mini store buy react-content.

## Apis

### Provider

React component. Wrap your app with Provider, then children components can get data from props by connect api.

```javascript
<Provider {...store}>
  <App />
</Provider>
```

### connect

Connect your Component and store, so your can get data from this Component.
(store1: String, store2: String, ...) => (WrappedComponent: React.Component) => React.Component

```javascript
export default connect('myStore1', 'myStore2')(MyComponent);
```

### dispatch

You can get dispatch function from a connected Component's props. By use dispatch to change your data and refresh your app.
New data use Object.assign api cancat data in dispatch, then update component.
Return a Promise Object by new data.
({ myStore1: { data }, ... }) => Promise

```javascript
dispatch({
  store1: {
    newData,
  },
})
  .then((newData) => console.log(newData))
  .catch((e) => console.log(e));
```

## Usage

### Create stores.

```javascript
// stores/index.js
const homeStore = {
  slogan: 'welcome to rc-store',
};
const todoStore = {
  list: [],
  value: '',
};
export default {
  homeStore,
  todoStore,
};
```

### Use Provider component with store props wrap your app.

```javascript
// App.js
import { Provider } from 'rc-store';
import store from './Stores';

<Provider {...store}>
  <Home />
</Provider>;
```

### Inject props by connect api.

```javascript
// Home.jsx
import { connect } from 'rc-store';

// or you can use decorator like this
// @connect('homeStore', 'otherStore')
// class Home extends React.Component

class Home extends React.Component {
  componentDidMount() {
    console.log(this.props.homeStore);
    // {
    //   slogan: 'welcome to rc-store',
    // }
  }
}

export default connect('homeStore', 'otherStore')(Home);
```

### Use dispatch api to change data.

```javascript
@connect('homeStore', 'otherStore')
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.changeName = this.changeName.bind(this);
  }

  changeName() {
    const { dispatch } = this.props;
    dispatch({
      homeStore: {
        name: 'rc-form',
      },
    });
  }

  render() {
    const { name } = this.props.homeStore;
    return (
      <div>
        {name}
        <button onClick={this.changeName}>click me</button>
      </div>
    );
  }
}
```
