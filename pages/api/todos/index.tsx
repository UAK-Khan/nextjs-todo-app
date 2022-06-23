import {NextApiRequest, NextApiResponse} from "next";
import {TodoType} from "../../../types/types";

let todos:TodoType[] = [];

const getAllTodos = ():TodoType[] => {
  return todos;
};
const updateTodo = (id: number, updatedTodo: TodoType) => {
  todos = todos.map((todo) => todo.id === id ? updatedTodo: todo);
};
const deleteTodo = (id: number) => {
  todos = todos.filter((todo) => todo.id !== id);
};
const createTodo = (newTodo: TodoType) => {
  todos.push({ ...newTodo, id: todos.length + 1 });
};


const todoHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  switch (method) {
    case "GET":
      res.json(getAllTodos());
      break;
    case "POST":
      createTodo(JSON.parse(req.body));
      res.json({ message: "Todo created" });
      break;
    case "DELETE":
      const deleteTodoId = req.query.id as unknown as number;
      deleteTodo(+deleteTodoId);
      res.json({ message: "Todo deleted" });
      break;
    case "PUT":
      const updateTodoId = req.query.id as unknown as number;
      updateTodo(updateTodoId, JSON.parse(req.body));
      res.json({ message: "Todo updated" });
      break;
  }
}

export default todoHandler;