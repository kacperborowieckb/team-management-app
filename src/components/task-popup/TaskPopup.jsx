import { AiOutlineClose } from 'react-icons/Ai';
import './task-popup.scss';

const TaskPopup = ({ title, content, closePopup, color }) => {
  return (
    <section className="task-popup">
      <section className="task-popup__container" style={{ backgroundColor: color }}>
        <div className="task-popup__backdrop"></div>
        <AiOutlineClose className="task-popup__close" onClick={closePopup} />
        <section className="task-popup__title-section" style={{ backgroundColor: color }}>
          <h2 className="task-popup__title">{title}</h2>
        </section>
        <section className="task-popup__content-section" style={{ backgroundColor: color }}>
          <p className="task-popup__content">{content}</p>
        </section>
      </section>
    </section>
  );
};

export default TaskPopup;
