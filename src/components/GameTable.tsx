import { useState } from "react";
import { Trash2, Check, X, Edit2 } from "lucide-react";
import { Game } from "../types/game";
import "./GameTable.css";

interface GameTableProps {
  games: Game[];
  onUpdate: (game: Game) => void;
  onDelete: (id: string) => void;
}

export function GameTable({ games, onUpdate, onDelete }: GameTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Game | null>(null);

  const startEdit = (game: Game) => {
    setEditingId(game.id);
    setEditForm({ ...game });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const saveEdit = () => {
    if (editForm && editForm.title.trim()) {
      onUpdate(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this game?")) {
      onDelete(id);
    }
  };

  if (games.length === 0) {
    return (
      <div className="empty-table">
        <p>No games registered yet. Add your first game above!</p>
      </div>
    );
  }

  return (
    <div className="game-table-container">
      <table className="game-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Remarks</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              {editingId === game.id && editForm ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="table-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editForm.remarks || ""}
                      onChange={(e) => setEditForm({ ...editForm, remarks: e.target.value })}
                      className="table-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editForm.price || ""}
                      onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                      className="table-input"
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn save-btn"
                        onClick={saveEdit}
                        title="Save"
                        aria-label="Save"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        className="action-btn cancel-btn"
                        onClick={cancelEdit}
                        title="Cancel"
                        aria-label="Cancel"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>{game.title}</td>
                  <td>{game.remarks || "-"}</td>
                  <td>{game.price || "-"}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn edit-btn"
                        onClick={() => startEdit(game)}
                        title="Edit"
                        aria-label="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(game.id)}
                        title="Delete"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
