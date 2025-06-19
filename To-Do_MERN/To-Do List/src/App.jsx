import { useState, useEffect } from 'react';
import './App.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [todolist, setToDoList] = useState([]);

  // ------------ Fetch todos from MongoDB ------------
  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(res => setToDoList(res.data))
      .catch(err => console.error("Error fetching todos:", err));
  }, []);

  // ------------ Handle form submit ------------
  let saveToDoList = (event) => {
    event.preventDefault();
    let todoname = event.target.todoname.value.trim();
    toast.dismiss();

    if (!todoname) {
      toast.warn('ToDo name cannot be empty.', {
        position: "top-center",
        autoClose: 3000,
        theme: "colored"
      });
      return;
    }

    if (!todolist.find(item => item.name === todoname)) {
      axios.post('http://localhost:5000/todos', { name: todoname })
        .then((res) => {
          setToDoList(prev => [...prev, res.data]); // Use returned todo
          toast.success('ToDo added successfully...', {
            position: "top-center",
            autoClose: 3000,
            theme: "colored"
          });
        })
        .catch(err => console.error("Error adding todo:", err));
      event.target.todoname.value = '';
    } else {
      toast.error('ToDo already exists...', {
        position: "top-center",
        autoClose: 3000,
        theme: "colored"
      });
    }
  };

  // ------------ Render list items ------------
  let list = todolist.map((item, index) => (
    <ToDoListItems
      key={item._id}
      id={item._id}
      value={item.name}
      indexNumber={index}
      todolist={todolist}
      setToDoList={setToDoList}
    />
  ));

  return (
    <>
      <h1>To Do List</h1>

      <form onSubmit={saveToDoList}>
        <input type="text" name="todoname" placeholder="Enter task..." />
        <button>Save</button>
      </form>

      <div className="outerdiv">
        <ul>
          {list}
        </ul>
      </div>
    </>
  );
}

export default App;

// ------------ Reusable ToDo List Item component ------------
function ToDoListItems({ id, value, indexNumber, todolist, setToDoList }) {
  let [status, setStatus] = useState(false);

  let deleteRow = () => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        let finalData = todolist.filter((v, i) => i !== indexNumber);
        setToDoList(finalData);
        toast.dismiss();
        toast.error(`"${value}" removed from ToDo list.`, {
          position: "top-center",
          autoClose: 3000,
          theme: "colored"
        });
      })
      .catch(err => console.error("Error deleting todo:", err));
  };

  let checkStatus = () => {
    setStatus(!status);
  };

  return (
    <li className={status ? 'completetodo' : ''} onClick={checkStatus}>
      {indexNumber + 1}. {value}
      <span onClick={deleteRow}>&times;</span>
    </li>
  );
}
