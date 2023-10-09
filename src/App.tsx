import toast from 'react-hot-toast';
import './App.css';
import { Button } from './components/ui/button';

function App() {
  const notify = () => toast.success('Here is your toast.');
  return (
    <div>
      <Button onClick={notify}>Hi</Button>
    </div>
  );
}

export default App;
