import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SearchPage from "./pages/SearchPage";
import PropertyPage from "./pages/PropertyPage";
import Header from "./components/Header";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/property/:id" element={<PropertyPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
