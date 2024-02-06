import React, {useEffect, useState}from 'react'
import './profil.css'
import Modifierprofile from './modifierprofile'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import img from "./blank-profile-picture-973460_1280.webp"
import Supprimerprofil from './Supprimerprofil';
import { Link } from 'react-router-dom';



function Profil() {
    const [file,setFile] = useState(null);
    const [updateProfil , setUpdateProfil] = useState(false)
    const [deleteprofile , setDeleteprofile] = useState(false)

    useEffect(() =>{
        window.scrollTo(0,0);
    },[]);

    const formSubmitHundler = (e) =>{
        e.preventDefault();
        
        if(!file) return alert("ther is no file!");
        alert("image uploaded")
    }

    const [user, setUser] = useState({
        nom: '',
        prenom: '',
        nomannoncceur: '',
        domaine: '',
        téléphone: '',
        email: '',
        createdAt:'',
    });
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const id = window.localStorage.getItem('UserId');
          const response = await axios.get(`http://localhost:3001/Profile/${id}`);
          setUser(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchUserProfile();
    }, []);
  
    
    
  return (
    <main>
    <section className="profile">
        <Link className="retour" to="compteur"><h9>Retour</h9></Link>
        <div className="profile-header">
            <div className="profile-image-wrapper">
                <img
                src={file ? URL.createObjectURL(file) : img} 
                alt="" 
                className='profile-image'
                />
                <form onSubmit={formSubmitHundler}>
                    <abbr title="choose profile photo">
                        <label htmlFor='file'>
                            <FontAwesomeIcon icon={faCamera} className='upload-profile-photo-icon'/>
                        </label>
                    </abbr>
                    <input style={{display:'none'}} type="file" id='file' name="file" onChange={(e) => setFile(e.target.files[0])}/>
                    <button className='upload-profile-photo-btn' type="submit">Modifié</button>
                </form>
            </div>
            <h2 className='profile-username'>{user ? `${user.nom} ${user.prenom}` : 'Chargement...'}</h2>
        </div>
        <div className="hr"></div>
        <div className='rania'>
         
            <div className="col2">
                <label>Nom de compte d'annonceur</label>
                <label>Nom</label>
                <label>Prénom</label>
                <label>Domaine</label>
                <label>Numéro de téléphone</label>
                <label>Adress mail</label>
                <div></div>
            </div>
            <div className="col1">
            <input type="text" class="form-control input" defaultValue={user ? `${user.nomannoncceur}` : 'Chargement...'} />
            <input type="text" class="form-control input" defaultValue={user ? `${user.nom}` : 'Chargement...'} />
            <input type="text" class="form-control input" defaultValue={user ? `${user.prenom}` : 'Chargement...'} />
            <input type="text" class="form-control input" defaultValue={user ? `${user.domaine}` : 'Chargement...'} />
            <input type="text" class="form-control input" defaultValue={user ? `${user.téléphone}` : 'Chargement...'} />
            <input type="text" class="form-control input" defaultValue={user ? `${user.email}` : 'Chargement...'} />
            <div>
                <button className='profile-update-btn' onClick={() => setUpdateProfil(true)}>
                    <FontAwesomeIcon icon={faUser}/> Modifier Profile
                </button>
                <button className='profile-update-btn' onClick={() => setDeleteprofile(true)} >
                    <FontAwesomeIcon icon={faTrash} /> Supprimer Profile
                </button>
            </div>
            </div>
        </div>
        {updateProfil &&  <Modifierprofile user={user} setUpdateProfil={setUpdateProfil}/>}
        {deleteprofile &&  <Supprimerprofil  setDeleteprofile={setDeleteprofile}/>}
       
    </section>
    </main>
  )
}

export default Profil
