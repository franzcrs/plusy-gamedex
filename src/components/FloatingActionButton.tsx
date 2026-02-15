import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import "./FloatingActionButton.css";

interface FloatingActionButtonProps {
  onRegisterClick: () => void;
}

export function FloatingActionButton({
  onRegisterClick,
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const handleClickDocument = () => {
        setIsOpen(false);
      };

      document.addEventListener("click", handleClickDocument);
      return () => document.removeEventListener("click", handleClickDocument);
    }
  }, [isOpen]);

  const toggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleRegisterClick = () => {
    setIsOpen(false);
    onRegisterClick();
  };

  return (
    <div id="root-fab" className="fab-container">
      {isOpen && (
        <div className="fab-menu">
          <button className="fab-menu-item" onClick={handleRegisterClick}>
            Register Game
          </button>
        </div>
      )}
      <button
        className="fab-button icon-button"
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <Plus
          size={38}
          style={{
            transform: `rotate(${isOpen ? 45 : 0}deg)`,
            transition: "transform 0.3s ease",
          }}
        />
      </button>
    </div>
  );
}
