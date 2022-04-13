import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./routes/Layout";
import Login from "./routes/Login";
import Landing from "./routes/Landing";
import FinDash from "./routes/FinDash";
import TechDash from "./routes/TechDash";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  useEffect(() => {
    console.log("App: useEffect called => first render complete");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/findash"
          element={
            <RequireAuth pageKey="fin_dash">
              <FinDash />
            </RequireAuth>
          }
        />
        <Route
          path="/techdash"
          element={
            <RequireAuth pageKey="tech_dash">
              <TechDash />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
