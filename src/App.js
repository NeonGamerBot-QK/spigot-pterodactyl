import { isLoggedIn } from './util/loginsys';
import Login from './components/Login';
import Servers from './components/Servers';
import ServerInfo from './components/ServerInfo';


function App() {

 

  if (!isLoggedIn()) {
    return <Login />
  }
  return (
    <div className="min-h-screen hero bg-base-200">
  <div className="text-center hero-content">
    <div className="max-w-xl">
      {new URL(window.location.href).searchParams.get('server') ? <ServerInfo />: <Servers />}
    </div>
  </div>
</div>
  );
}

export default App;
