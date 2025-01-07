import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // וודא שקובץ זה קיים או הסר שורה זו אם לא

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);