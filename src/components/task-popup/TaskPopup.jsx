import { useRef } from 'react';
import { AiOutlineClose } from 'react-icons/Ai';
import { BsTrash3 } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getTasksStatus, removeExistingTask } from '../../features/tasks/tasksSlice';
import { useClickToClose } from '../../hooks/useClickToClose';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';
import './task-popup.scss';

const TaskPopup = ({ title, content, closePopup, color, taskId, uid, createdAt, createdBy }) => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const popup = useRef();
  const status = useSelector(getTasksStatus);
  useClickToClose(popup, closePopup);

  const handleRemoveTask = () => dispatch(removeExistingTask({ taskId, closePopup, uid, groupId }));

  return (
    <section className="task-popup" ref={popup}>
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
          <p className="task-popup__time">Created at: {createdAt}</p>
          <p className="task-popup__author">Created by: {createdBy}</p>
        </section>
        {status === ACTION_STATUS.PENDING ? (
          <ImSpinner2 className="spinner task-popup__delete" />
        ) : (
          <BsTrash3 className="task-popup__delete" onClick={handleRemoveTask} />
        )}
      </section>
    </section>
  );
};

export default TaskPopup;
