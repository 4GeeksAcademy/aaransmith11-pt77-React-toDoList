import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [toDoList, setToDoList] = useState([]);

	const apiBaseURL = "https://playground.4geeks.com/todo/docs";

	const fetchTasks = () => {
		fetch(`${apiBaseURL}/`)

			.then((res) => res.json())
			.then((data) => setToDoList(data))
			.catch((err) => console.error("Error fetching tasks:", err));
	}

	useEffect(() => {
		fetchTasks();
	}, []);

	const deleteToDo = (taskId) => {
		fetch(`${apiBaseURL}//${taskId}`, {
			method: "DELETE"
		})
		.then (() => fetchTasks())
		.catch ((err) => console.error("Error Deleting Task:", err));
	}
	const clearAllTasks = () => {
		toDoList.forEach(task => {
			deleteToDo(task.id);
		});
	};
	return (
		<div className="container">
			<h1>To-Do List</h1>
			<ul>
			<li>
				<input 
				type="text" 
				onChange={(e) => setInputValue(e.target.value)}
				value={inputValue}
				onKeyPress={(e) => {
					if (e.key === "Enter" && inputValue.trim() !=="") {
						fetch(`${apiBaseURL}/`, {
							method: "POST",
							headers: {"Content-Type": "application/json" },
							body: JSON.stringify({label: inputValue.trim(), done: false})
						})
						.then(() => {
							setInputValue("");
							fetchTasks();
						})
						.catch((err) => console.error("Error adding task:", err));
					}
				}}
				placeholder="List anything else you need to do"></input>
			</li>
			{toDoList.map((task) => (
				<li key={task.id}>
					{task.label}{" "}
					<span
						onClick={() => deleteToDo(task.id)}
						style={{cursor: "pointer", color: "red"}}>
						X
					</span>
				</li>
			))}
				
			</ul>

			<button onClick={clearAllTasks} className="btn btn-danger mt-2">
				Clear All Tasks
			</button>

			<div>{toDoList.length} tasks</div>
		</div>
	);
};

export default Home;

