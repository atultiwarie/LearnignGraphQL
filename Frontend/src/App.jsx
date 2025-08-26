import "./App.css";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`;

function App() {
  const { data, loading } = useQuery(query);
  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Todos</h1>
      <ul className="space-y-2">
        {data.getTodos.map((todo) => (
          <li key={todo.id} className="border p-3 rounded shadow">
            <p className="font-semibold">{todo.title}</p>
            <p>{todo.completed ? "✅ Done" : "❌ Not Done"}</p>
            <p className="text-sm text-gray-600">By: {todo.user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
