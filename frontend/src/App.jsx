import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import GraphView from "./components/GraphView";

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/graph"
                element={<GraphView />}
            />
        </Routes>
    );
}

export default App;