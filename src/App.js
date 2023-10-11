import React, { useState } from "react";

import "./App.css";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todosList, setTodosList] = useState([]);
  const [disabled, setDisabled] = useState(true);

  function addTodoHandler(event) {
    event.preventDefault();

    if (todoInput.trim().length === 0) return;

    setTodosList((pre) => [
      ...pre,
      {
        id: Math.random(),
        todoName: todoInput,
        dateStart: new Date().toISOString(),
        finished: false,
      },
    ]);

    setTodoInput("");
    setDisabled(true);
  }

  function deleteTodoHandler(id) {
    const newTodosList = todosList.filter((item) => item.id !== id);

    setTodosList(newTodosList);
  }

  function markTodoFineshedHandler(id) {
    const indexTodo = todosList.findIndex((item) => item.id === id);

    todosList[indexTodo].finished = !todosList[indexTodo].finished;

    setTodosList((pre) => [...pre]);
  }

  return (
    <div className="container">
      <p className="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
          />
        </svg>
        <span>My Todo-s</span>
      </p>

      <div className="form-container">
        <form onSubmit={addTodoHandler} className="form">
          <div className="form-group">
            <input
              type="text"
              onChange={(event) => {
                setTodoInput(event.target.value);
                if (event.target.value.trim() !== 0) setDisabled(false);
              }}
              value={todoInput}
              placeholder="Add new"
            />
            <button type="submit" disabled={disabled}>
              ADD
            </button>
          </div>
        </form>
      </div>

      <div className="content">
        {todosList.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>stt</th>
                <th>name todo</th>
                <th>day start</th>
                <th>day end</th>
                <th>status</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {todosList.map((todo, index) => (
                <tr key={todo.id} className={`${todo.finished && "finished"}`}>
                  <td>{index + 1}</td>
                  <td>{todo.todoName}</td>
                  <td>{todo.dateStart}</td>
                  <td>1 day</td>
                  <td>1 day</td>
                  <td>
                    <button onClick={() => deleteTodoHandler(todo.id)}>
                      Delete
                    </button>
                    <button onClick={() => markTodoFineshedHandler(todo.id)}>
                      {todo.finished ? "fault" : "Finished"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>I don't have anything to do.</p>
        )}
      </div>
    </div>
  );
}

export default App;
