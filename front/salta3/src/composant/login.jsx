import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie'; 
import 'bootstrap/dist/css/bootstrap.css'
import './inscription.css'
import img from './logo_salta3_svg.svg'
import Compteur from './compteur';

function Login() {

    const [formData, setFormData] = useState({
       
        email1: '',
        password1: '',
        
      })
    const [cookies , setCookies] = useCookies (["access_token"])
    
      const [errors, setErrors] = useState({})
    
      const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value
        })
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = {}

        if(!formData.email1.trim()) {
            validationErrors.email1 = "votre email est obligatoire"
        } else if(!/\S+@\S+\.\S+/.test(formData.email1)){
            validationErrors.email1 = "email n'est pas valide"
        }
    
        if(!formData.password1.trim()) {
            validationErrors.password1 = "Mot de passe et obligatoire"
        } else if(formData.password1.length < 6){
            validationErrors.password1 = "Le mot de passe doit être d’au moins 6 caractères"
        }
        
        if(Object.keys(validationErrors).length === 0) {
            try{
            let res = await axios.post("http://localhost:3001/login",{
                email : formData.email1,
                password : formData.password1
            })
            setCookies("access_token",res.data.token)
            window.localStorage.setItem("UserId" , res.data.UserId)
            console.log(res);
            }
            catch(error){
                validationErrors.password1 = "L'email ou le password non valide"
              }
        }
        setErrors(validationErrors)
        }
      
      const removecookie = () =>{
        setCookies("access_token" , "")
        window.localStorage.removeItem("UserId")
      }

  return (
<>
{
    cookies.access_token
    ?<><Compteur removecookie={removecookie}/>
    </>
:<main><div className='c1'>
    <img src={img} alt="logo salta3" />
    <h3>Bienvennue de Nouveau!</h3>
    <h9 className="txt">Veuillez vous Connecter pour profiter de toutes <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;les fonctionnalités de Salta3...</h9>
    <form onSubmit={handleSubmit} className='f1'>
    <div class="row">
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">@</span>
        <input type="text" class="form-control" placeholder="Adress mail" aria-label="Username" aria-describedby="addon-wrapping" name='email1' onChange={handleChange} />
      </div>
      {errors.email1 && <span className='span'>*{errors.email1}</span>}
      </div>
      <br/>   
        <div class="col">
            <input type="password" class="form-control" placeholder="Mot de passe" name="password1" onChange={handleChange}/>
            {errors.password1 && <span>{errors.password1}</span>}
        </div>
        <br/>
        <p className='mtp'>Mot de passe oublier?</p>
      <br/>
        <div class="d-grid gap-2 col-6 mx-auto">
            <button class="btn btn-secondary bttn" type="submit">Se Connecter</button>
            <p className='ins'>Vous n'avez pas de compte ? &nbsp;<Link to="inscrire">S'inscrire</Link></p>     
        </div>
        
</form>
</div>
<div className="imj1">
  <img className="imj1" src="https://vamostirardopapel.com.br/wp-content/uploads/2021/07/Plano-de-Negocios-para-MEI.jpg" alt=""/>
</div>
</main>
}

</>
  )
}

export default Login
