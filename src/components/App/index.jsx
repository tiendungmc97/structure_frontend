import AppHeader from 'components/AppHeader';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

App.propTypes = {};

function App(props) {
  const user = useSelector((state) => state.user.current.customer);

  return (
    <div>
      <AppHeader />
      <Routes>
      </Routes>
    </div>
  );
}

export default App;
