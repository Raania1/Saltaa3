import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Inscription from "./composant/inscription";
import Login from "./composant/login";
import Profil from "./composant/profil";
import Compteur from "./composant/compteur";

function App() {
  return (
  <>

<BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='inscrire' element={<Inscription/>}></Route>
      <Route path='profile' element={<Profil/>}></Route>
      <Route path='compteur' element={<Compteur/>}></Route>
    </Routes>
 </BrowserRouter>

  

  </>
  );
}

export default App;
