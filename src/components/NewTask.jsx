import { useState } from 'react';

const NewTaskForm = ({ handleSubmit }) => {
  const kDefaultFormState = {
    title: '',
    is_complete: '',
    description: '',
  };

  const [formData, setFormData] = useState(kDefaultFormState);

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newFormData = { ...formData, [fieldName]: fieldValue };
    setFormData(newFormData);
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    handleSubmit(formData);
    setFormData(kDefaultFormState);
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <div>
        <label htmlFor='title'>Title: </label>
        <input
          type='text'
          id='title'
          name='title'
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='description'>Description: </label>
        <input
          type='text'
          id='description'
          name='description'
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <input type='submit' value='Add a task' />
      </div>
    </form>
  );
};

export default NewTaskForm;


// <div>
// <label htmlFor='isComplete'>Is Complete?: </label>
// <input
//   type='text'
//   id='isComplete'
//   name='isComplete'
//   value={formData.is_complete}
//   onChange={handleChange}
// />
// </div>