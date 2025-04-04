import { useState, useOptimistic, useRef } from "react";
import "./OptimisticTodo.scss";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  sending?: boolean;
}

// Simulated API call
const addTodo = async (text: string): Promise<Todo> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  return { id: Date.now(), text, completed: false };
};

const toggleTodo = async (todo: Todo): Promise<Todo> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  return { ...todo, completed: !todo.completed };
};

const OptimisticTodo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, newTodo]
  );

  async function handleAddTodo(formData: FormData) {
    const text = formData.get("todo") as string;
    if (!text || !text.trim()) return;

    // Create optimistic todo
    const optimisticTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      sending: true,
    };

    // Add optimistic todo immediately
    addOptimisticTodo(optimisticTodo);

    // Reset the form
    formRef.current?.reset();

    try {
      // Simulate API call
      const newTodo = await addTodo(text.trim());
      setTodos((prev) => [...prev, { ...newTodo, sending: false }]);
    } catch (error) {
      console.error("Failed to add todo:", error);
      // In a real app, you might want to show an error message or revert the optimistic update
    }
  }

  async function handleToggleTodo(todo: Todo) {
    // Create optimistic update
    const optimisticUpdate: Todo = {
      ...todo,
      completed: !todo.completed,
      sending: true,
    };

    // Update the optimistic state
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? optimisticUpdate : t))
    );

    try {
      // Simulate API call
      const updatedTodo = await toggleTodo(todo);
      setTodos((prev) =>
        prev.map((t) =>
          t.id === updatedTodo.id ? { ...updatedTodo, sending: false } : t
        )
      );
    } catch (error) {
      console.error("Failed to toggle todo:", error);
      // Revert the optimistic update on error
      setTodos((prev) =>
        prev.map((t) =>
          t.id === todo.id
            ? { ...t, completed: !t.completed, sending: false }
            : t
        )
      );
    }
  }

  return (
    <div className="optimistic-todo">
      <h1>Optimistic Todo List</h1>

      <form action={handleAddTodo} ref={formRef} className="todo-form">
        <div className="form-group">
          <input type="text" name="todo" placeholder="Add a new todo..." />
          <button type="submit">Add</button>
        </div>
      </form>

      <ul className="todo-list">
        {optimisticTodos.length > 0 ? (
          optimisticTodos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo)}
                disabled={todo.sending}
              />
              <span className={todo.completed ? "completed" : ""}>
                {todo.text}
                {todo.sending && (
                  <span className="sending-indicator"> (Saving...)</span>
                )}
              </span>
            </li>
          ))
        ) : (
          <li className="empty-state">No todos yet. Add one above!</li>
        )}
      </ul>
    </div>
  );
};

export default OptimisticTodo;
