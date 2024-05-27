import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Navbar from "./components/navbar"

function App() {
  const [todo, setTodo] = useState(""); // for single todo
  const [todos, setTodos] = useState([]); // this will hold all the arrays
  const [currentEditId, setCurrentEditId] = useState(null); // to track the id of the todo being edited
  
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  
  const SaveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  function handleChange(e) {
    setTodo(e.target.value);
    SaveToLocalStorage()
  }

  function handleAdd() {
    if (todo.trim() === "") return; // this will prevent adding empty todo
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    SaveToLocalStorage()
  }

  function handleEdit(id) {
    const todoToEdit = todos.find(item => item.id === id);
    setTodo(todoToEdit.todo); // populate the input with the todo text
    setCurrentEditId(id); // set the current edit id
    SaveToLocalStorage()
  }

  function handleSaveEdit() {
    setTodos(todos.map(item => item.id === currentEditId ? { ...item, todo } : item));
    setTodo("");
    setCurrentEditId(null); // reset the edit id;
    SaveToLocalStorage()
  }

  function handleDelete(id) {
    setTodos(todos.filter(item => item.id !== id));
    SaveToLocalStorage()
  }

  function handleCheckbox(id) {
    setTodos(todos.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item));
    SaveToLocalStorage()
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 p-8 rounded-lg shadow-lg bg-gray-100 text-gray-800 max-w-xl">
        <div className="addTodo mb-8">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a Todo"
          />
          <button
            onClick={currentEditId ? handleSaveEdit : handleAdd}
            className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {currentEditId ? "Save" : "Add"}
          </button>
        </div>
        <div className="todos space-y-4">
          {todos.map(item => (
            <div
              key={item.id}
              className="todo flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
            >
              <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => handleCheckbox(item.id)}
                className="w-5 h-5 text-blue-500 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <div className={item.isCompleted ? "line-through text-gray-600" : "text-gray-800"}>{item.todo}</div>
              <div className="buttons flex space-x-2">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="px-2 py-1 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-2 py-1 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
