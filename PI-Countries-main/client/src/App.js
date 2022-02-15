import './App.css';
import { Route, Switch } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import AddActivity from './components/AddActivity';
import Nav from './components/Nav';
import Detail from './components/Detail';

function App() {
  return (
    <div className="App">
    <Route path='/countries' component={Nav}/>  
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path='/countries' component={Home}/>
      <Route exact path='/countries/AddActivity' component={AddActivity}/>
      <Route path='/countries/:id' component={Detail}/>
    </Switch>  
    </div>
  );
}

export default App;
