import Button from '../button/Button';
import ColorSelector from '../color-selector/ColorSelector';
import InputField from '../input-field/InputField';
import Popup from '../popup/Popup';
import TaskItem from '../task-item/TaskItem';

const AddTaskPopup = ({
  toogleAddTaskPopUp,
  handleAddTask,
  title,
  handleTitleChange,
  content,
  handleContentChange,
  taskColor,
  setTaskColor,
}) => {
  return (
    <Popup
      heading="Add Task"
      handleClosePopUp={toogleAddTaskPopUp}
      error=""
      onSubmit={handleAddTask}
    >
      <InputField
        label="Task Title"
        labelFor="task-title"
        value={title}
        onChange={handleTitleChange}
        required
      />
      <InputField
        label="Task Content"
        labelFor="task-content"
        value={content}
        onChange={handleContentChange}
        required
      />
      <ColorSelector taskColor={taskColor} setTaskColor={setTaskColor} />
      <h5 style={{ fontWeight: 'var(--fw-semi-bold)' }}>Preview:</h5>
      <TaskItem
        title={title ? title : 'Your Title'}
        content={content ? content : 'Your very long Task Description'}
        color={taskColor}
      />
      <Button>Add Task</Button>
    </Popup>
  );
};

export default AddTaskPopup;
