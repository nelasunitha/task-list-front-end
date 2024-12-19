import PropTypes from 'prop-types';
import Task from './Task';
import './TaskList.css';

const TaskList = ({ tasks, onTaskClickCallback, onTaskDeleteCallback }) => {
  const taskComponents = (tasks) => {
    if (tasks.length === 0) {
      return <p>No tasks to display</p>;
    }
    return tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
          onClickCallback={onTaskClickCallback}
          onDeleteCallback={onTaskDeleteCallback}
        />
      );
    });
  };

  return <ul className='tasks__list no-bullet'>{taskComponents(tasks)}</ul>;
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
