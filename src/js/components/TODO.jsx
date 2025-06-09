import React, { useState, useEffect } from "react";

const ToDo = () => {
  const apiUserName = "cc_dune";
  const userUrl = `https://playground.4geeks.com/todo/users/${apiUserName}`;
  const todosUrl = `https://playground.4geeks.com/todo/todos/${apiUserName}`;

  // initalize the arrays for the task list
  const [newTask, setNewTask] = useState("");
  const [taskList, setTask] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);

  // create new user or ensure user exists, then load tasks from server
  useEffect(() => {
    const setupUserAndLoadTasks = async () => {

      //first check to see if the user exists
      const checkUser = await fetch(userUrl);

      if (checkUser.status === 404){ 
        //ifuser not found then create one
        await fetch(userUrl, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name: apiUserName})
        });

      }

      // Get the tasks
      const response = await fetch(userUrl);
      const data = await response.json();

      setTask(Array.isArray(data.todos) ? data.todos : []);
    };

    setupUserAndLoadTasks();
  }, []);

  // after the keyDown event is triggered, then add the input
  // text to the task list
  const addItemToList = async () => {
    if (newTask.trim() === "") return;

    await fetch(todosUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ label: newTask, is_done: false })
    });

    setNewTask("");

    const response = await fetch(userUrl);
    const data = await response.json();
    setTask(Array.isArray(data.todos) ? data.todos : []);
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

    await fetch(`https://playground.4geeks.com/todo/todos/${taskToDelete.id}`, {
      method: "DELETE"
    });

    const response = await fetch(userUrl);
    const data = await response.json();
    setTask(Array.isArray(data.todos) ? data.todos : []);
  };

  const clearAllTasks = async () => {
    for (let task of taskList) {
      await fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
        method: "DELETE"
      });
    }
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
                  <span>{task.label}</span>
                  <button
                    onClick={() => deleteListItem(index)}
                    style={{
                      visibility: hoverIndex === index ? "visible" : "hidden",
                      marginRight: "10px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1rem"
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
