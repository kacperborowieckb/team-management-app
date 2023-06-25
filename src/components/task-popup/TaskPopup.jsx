import { AiOutlineClose } from 'react-icons/Ai';
import { BsTrash3 } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { removeExistingTask } from '../../features/tasks/tasksSlice';
import './task-popup.scss';

const TaskPopup = ({ title, content, closePopup, color, taskId, uid }) => {
  const dispatch = useDispatch();
  const handleRemoveTask = () => dispatch(removeExistingTask({ taskId, closePopup, uid }));

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
        <section className="task-popup__info">
          <p className="task-popup__time">Created at: 14 May 2023</p>
          <p className="task-popup__author">Created by: Kacper</p>
        </section>
        <BsTrash3 className="task-popup__delete" onClick={handleRemoveTask} />
      </section>
    </section>
  );
};

export default TaskPopup;
