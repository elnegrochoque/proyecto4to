import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./components/Inicio";
import InicioEval from './components/alumno/InicioEval';
import Navegacion from './components/common/Navegacion';
import Admin from './components/administrador/Admin';
import { useState, useEffect } from 'react';
import NuevoUsuario from './components/nuevoUsuario/NuevoUsuario';
import NuevoUsuarioAdmin from './components/administrador/NuevoUsuarioAdmin';
import EditarPersona from './components/administrador/EditarPersona';
import PrincipalProfesor from './components/profesor/PrincipalProfesor';
import CrearEvaluacion from './components/profesor/CrearEvaluacion';
import EvaluacionNuevaProfesor from './components/profesor/EvaluacionNuevaProfesor';
import ModificarEvaluacion from './components/profesor/ModificarEvaluacion';
import EditarEvaluacion from './components/profesor/EditarEvaluacion';
import EvaluacionAlumno from './components/alumno/EvaluacionAlumno';
import PreguntaAlumno from './components/alumno/PreguntaAlumno';



function App() {

  const URL = process.env.REACT_APP_API_URL + "personas";
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

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Inicio personas={personas} consultarAPI={consultarAPI}></Inicio>
        </Route>
        <Route exact path="/nuevoUsuario">
          <NuevoUsuario personas={personas} consultarAPI={consultarAPI}></NuevoUsuario>
        </Route>
        <Route exact path="/alumno/:id">
          <Navegacion></Navegacion>
          <InicioEval></InicioEval>
        </Route>
        <Route exact path="/alumno/:idAlumno/evaluacion/:idEvaluacion">
          <Navegacion></Navegacion>
          <EvaluacionAlumno></EvaluacionAlumno>
        </Route>
        <Route exact path="/alumno/:idAlumno/evaluacion/:idEvaluacion/pregunta/:numeroPregunta">
          <Navegacion></Navegacion>
          <PreguntaAlumno></PreguntaAlumno>
        </Route>
        <Route exact path="/profesor/:id">
          <Navegacion></Navegacion>
          <PrincipalProfesor personas={personas} consultarAPI={consultarAPI}></PrincipalProfesor>
        </Route>
        <Route exact path="/profesor/:id/crearevaluacion">
          <Navegacion></Navegacion>
          <CrearEvaluacion></CrearEvaluacion>
        </Route>
        <Route exact path="/profesor/:id/crearevaluacion/:id">
          <Navegacion></Navegacion>
          <EvaluacionNuevaProfesor></EvaluacionNuevaProfesor>
        </Route>
        <Route exact path="/profesor/:id/modificarevaluaciones">
          <Navegacion></Navegacion>
          <ModificarEvaluacion></ModificarEvaluacion>
        </Route>
        <Route exact path="/profesor/:id/modificarevaluaciones/editar/:id">
          <Navegacion></Navegacion>
          <EditarEvaluacion></EditarEvaluacion>
        </Route>
        <Route exact path="/administrador/:id">
          <Navegacion></Navegacion>
          <Admin personas={personas} consultarAPI={consultarAPI}></Admin>
        </Route>
        <Route exact path="/administrador/:id/editar/:id">
          <Navegacion></Navegacion>
          <EditarPersona personas={personas} consultarAPI={consultarAPI}></EditarPersona>
        </Route>
        <Route exact path="/administrador/:id/nuevousuarioadmin">
          <Navegacion></Navegacion>
          <NuevoUsuarioAdmin personas={personas} consultarAPI={consultarAPI}></NuevoUsuarioAdmin>
        </Route>


      </Switch>

    </Router>
  );
}

export default App;
