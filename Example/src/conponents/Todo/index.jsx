import React from 'react';
import { connect } from '../../rc-store';
import styles from './index.module.css';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clear = this.clear.bind(this);
  }

  add() {
    const { todoStore, dispatch } = this.props;
    const { value } = todoStore;
    if (!value) return;
    let { list } = todoStore;
    list.push({
      id: Math.random(),
      text: value,
      done: false,
    })
    dispatch({
      todoStore: {
        list,
        value: '',
      }
    })
  }

  handleDone(id) {
    const { todoStore, dispatch } = this.props;
    const { list } = todoStore;
    const temp = list.map((i) => ({
      ...i,
      done: i.id === id ? !i.done : i.done,
    }))
    dispatch({
      todoStore: {
        list: temp,
      }
    })
  }

  handleChange(e) {
    const { dispatch } = this.props;
    const { value } = e.target;
    dispatch({
      todoStore: {
        value,
      }
    })
  }

  clear() {
    const { dispatch } = this.props;
    dispatch({
      todoStore: {
        list: [],
      }
    })
  }

  render() {
    const { todoStore: { list, value } } = this.props;

    return (
      <div className={styles.content}>
        <div className={styles.btn} onClick={this.clear}>清空LIST</div>
        <input className={styles.ipt} type="text" onChange={this.handleChange} value={value} />
        <button className={styles.btn} onClick={this.add}>添加</button>
        <div className={styles.list}>
          {list.length > 0 && list.map((i) => (
            <div
              key={i.id}
              style={{ textDecoration: i.done ? 'line-through' : 'none' }}
              onClick={() => this.handleDone(i.id)}
            >
              {i.text}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default connect('todoStore')(Todo);
