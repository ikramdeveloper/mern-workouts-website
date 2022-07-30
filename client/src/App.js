import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages";
import { Header } from "./components";

const App = () => {
  return (
    <div>
      <Router>
        <Header />

        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};
export default App;
