import React, { useState } from "react";

//include images into your bundle
//<i class="fa-solid fa-trash-can fa-bounce"></i>
//create your first component
/*
const todoList = ["No tasks, add a task", "does this still add another list item?"
];

*/
/*
const todoListInHTML = todoList.map((thingToDo, index) => {
	<li key={index} className="list-group-item">
			{thingToDo}{""}
		</li>
})
    */

const ToDo = () => {
  const [thingToDo, setTodoListValue] = useState("");
  const [task, setTask] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);

  const addItemToList = () => {
    if (thingToDo.trim() === "") return;
    setTask([...task, thingToDo]);
    setTodoListValue("");
  };

  const keyDown = (e) => {
    if (e.key === "Enter") {
      addItemToList();
    }
  };

  const deleteListItem = (index) => {
    setTask(task.filter((_, i) => i !== index));
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
          {task.map((thingToDo, index) => (
            <li key={index} className="list-group-item">
              <span>{thingToDo}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDo;
