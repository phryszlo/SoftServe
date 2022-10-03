import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import AutoTable from '../elements/AutoTable';

function Tasks(props) {
  const [tasks, setTasks] = React.useState(null);
  const [linkFields, setLinkFields] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      console.log(`tasksFromServer = ${Object.values(tasksFromServer)}`)
      console.log(`linkFields = ${linkFields}`)
      setTasks(tasksFromServer)
    }
    getTasks();

  }, []);

  const fetchTasks = async () => {
    const res = await fetch('/api/tasks/')
    console.log(`res: ${Object.entries((key, entry) => key === 'allTasks')}`);
    const data = await res.json()

    console.log(`data from fetch all tasks: ${data['allTasks']}`);
    setLinkFields(Object.values(data)[0]);

    return data.allTasks;
  }

  const handleAddTaskClick = (e) => {
    e.preventDefault();
    navigate('/task', {
      props: {
        document: {
          name: 'Default P. Task',
          email: 'deefie@gmail.com',
          phone: '(790) 291-1596',
          image_url: 'http://thispersondoesnotexist.com/image',
          foo: false
        }
      }
    });

  }

  /*🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸
    🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹*/
  return (
    <div className='page-component tasks-page'>
      <h1 className="page-title">{props.title}</h1>

      {
        tasks ?
          <AutoTable title="all tasks" route="tasks" linkFields={linkFields} documents={tasks}></AutoTable>
          // : <div className="no-table-here">NO CLIENT PROP RECEIVED</div>
          : <div className="no-table-here"></div>
      }

      <button className="btn-add-task" onClick={handleAddTaskClick}>add new</button>

    </div>
  );
}

Tasks.defaultProps = {
  title: `Moe's Software Services Taskéle`,
}

export default Tasks