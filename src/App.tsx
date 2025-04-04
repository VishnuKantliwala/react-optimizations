import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import SelectorComparison from "./components/SelectorComparison/SelectorComparison";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <SelectorComparison />
        </div>
      </div>
    </Provider>
  );
}

export default App;
