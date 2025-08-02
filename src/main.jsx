// LOGIC
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// COMPONENTS
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./auth/AuthContext";
import { ApiProvider } from "./api/ApiContext";
import { PageProvider } from "./layout/PageContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ApiProvider>
      <PageProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PageProvider>
    </ApiProvider>
  </AuthProvider>
);
