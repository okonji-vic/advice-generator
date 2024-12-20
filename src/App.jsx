import React from "react";
import "./styles.css";

export default function App() {
  const [dataInput, setDataInput] = React.useState("");
  const [count, setCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  async function getAdvice() {
    setLoading(true);
    try {
      const result = await fetch("https://api.adviceslip.com/advice");
      const data = await result.json();
      setDataInput(data.slip.advice);
      setCount((prev) => prev + 1);
    } catch (error) {
      setDataInput("Failed to fetch advice. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>💡 Advice Generator</h1>
      </header>
      <main className="main-content">
        <div className="advice-box">
          <h2 className={`advice-text ${loading ? "loading" : ""}`}>
            {loading ? "Fetching advice..." : dataInput || "Click below to get advice!"}
          </h2>
          <button className="advice-button" onClick={getAdvice} disabled={loading}>
            {loading ? "Loading..." : "Get Advice"}
          </button>
        </div>
        {count > 0 && <p className="counter">You've received {count} pieces of advice!</p>}
      </main>
      <footer className="footer">
        <p>Created with ❤️ by Okonji Emeka</p>
      </footer>
    </div>
  );
}
