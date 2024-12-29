import React, { useState, useEffect } from "react";
import AddBtn from "../components/AddBtn";
import Textfield from "../components/Textfield";
import supabase from "../supabase-client";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInsertedNewData, setIsInsertedNewData] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, [isInsertedNewData]);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("TodoList").select("*");
    if (error) {
      console.log("Error fetching data", error);
    } else {
      setTodoList(
        data.filter((todo) => todo && todo.name && todo.isCompleted !== undefined)
      ); // Ensure valid data only
    }
    if (isInsertedNewData) {
      setIsInsertedNewData(false); 
    }
  };  

  const addTodo = async (e) => {
    e.preventDefault();
    const newTodoData = { name: newTodo, isCompleted: false };
    const { data, error } = await supabase
      .from("TodoList")
      .insert([newTodoData])
      .single();
    if (error) {
      console.log("Error adding Todo", error);
    } else {
      setTodoList((prev) => [...prev, data]);
      setIsInsertedNewData(true);
      setNewTodo("");
    }
  };

  const updateTodo = async (e) => {
    e.preventDefault();
    if (!editTodo || !editTodo.id) return;
    const { error } = await supabase
      .from("TodoList")
      .update({ name: editTodo.name })
      .eq("id", editTodo.id);
    if (error) {
      console.log("Error updating Todo", error);
    } else {
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === editTodo.id ? { ...todo, name: editTodo.name } : todo
        )
      );
      setEditTodo();
      setIsEditModalOpen(false);
    }
  };

  const completeTask = async (id, isCompleted) => {
    const { error } = await supabase
      .from("TodoList")
      .update({ isCompleted: !isCompleted })
      .eq("id", id);
    if (error) {
      console.log("Error toggling task");
    } else {
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
        )
      );
    }
  };

  const deleteTask = async (id) => {
    const { error } = await supabase.from("TodoList").delete().eq("id", id);
    if (error) {
      console.log("Error deleting task");
    } else {
      setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  const openEditModal = (todo) => {
    setEditTodo({ id: todo.id, name: todo.name });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditTodo(null);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="h-[100vh] w-full bg-background font-sans px-7 py-16 text-text">
        <div className="w-full h-16 flex justify-between items-center">
          <h1 className="text-4xl font-bold">Todo List</h1>
        </div>
        <div className="w-full h-[70vh] mt-10 py-2 pr-1 overflow-y-auto scrollbar-thin scrollbar-webkit">
          {todoList.map((todo) => todo &&(
            <ul
              key={todo.id}
              className="w-full h-[7vh] px-4 mb-4 bg-white rounded-2xl shadow-md flex justify-between items-center"
            >
              <li className="flex justify-between items-center">
                <button
                  onClick={() => completeTask(todo.id, todo.isCompleted || false)}
                  className={`border w-5 h-5 rounded-full ${
                    todo.isCompleted ? "border-gray-500" : "border-black"
                  }`}
                ></button>
                <p
                  className={`pl-4 text-2xl ${
                    todo.isCompleted
                      ? "line-through decoration-gray-500 text-gray-500"
                      : ""
                  }`}
                >
                  {todo.name}
                </p>
              </li>
              <div>
                <button onClick={() => openEditModal(todo)}>
                  <img
                    className="w-5 mt-2"
                    src="/EditIcon.png"
                    alt="EditIcon"
                  />
                </button>
                <button onClick={() => deleteTask(todo.id)}>
                  <img
                    className="w-5 ml-4"
                    src="/DeleteIcon.png"
                    alt="DeleteIcon"
                  />
                </button>
              </div>
            </ul>
          ))}
        </div>
        <form className="flex justify-between items-center">
          <Textfield
            placeholder={"Write Task"}
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <AddBtn btnName={"Add Task"} onClick={addTodo} />
        </form>
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white px-5 py-6 rounded-lg shadow-lg w-auto h-auto flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Edit Task</h2>
              <button
                className="bg-myRed text-white px-4 py-2 rounded-2xl"
                onClick={closeEditModal}
              >
                Close
              </button>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Textfield
                placeholder={"Edit Task"}
                value={editTodo ? editTodo.name : ""}
                onChange={(e) =>
                  setEditTodo((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <AddBtn btnName={"Update"} onClick={updateTodo} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
