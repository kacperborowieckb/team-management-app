import { useState } from 'react';
import TaskPopup from '../task-popup/TaskPopup';
import './task-item.scss';

const TaskItem = ({ title, content, color, taskId, uid, createdAt, createdBy, group = '' }) => {
  const [isTaskPopupOpen, setIsTaskPopUpOpen] = useState(false);

  const toogleTaskPopup = () => setIsTaskPopUpOpen(!isTaskPopupOpen);

  return (
    <>
      <section
        className="task-item"
        style={{ backgroundColor: color, cursor: taskId && 'pointer' }}
        onClick={taskId ? toogleTaskPopup : undefined}
      >
        <h4 className="task-item__title">{title}</h4>
        <p className="task-item__content">{content}</p>
      </section>
      {isTaskPopupOpen && (
        <TaskPopup
          title={title}
          content={content}
          closePopup={toogleTaskPopup}
          color={color}
          taskId={taskId}
          uid={uid}
          createdAt={createdAt}
          createdBy={createdBy}
          group={group}
        />
      )}
    </>
  );
};

export default TaskItem;
