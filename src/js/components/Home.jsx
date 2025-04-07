import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [toDoList, setToDoList] = useState([]);

	const apiBaseURL = "https://playground.4geeks.com/todo/docs";

	const fetchUser = () => {
		fetch("https://playground.4geeks.com/todo/users/aaransmith11")

			.then((res) => res.json())
			.then((data) => {
				if (data.detail=="User aaransmith11 doesn't exist."){
					fetch("https://playground.4geeks.com/todo/users/aaransmith11", {
						method:"POST"
					})
				}
				else{
					setToDoList(data.todos)
				}
			})
		}

	useEffect(() => {
		fetchUser();
	}, []);

	const deleteToDo = (taskId) => {
		fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
			method: "DELETE"
		})
		.then (() => fetchTasks())
		.catch ((err) => console.error("Error Deleting Task:", err));
		fetchUser();
		window.location.reload()
	}
	const clearAllTasks = () => {
		fetch("https://playground.4geeks.com/todo/users/aaransmith11", {
			method: "DELETE"
		})
		.then (() => fetchTasks())
		.catch ((err) => console.error("Error Deleting Task:", err));
		fetchUser();
		window.location.reload()
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
						fetch("https://playground.4geeks.com/todo/todos/aaransmith11", {
							method: "POST",
							headers: {"Content-Type": "application/json" },
							body: JSON.stringify({label: inputValue.trim(), done: false})
						})
						.then(() => {
							setInputValue("");
							fetchUser();
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

