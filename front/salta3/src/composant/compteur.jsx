import React,{useState,useEffect} from 'react'
import './comtpeur.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import img from './13677885_5143061-removebg-preview.png'
import img1 from './91376floating pfonr.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'


function Compteur( {removecookie}) {

    const [compteur, setCompteur] = useState(null);
  
    useEffect(() => {
      const fetchcompteProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/Profile/nbr`);
          setCompteur(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchcompteProfile();
    }, []);



  return (
    <div className='updat-profil'>
        <div className='form1 ' >
            <br/>
            <p>Un accueil chaleureux aux pionniers de Salta3 ! <br/><br/>Nous sommes enchantés de vous avoir parmi  les premiers annonceurs de Salta3.<br/> Attendez-vous à transformer vos campagnes publicitaires grâce à nos services exclusifs,<br/> prêts à redéfinir les normes de l'industrie</p>
        <br/><br/><div className="compteur">
            <div className='d1'>
                <img src={img} alt=""/>
                <h5>{compteur}</h5>
                <h1>Nombres des annonceures <br/>prés-inscrit sur Salta3 Beta</h1>
            </div>
            <div className='d2'>
                <img src={img1} alt=""/>
                <h5>369</h5>
                <h1>Nombres des utilisateurs <br/>prés-inscrit sur Salta3 Beta</h1>
            </div>
        </div><br/>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="profile">
            <button className='profile-update-btn button'>
                <FontAwesomeIcon icon={faUser}/> Profile
            </button>
        </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className='profile-update-btn button' onClick={removecookie}>
            <FontAwesomeIcon icon={faArrowRightFromBracket}/> Se déconnecter
        </button>
         </div>   
        </div>
    </div>
  )
}

export default Compteur
