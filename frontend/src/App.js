import logo from './logo.svg';
import './App.css';
import Reminder from './notification/Reminder';
import NotificationScreen from './notification/Notification';

function App() {
  return (
    <div className="App">
      <Reminder/>
      <NotificationScreen/>
    </div>
  );
}

export default App;
