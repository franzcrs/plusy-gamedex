import { useLayoutEffect, useState } from "react";
import { Trash2, Check, X, Edit2 } from "lucide-react";
import { Game } from "../types/game";
import "./GameTable.css";
import CommonModal from "./CommonModal";

interface GameTableProps {
  games: Game[];
  onUpdate: (game: Game) => void;
  onDelete: (id: string) => void;
}

export function GameTable({ games, onUpdate, onDelete }: GameTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Game | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  // FIXME: numActionButtons should be derived from an object or array representing the actions
  const numActionButtons = 2;

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
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
    }
    setShowDeleteDialog(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setDeleteId(null);
  };

  useLayoutEffect(() => {
    if (games.length === 0) return;
    const root = document.documentElement.style;
    // FIXME: Thes value below should be derived from the table structure dynamically
    root.setProperty("--gt-num-cols", "3");
    root.setProperty("--gt-num-action-buttons", `${numActionButtons}`);
  }, [games]);

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
        {/* FIXME: Render the table headers and column cells dynamically from an array */}
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
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                      className="table-input table-common-cell"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editForm.remarks || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, remarks: e.target.value })
                      }
                      className="table-input table-common-cell"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editForm.price || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, price: e.target.value })
                      }
                      className="table-input table-common-cell"
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
                  <td>
                    <p className="table-common-cell">{game.title}</p>
                  </td>
                  <td>
                    <p className="table-common-cell">{game.remarks || "-"}</p>
                  </td>
                  <td>
                    <p className="table-common-cell">{game.price || "-"}</p>
                  </td>
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
      {showDeleteDialog && (
        <CommonModal
          title="Confirm Deletion"
          message="Are you sure you want to delete this game? This action cannot be undone."
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
          confirmText="Delete"
        />
      )}
    </div>
  );
}
