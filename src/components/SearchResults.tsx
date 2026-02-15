import { Game } from "../types/game";
import "./SearchResults.css";

interface SearchResultsProps {
  games: Game[];
  isVisible: boolean;
}

export function SearchResults({ games, isVisible }: SearchResultsProps) {
  if (!isVisible) return null;

  if (games.length === 0) {
    return (
      <div className={`search-results ${isVisible ? "visible" : ""}`}>
        <div className="no-results">
          <p>No games found matching your search.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`search-results ${isVisible ? "visible" : ""}`}>
      <table className="results-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Remarks</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td className="title-cell"><span className="cell-text">{game.title}</span></td>
              <td><span className="cell-text">{game.remarks || "-"}</span></td>
              <td><span className="cell-text">{game.price || "-"}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
