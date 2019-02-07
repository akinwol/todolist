import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import './App.css';
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import About from './components/pages/About'
import uuid from 'uuid'
import axios from 'axios'

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res=>{
       this.setState({todos:res.data})
      })
  }

  // togggle  complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    })
  }

  //delete todos
  //... this is called the spread operator - allows you t0
  //copy what is already there 
  delTodo = id => {

    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res=>
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      }) )
    
  }

  addTodo = (title) => {
    //can't just change state, have to make a copy of it 
    const newTodo = {
      id: uuid.v4(),
      title, // this is the same as title: title
      completed: false
    }
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,// this is the same as title: title
      completed: false
    })
    .then(res=>{
      this.setState({
        todos: [...this.state.todos, res.data]
      })
    })
    
  }
  render() {
    // console.log(this.state.todos)
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos}
                  markComplete={this.markComplete}
                  delTodo={this.delTodo} />

              </React.Fragment>
            )}/>
            {/* if you dont add exact it will show anything
            in the / route and also the about route together */}
           <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
        );
      }
    }
    
    export default App;
