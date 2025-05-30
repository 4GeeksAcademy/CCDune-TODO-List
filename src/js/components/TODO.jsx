import React, {useState} from "react";

//include images into your bundle
//<i class="fa-solid fa-trash-can fa-bounce"></i>
//create your first component

const todoList = ["No tasks, add a task"];


/*
const todoListInHTML = todoList.map((thingToDo, index) => {
	<li key={index} className="list-group-item">
			{thingToDo}{""}
		</li>
})
    */

const ToDo = () => {
  const [thingToDo, setTodoListValue] = useState('');
  const [task, setTask] = useState([]);
  
  
  const validateInput = () => {
    if (todoList === "") alert("the input value cannot be empty");
  };

  const addTodoList = () => {
    if (thingToDo.trim() === ""){
      <div className="alert alert-danger" role="alert">Please enter a task</div>
      return;
    }
    setTask([...task, inputTodoList]);
    setTodoListValue('');
  }

const keyDown = (e) => {
  if (e.key === "Enter") {
    addTodoList();
  }
};

  return (
    <div className="card mx-auto mb-2">
		<div className="card-body">
    <h1 className="card-title">todo</h1>

      <input
        type="text"
        onChange={(e) => setTodoListValue(e.target.value)}
        onKeyDown={keyDown}
        value={thingToDo}
        placeholder="Type your task: then press Enter"
      />

	  <ul className="list-group">
      {todoList.map((thingToDo, index) => (
        <li key={index} className="list-group-item">
          {thingToDo}{" "}
        </li>
      ))}
      </ul>
    </div>
	</div>
  );
};

export default ToDo;
