import { BrowserRouter as Router } from 'react-router-dom';
import { MainRouters } from './routes/Router';

function App() {
  return (
    <Router>
      <MainRouters />
    </Router>
  );
}

export default App;
