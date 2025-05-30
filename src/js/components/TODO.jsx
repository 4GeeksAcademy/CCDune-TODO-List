import React, {useState} from "react";

//include images into your bundle
//<i class="fa-solid fa-trash-can fa-bounce"></i>
//create your first component

const todoList = ["Wash the dishes", "Do the laundry"];

/*
const planetsInHTML = planets.map((planet, index) => {
	return (
		<li key={index} className="list-group-item">
			{planet}
		</li>
	);
});

const content = <ul className="list-group m-5">{planetsInHTML}</ul>;
*/
const todoListInHTML = todoList.map((thingToDo, index) => {
	<li key={index} className="list-group-item">
			{thingToDo}
		</li>
})

const ToDo = () => {
  const [thingToDo, setTodoListValue] = useState("");
  const validateInput = () => {
    if (todoList === "") alert("the input value cannot be empty");
  };
  return (
    <div className="card">
		<div className="card-body">
      <input
        type="text"
        onChange={(e) => setTodoListValue(e.target.value)}
        value={todoList}
      />
	  <button onClick={validateInput}>Click to validate empty</button>
	  <ul className="list-group">{todoListInHTML}</ul>
    </div>
	</div>
  );
};

export default ToDo;
