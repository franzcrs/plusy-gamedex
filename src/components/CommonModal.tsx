import "./CommonModal.css";

type CommonModalProps = {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
};

function CommonModal(props: CommonModalProps) {
  return (
    <div className="modal-backdrop" onClick={props.onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{props.title}</h3>
        <p>{props.message}</p>
        <div className="modal-buttons">
          <button data-button-type="cancel" autoFocus onClick={props.onCancel}>
            {props.cancelText || "Cancel"}
          </button>
          <button onClick={props.onConfirm}>
            {props.confirmText || "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommonModal;
