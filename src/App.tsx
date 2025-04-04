import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import SelectorComparison from "./components/SelectorComparison/SelectorComparison";
import OptimisticTodo from "./components/OptimisticTodo/OptimisticTodo";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 py-8">
        <OptimisticTodo />
      </div>
    </Provider>
  );
}

export default App;
