import './task-item.scss';

const TaskItem = ({ title, content }) => {
  return (
    <section className="task-item">
      <h4 className="task-item__title">{title}</h4>
      <p className="task-item__content">{content}</p>
    </section>
  );
};

export default TaskItem;
