import React,{ useEffect,useState} from 'react'
import './modifierprofile.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

function Modifierprofile( {user,setUpdateProfil} ) {


const [formData, setFormData] = useState({
  Nom: user ? user.nom : '',
  Prenom: user ? user.prenom : '',
  NomAnn: user ? user.nomannoncceur : '',
  Domaine: user ? user.domaine : '',
  Num: user ? user.téléphone : '',
  password: '',
  confirmPassword: '' 
});

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      Nom: user ? user.nom : '',
      Prenom: user ? user.prenom : '',
      NomAnn: user ? user.nomannoncceur : '',
      Domaine: user ? user.domaine : '',
      Num: user ? user.téléphone : '',
    }));
  }, [user]);


  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData, [name] : value
    })
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = window.localStorage.getItem('UserId');
      try {
        let result = await axios.put(
          `http://localhost:3001/Profile/${id}`,
          {
            nom: formData.Nom,
            prenom: formData.Prenom,
            nomannoncceur: formData.NomAnn,
            domaine: formData.Domaine,
            téléphone: formData.Num,
            password: formData.password,
          },
          { new: true }
        );

        if (result.status === 200) {
          alert('Profil modifié avec succès');
          setUpdateProfil(false);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    
  };
  return (
  <>
    <div className='updat-profil'>
      <form className='form ' onSubmit={handleSubmit}>
      <abbr title="Fermer">
            <FontAwesomeIcon onClick={() => setUpdateProfil(false)} icon={faCircleXmark} className='close-icon'/>        
        </abbr>
        <h4>Modifier votre profile</h4>
        <div className='row1'>
         <div className="col2">
             <label>Nom de compte d'annonceur</label>
             <label>Nom</label>
             <label>Prénom</label>
             <label>Domaine</label>
             <label>Numéro de téléphone</label>
         </div>
         <div className="col1">
         <input type="text" class="form-control input"  defaultValue={user ? user.nomannoncceur : 'Chargement...'}  name='NomAnn' onChange={handleChange}/>
         <input type="text" class="form-control input"  defaultValue={user ? user.nom : 'Chargement...'} name='Nom' onChange={handleChange}/>
         <input type="text" class="form-control input"   defaultValue={user ? user.prenom : 'Chargement...'} name='Prenom' onChange={handleChange}/>
         <input type="text" class="form-control input"  defaultValue={user ? user.domaine : 'Chargement...'} name='Domaine' onChange={handleChange}/>
         <input type="text" class="form-control input"   defaultValue={user ? user.téléphone : 'Chargement...'} name='Num' onChange={handleChange}/>
         </div>
         </div><br/>
         <button type='submit' className='delete-account-btn'>
         <FontAwesomeIcon icon={faPenToSquare} />Modifier</button>
         </form> 
    </div>

</>
    
  )
}

export default Modifierprofile


