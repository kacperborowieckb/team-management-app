import './task-item.scss';

const TaskItem = ({ title, content, color }) => {
  return (
    <section className="task-item" style={{ backgroundColor: color }}>
      <h4 className="task-item__title">{title}</h4>
      <p className="task-item__content">{content}</p>
    </section>
  );
};

export default TaskItem;
