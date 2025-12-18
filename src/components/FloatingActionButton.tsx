import { useState } from "react";
import { Plus, X } from "lucide-react";
import "./FloatingActionButton.css";

interface FloatingActionButtonProps {
  onRegisterClick: () => void;
}

export function FloatingActionButton({ onRegisterClick }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleRegisterClick = () => {
    setIsOpen(false);
    onRegisterClick();
  };

  return (
    <div className="fab-container">
      {isOpen && (
        <div className="fab-menu">
          <button className="fab-menu-item" onClick={handleRegisterClick}>
            Register Game
          </button>
        </div>
      )}
      <button className="fab-main" onClick={toggleMenu} aria-label="Menu">
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </button>
    </div>
  );
}
