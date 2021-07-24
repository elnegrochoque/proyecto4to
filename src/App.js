import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./components/Inicio";
import InicioEval from './components/alumno/InicioEval';
import Navegacion from './components/common/Navegacion';
import Admin from './components/administrador/Admin';
import { useState, useEffect } from 'react';
import NuevoUsuario from './components/nuevoUsuario/NuevoUsuario';



function App() {
  
  const URL = process.env.REACT_APP_API_URL;
  const [personas, setPersonas] = useState([]);
  useEffect(() => {
    consultarAPI();
  }, []);

  const consultarAPI = async () => {
    try {
      const consulta = await fetch(URL);
      const respuesta = await consulta.json();

      setPersonas(respuesta);

    
    } catch (error) {
      console.log(error);
    }
  }

console.log(personas);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Inicio personas={personas} consultarAPI={consultarAPI}></Inicio>
        </Route>
        <Route exact path="/nuevoUsuario">
            <NuevoUsuario personas={personas} consultarAPI={consultarAPI}></NuevoUsuario>
        </Route>
        <div>
          <Navegacion></Navegacion>
          <Route exact path="/alumno">
            <InicioEval></InicioEval>
          </Route>
          <Route exact path="/administrador/:id">
            <Admin></Admin>
          </Route>
        </div>
      </Switch>

    </Router>
  );
}

export default App;
