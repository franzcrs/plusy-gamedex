import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { gameService } from "./services/gameService";
import { Game } from "./types/game";
import { FloatingActionButton } from "./components/FloatingActionButton";
import { RegisterScreen } from "./components/RegisterScreen";
import { SearchResults } from "./components/SearchResults";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  // Focus the search input on component mount and window focus
  useEffect(() => {
    searchInputRef.current?.focus();

    const handleWindowFocus = () => {
      searchInputRef.current?.focus();
    };

    window.addEventListener("focus", handleWindowFocus);

    return () => {
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, []);

  // Real-time search - trigger search on every keystroke
  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.trim()) {
        try {
          const results = await gameService.searchGames(searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error("Search failed:", error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    };

    performSearch();
  }, [searchQuery]);

  // Scroll to results when they appear
  useEffect(() => {
    if (searchResults.length > 0) {
      setTimeout(() => {
        searchResultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
    }
  }, [searchResults]);

  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setIsRegisterOpen(false);
  };

  return (
    <main className="container">
      <h1>Welcome to the Gamedex</h1>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="search-bar">
          <input
            id="search-input"
            ref={searchInputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            placeholder="Enter a game title..."
          />
          <Search size={20} className="search-icon" />
        </div>
      </form>

      <SearchResults
        ref={searchResultsRef}
        games={searchResults}
        isVisible={searchQuery.trim().length > 0}
      />

      <FloatingActionButton onRegisterClick={handleRegisterClick} />
      <RegisterScreen isOpen={isRegisterOpen} onClose={handleRegisterClose} />
    </main>
  );
}

export default App;
