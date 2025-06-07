import React, { useState, useEffect } from "react";

const ToDo = () => {
  const apiUserName = "cc_dune";
  const apiUrl = `https://playground.4geeks.com/todo/todos/${apiUserName}`;

  // initalize the arrays for the task list
  const [newTask, setNewTask] = useState("");
 const [taskList, setTask] = useState([]);

   /* const savedTasks = localStorage.getItem("taskList");
      return savedTasks ? JSON.parse(savedTasks) : [];*/
  const [hoverIndex, setHoverIndex] = useState(null);


  // save to local storage when taskList is changed
  useEffect (() => {
    const loadTasks = async () => {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setTask(data.todos || []);
    };
    loadTasks();
  }, []);



 /*   useEffect (() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]); 
  */


  // after the keyDown event is triggered, then add the input
  // text to the task list
  const addItemToList = async () => {
    if (newTask.trim() === "") return;

    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label: newTask, done: false}),
    });

    setNewTask([""]);
    const response = await fetch(apiUrl);
    const data = await response.json();
    setTask(data.todos || []);
  };

  //after the enter key is pressed then trigger the function
  //addItemToList
  const keyDown = (e) => {
    if (e.key === "Enter") {
      addItemToList();
    }
  };

  // delete the hovered over task from the server
  const deleteListItem = async (index) => {
    const taskToDelete = taskList[index];

    await fetch(`${apiUrl}/${taskToDelete.id}`, {
      method: "DELETE",
    });

    const response = await fetch(apiUrl);
    const data = await response.json();
    setTask(data.todos || []);
    //setTask(taskList.filter((_, i) => i !== index));
  };


 const clearAllTasks = async () => {
      await fetch(apiUrl, { method: "DELETE" });
      setTask([]);
 };

  return (
    <div className="d-flex justify-content-center align-items-center text-center">
      <div className="card col-3 mx-auto mb-2">
        <div className="card-body">
          <h1
            className="card-title text-danger"
            style={{ fontFamily: "sans-serif", fontSize: "3rem" }}
          >
            todo
          </h1>

          <input
            type="text"
            className="form-control w-100 mb-2"
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={keyDown}
            value={newTask}
            placeholder="No tasks, add a task"
            title="Type a task and press Enter to add it"
          />

          <ul className="list-group">
            {taskList.map((task, index) => (
              <li
                key={index}
                className="list-group-item"
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>{task}</span>
                  <button
                    onClick={() => deleteListItem(index)}
                    style={{
                      visibility: hoverIndex === index ? "visible" : "hidden",
                      marginRight: "10px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1rem",
                    }}
                  >
                    <i className="fa-solid fa-trash-can fa-bounce"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-2 text-muted">Total tasks: {taskList.length}</div>

          <button
            onClick={clearAllTasks}
            className="btn btn-alert btn-sm mt-3"
            >
              Delete ALL Tasks
            </button>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
