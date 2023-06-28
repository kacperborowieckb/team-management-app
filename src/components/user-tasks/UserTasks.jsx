import React from 'react';
import Button from '../button/Button';
import TaskItem from '../task-item/TaskItem';
import './user-tasks.scss';

const UserTasks = ({ tasks, uid, toogleAddTaskPopUp }) => {
  return (
    <>
      <section className="user-tasks">
        {tasks.length > 0 ? (
          tasks.map(({ title, content, color, taskId, createdAt, createdBy }) => (
            <TaskItem
              title={title}
              content={content}
              color={color}
              key={taskId}
              taskId={taskId}
              uid={uid}
              createdAt={createdAt}
              createdBy={createdBy}
            />
          ))
        ) : (
          <h3 className="user-tasks__no-tasks">Empty here..</h3>
        )}
      </section>
      <Button buttonType="add-task" handleOnClick={toogleAddTaskPopUp}>
        Add Task
      </Button>
    </>
  );
};

export default UserTasks;
