const AddModal = ({ showModal, setShowModal }) => {
  return (
    <div class="modal">
      <div class="modal__overlay">
        <dialog
          id="add-task-modal"
          class="modal__content"
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          <div class="modal__body"></div>
          <div class="modal__footer">
            <button class="btn modal__button--cancel">Cancel</button>
            <button class="btn modal__button--primary">Add Task</button>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default AddModal;
