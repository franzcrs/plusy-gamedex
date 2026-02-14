import { useState, useEffect } from "react";
import { X, Plus, Copy, Trash2, RotateCcw } from "lucide-react";
import { gameService } from "../services/gameService";
import { Game } from "../types/game";
import { GameTable } from "./GameTable";
import "./RegisterScreen.css";

interface RegisterScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormRow {
  id: number;
  title: string;
  remarks: string;
  price: string;
}

export function RegisterScreen({ isOpen, onClose }: RegisterScreenProps) {
  const [formRows, setFormRows] = useState<FormRow[]>([
    { id: 1, title: "", remarks: "", price: "" },
  ]);
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadGames();
    } else {
      initializeScreen();
    }
  }, [isOpen]);

  const initializeScreen = () => {
    setFormRows([{ id: 1, title: "", remarks: "", price: "" }]);
    setIsLoading(false);
    setIsRemoveMode(false);
    setSelectedRows([]);
  };

  const loadGames = async () => {
    try {
      const allGames = await gameService.getAllGames();
      setGames(allGames);
    } catch (error) {
      console.error("Failed to load games:", error);
    }
  };

  const handleAddRow = () => {
    const newId = Math.max(...formRows.map((r) => r.id), 0) + 1;
    setFormRows([
      ...formRows,
      { id: newId, title: "", remarks: "", price: "" },
    ]);
  };

  const handleCopyRow = () => {
    if (formRows.length > 0) {
      const lastRow = formRows[formRows.length - 1];
      const newId = Math.max(...formRows.map((r) => r.id), 0) + 1;
      setFormRows([...formRows, { ...lastRow, id: newId }]);
    }
  };

  const handleFieldChange = (
    id: number,
    field: keyof FormRow,
    value: string
  ) => {
    setFormRows(
      formRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      for (const row of formRows) {
        if (row.title.trim()) {
          await gameService.registerGame(
            row.title,
            row.remarks || undefined,
            row.price || undefined
          );
        }
      }
      // Reset form
      setFormRows([{ id: 1, title: "", remarks: "", price: "" }]);
      // Reload games
      await loadGames();
    } catch (error) {
      console.error("Failed to register games:", error);
      alert("Failed to register games. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    if (selectedRows.length > 0) {
      setFormRows(formRows.filter((r) => !selectedRows.includes(r.id)));
      setSelectedRows([]);
      setIsRemoveMode(false);
    }
  };

  const handleGameUpdate = async (game: Game) => {
    try {
      await gameService.updateGame(
        game.id,
        game.title,
        game.remarks,
        game.price
      );
      await loadGames();
    } catch (error) {
      console.error("Failed to update game:", error);
      alert("Failed to update game. Please try again.");
    }
  };

  const handleGameDelete = async (id: string) => {
    try {
      await gameService.deleteGame(id);
      await loadGames();
    } catch (error) {
      console.error("Failed to delete game:", error);
      alert("Failed to delete game. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`register-screen-overlay ${isOpen ? "open" : ""}`}>
      <div className={`register-screen ${isOpen ? "open" : ""}`}>
        <div className="register-header">
          <h2>Register Games</h2>
          <button className="close-button" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        </div>

        <div className="register-content">
          {/* Registration Form Section */}
          <div className="registration-section">
            <h3>Add New Games</h3>
            <div className="form-rows">
              {formRows.map((row) => (
                <div
                  key={row.id}
                  className={`form-row ${isRemoveMode ? "remove-mode" : ""}`}
                >
                  <div
                    className={`form-row-checkbox ${
                      isRemoveMode ? "remove-mode" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="remove-row"
                      value={row.id}
                      onChange={(e) => {
                        const id = parseInt(e.target.value);
                        setSelectedRows((prev) =>
                          prev.includes(id)
                            ? prev.filter((r) => r !== id)
                            : [...prev, id]
                        );
                      }}
                      checked={selectedRows.includes(row.id)}
                      className={`checkbox-input ${
                        isRemoveMode ? "display-checkbox" : ""
                      }`}
                    />
                  </div>
                  <div className="form-row-fields">
                    <input
                      type="text"
                      placeholder="Title *"
                      value={row.title}
                      onChange={(e) =>
                        handleFieldChange(row.id, "title", e.target.value)
                      }
                      required
                    />
                    <input
                      type="text"
                      placeholder="Remarks"
                      value={row.remarks}
                      onChange={(e) =>
                        handleFieldChange(row.id, "remarks", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Price"
                      value={row.price}
                      onChange={(e) =>
                        handleFieldChange(row.id, "price", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="form-divider">
              <div className="divider-line"></div>
              <div className="divider-buttons">
                <button
                  className="action-btn icon-button"
                  onClick={handleAddRow}
                  title="Add new row"
                  aria-label="Add new row"
                >
                  <Plus size={24} />
                </button>
                <button
                  className="action-btn icon-button"
                  onClick={handleCopyRow}
                  title="Copy last row"
                  aria-label="Copy last row"
                >
                  <Copy size={20} />
                </button>
                <button
                  className="action-btn icon-button"
                  onClick={() => {
                    setIsRemoveMode(!isRemoveMode);
                    setSelectedRows([]);
                  }}
                  title={isRemoveMode ? "Cancel remove" : "Remove row"}
                  aria-label={isRemoveMode ? "Cancel remove" : "Remove row"}
                >
                  {isRemoveMode ? (
                    <RotateCcw size={24} />
                  ) : (
                    <Trash2 size={24} />
                  )}
                </button>
              </div>
              <div className="divider-line"></div>
            </div>

            <button
              className="register-button"
              onClick={isRemoveMode ? handleRemove : handleRegister}
              disabled={
                isLoading ||
                (!isRemoveMode && !formRows.some((row) => row.title.trim())) ||
                (isRemoveMode &&
                  (selectedRows.length === 0 ||
                    selectedRows.length === formRows.length))
              }
            >
              {isRemoveMode
                ? "Remove"
                : isLoading
                ? "Registering..."
                : "Register"}
            </button>
          </div>

          {/* Games Table Section */}
          <div className="games-table-section">
            <h3>All Games</h3>
            <GameTable
              games={games}
              onUpdate={handleGameUpdate}
              onDelete={handleGameDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
