import React, { useState, useEffect } from "react";



const ToDo = () => {
  // initalize the arrays for the task list
  const [newTask, setNewTask] = useState("");
  const [taskList, setTask] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);

  // after the keyDown event is triggered, then add the input
  // text to the task list
  const addItemToList = () => {
    if (newTask.trim() === "") return;
    setTask([...taskList, newTask]);
    setNewTask("");
  };

  //after the enter key is pressed then trigger the function
  //addItemToList
  const keyDown = (e) => {
    if (e.key === "Enter") {
      addItemToList();
    }
  };

  // delete the hovered over task from the list
  const deleteListItem = (index) => {
    setTask(taskList.filter((_, i) => i !== index));
  };

  

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card mx-auto mb-2">
        <div className="card-body">
          <h1 className="card-title">todo</h1>

          <input
            type="text"
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={keyDown}
            value={newTask}
            placeholder="Type a task and press Enter"
            title="Type a task and press Enter to add it"
          />

          <ul className="list-group">
            {taskList.map((newTask, index) => (
              <li
                key={index}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                className="list-group-item"
              >
                <span>{newTask}</span>
                {hoverIndex === index && (
                  <button
                    onClick={() => deleteListItem(index)}
                    style={{
                      marginLeft: "auto",
                      marginRight: "3px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1rem",
                    }}
                  >
                    <i className="fa-solid fa-trash-can fa-bounce"></i>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
