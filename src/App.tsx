import { useState, useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Search } from "lucide-react";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus the search input on component mount and window focus
  useEffect(() => {
    // Focus on initial mount (when app is first opened)
    searchInputRef.current?.focus();

    // Add event listener for window focus
    const handleWindowFocus = () => {
      searchInputRef.current?.focus();
    };

    window.addEventListener('focus', handleWindowFocus);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="container">
      <h1>Welcome to the Gamedex</h1>

      <div className="row">
      </div>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="search-input"
          ref={searchInputRef}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a game title..."
        />
        <button type="submit" className="icon-button">
          <Search size={20} />
        </button>
      </form>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
