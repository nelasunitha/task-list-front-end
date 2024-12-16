import PropTypes from 'prop-types';
import Task from './Task';
import './TaskList.css';

const TaskList = ({ tasks, onTaskClickCallback, onTaskDeleteCallback }) => {
  const taskComponents = (tasks).map((task) => {
    return (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        isComplete={task.isComplete}
        onToggleComplete={onTaskClickCallback}
        onDeleteTask={onTaskDeleteCallback}
      />);
  });
  return (
    <ul className="tasks__list no-bullet">
      {taskComponents}
    </ul>
  );
};


TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onTaskClickCallback: PropTypes.func.isRequired,
  onTaskDeleteCallback: PropTypes.func.isRequired,
};

export default TaskList;
