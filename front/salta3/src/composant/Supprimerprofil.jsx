import React from 'react'
import "./supprimerprofil.css"
import axios from 'axios'
import { useCookies } from 'react-cookie'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

function Supprimerprofil({setDeleteprofile}) {

    const [ ,setCookies] = useCookies (["access_token"])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = window.localStorage.getItem('UserId');
          try {
            const response = await axios.delete(`http://localhost:3001/Profile/${id}`);
            if(response.status === 200){
                setCookies("access_token" , "")
                window.localStorage.removeItem("UserId")
                document.location.href='inscrire';

            }
          } 
          catch(error){
            alert(error)
          }
     }

  return (
    <div className='delet-profil'>
    <form className='fo ' onSubmit={handleSubmit}>
    <abbr title="Fermer">
          <FontAwesomeIcon onClick={() => setDeleteprofile(false)} icon={faCircleXmark} className='close-icon'/>        
      </abbr>
      <p>Êtes-vous sûr de vouloir supprimer votre profil ?</p>
      <div className="oui">
        <button type='submit' className='delete-account-btn b'>OUI</button>&nbsp;&nbsp;
        <button  className='delete-account-btn b' onClick={() => setDeleteprofile(false)} >NON</button>
       </div>
       </form> 
    </div>
  )
}

export default Supprimerprofil
