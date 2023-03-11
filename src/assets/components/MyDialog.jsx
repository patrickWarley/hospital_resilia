import { Dialog } from "@headlessui/react";

function MyDialog({ confirm, cancel, title, description, isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="position-relative" style={{ zIndex: 50 }}>
      <div className="position-fixed top-0 bottom-0 end-0 start-0 bg-dark bg-opacity-50" aria-hidden="true" />
      <div className="position-fixed top-0 bottom-0 end-0 start-0 overflow-y-auto">
        <div className="d-flex min-vh-100 align-items-center justify-content-center p-4">
          <Dialog.Panel className="bg-light p-4 text-center rounded-1">
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>
              {description}
            </Dialog.Description>

            <p>
            </p>

            <button className="btn btn-danger" onClick={confirm}>Confirmar</button>
            <button className="btn " onClick={cancel}>Cancelar</button>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog >
  )
}

export default MyDialog;