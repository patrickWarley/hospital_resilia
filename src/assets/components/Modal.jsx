function Modal({ body, id, onClose, show }) {
  return (
    <div>

      <div className="modal modal-lg fade" id={id} tabindex="-1" aria-labelledby={id} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Modal;