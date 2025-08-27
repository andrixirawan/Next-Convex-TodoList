"use client";

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Pencil, Trash2, X, CheckCircle } from "lucide-react";

const DashboardPage = () => {
  const { signOut } = useAuthActions();
  const todos = useQuery(api.todos.getTodos);
  const [newTodo, setNewTodo] = useState("");
  const createTodo = useMutation(api.todos.createTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);

  return (
    <div className="space-y-4">
      <Button onClick={() => void signOut()}>Sign Out</Button>

      <Input
        placeholder="Add a todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />

      <Button onClick={() => createTodo({ value: newTodo })}>Add</Button>

      {todos && todos.length > 0 ? (
        todos.map((todo) => (
          <div key={todo._id} className="flex items-center gap-2">
            <Input
              value={todo.value}
              onChange={(e) =>
                updateTodo({
                  id: todo._id,
                  value: e.target.value,
                  done: todo.done,
                })
              }
            />
            <Button onClick={() => toggleTodo({ id: todo._id })}>
              {todo.done ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
              <Pencil className="h-4 w-4" />
            </Button>
            <Button onClick={() => deleteTodo({ id: todo._id })}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))
      ) : (
        <div>No todos found</div>
      )}
    </div>
  );
};

export default DashboardPage;
