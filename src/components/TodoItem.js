import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class TodoItem extends Component {
    getStyle = () => {
        return {
            background:'#f4f4f4',
            padding:'10px',
            borderBottom:'1px #ccc dotted',
            textDecoration: this.props.todo.completed ? 
            'line-through' : 'none'
        }
    }


    render() {
        const {id, title}=this.props.todo

        return (
            //insline style
            // <div style={{backgroundColor:'#f4f4f4'}}>
            //<div style={itemStyle}>
            // this.props.markComplete.bind(this,id)
            <div style={this.getStyle()}>
                <p>
                <input type="checkbox" onChange={this.props.markComplete.bind(this,id)}/>  {' '}{/*this adds space to check box  */}
                {title}
                <button onClick={this.props.delTodo.bind(this,id)} style={btnstyle}>x</button>
                </p>

            </div>
        )
    }
}
// PropTypes

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
}

const btnstyle ={
    background:'#ff0000',
    color:'#fff',
    border:'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor:'pointer',
    float: 'right'

}



export default TodoItem
