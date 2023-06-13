import './App.css';
import { useState, useEffect } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const deleteToDo = (id) => {
    setToDos(toDos.filter((key) => key.id !== id));
  };

  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const currentDay = days[currentDate.getDay()];
    return currentDay;
  };

  const addTodo = () => {
    if (toDo.trim() !== '') {
      setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
      setToDo('');
    } else {
      alert('Please Fill');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <div className='backg'>
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br /> 
        <h2>Whoop, it's <h2 className='daydesign'>{getCurrentDay()}</h2>   </h2>
      </div>
      <div className="clock">
        <Clock value={currentTime} />
      </div>
      
      </div>
      <div className="clear-all-container">
        <button onClick={() => setToDos([])} className="clear-all">Clear All</button>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={addTodo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => (
          <div className="todo" key={obj.id}>
            <div className="left">
              <input
                onChange={(e) => {
                  setToDos(
                    toDos.map((todo) => {
                      if (todo.id === obj.id) {
                        todo.status = e.target.checked;
                      }
                      return todo;
                    })
                  );
                }}
                value={obj.status}
                type="checkbox"
                name=""
                id=""
              />
              <p>{obj.text}</p>
            </div>
            <div className="right">
              <i onClick={() => deleteToDo(obj.id)} className="fas fa-times"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default App;
