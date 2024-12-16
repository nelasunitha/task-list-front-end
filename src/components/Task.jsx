import PropTypes from 'prop-types';
import './Task.css';

const Task = ({
  id,
  title,
  isComplete,
  onClickCallback,
  onDeleteCallback,
}) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  const onCompletionClick = () => {
    onClickCallback(id);
  };

  const onDeleteClick = () => {
    onDeleteCallback(id);
  };

  return (
    <li className="tasks__item">
      <button className={`tasks__item__toggle ${buttonClass}`} onClick={onCompletionClick}>{title}
      </button>
      <button className="tasks__item__remove button" onClick={onDeleteClick}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onCompleteTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default Task;