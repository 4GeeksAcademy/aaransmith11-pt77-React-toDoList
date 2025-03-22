import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [toDoList, setToDoList] = useState([]);

	const deleteToDo = (i) => {
		let newToDo = toDoList.filter((toDo, index)=>{
			if (index != i){
				return toDo
			}
		})
		setToDoList (newToDo)
	}
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
					if (e.key === "Enter") {
						setToDoList(toDoList.concat(inputValue));
						setInputValue("");
					}	
				}}
				placeholder="List anything else you need to do"></input>
			</li>
			{toDoList?.map((t,index) => (
				<li key={index}>
					{t} <span onClick={()=>deleteToDo(index)}>X</span>
				</li>
		))}
				
			</ul>
			<div>{toDoList.length} tasks</div>
		</div>
	);
};

export default Home;