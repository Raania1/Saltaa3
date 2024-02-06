import React, {useState}from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import './inscription.css'

function Inscription() {

    const [formData, setFormData] = useState({
        Nom: '',
        Prenom: '',
        NomAnn: '',
        Domaine: '',
        Num: '',
        email: '',
        confirmemail:'',
        password: '',
        confirmPassword: '' 
      })
    

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
        if(!formData.Nom.trim()) {
            validationErrors.Nom = "votre Nom est obligatoire"
        }

        if(!formData.Prenom.trim()) {
            validationErrors.Prenom = "votre prénom est obligatoire"
        }

        if(!formData.NomAnn.trim()) {
            validationErrors.NomAnn = "Nom de votre compte est obligatoire"
        }

        if(!formData.Domaine.trim()) {
            validationErrors.Domaine = "votre Domaine est obligatoire"
        }

        if(!formData.Num.trim()) {
            validationErrors.Num = "votre Numéro est obligatoire"
        }else if(formData.Num.length !== 8){
            validationErrors.Num = "Le Numéro doit etre composé de 8 chiffre"
        }
    
        if(!formData.email.trim()) {
            validationErrors.email = "votre email est obligatoire"
        } else if(!/\S+@\S+\.\S+/.test(formData.email)){
            validationErrors.email = "email n'est pas valide"
        }

        if (formData.confirmemail !== formData.email) {
          validationErrors.confirmemail = "Email non correspondant"; 
      }
    
        if(!formData.password.trim()) {
            validationErrors.password = "Mot de passe et obligatoire"
        } else if(formData.password.length < 6){
            validationErrors.password = "Le mot de passe doit être d’au moins 6 caractères"
        }
    
        if (formData.confirmPassword !== formData.password) {
          validationErrors.confirmPassword = "mot de passe non correspondant"; 
      }
    
        
      setErrors(validationErrors)
        if(Object.keys(validationErrors).length === 0) {
          try{
            let result = await axios.post("http://localhost:3001/inscription",{
              nom: formData.Nom,
              prenom: formData.Prenom,
              nomannoncceur: formData.NomAnn,
              domaine: formData.Domaine,
              téléphone: formData.Num,
              email: formData.email,
              password: formData.password,
            })
            if(result.status === 201){
              document.location.href='/';
                }
          }
            catch (error){
              validationErrors.email = "email n'est pas valide"
            }
        setErrors(validationErrors)
      };}

  return (<>
  
  <main>
  <div className='container'>
  <h3>Bienvennue à Salta3!</h3>
    <form onSubmit={handleSubmit} className='f'>
    <div class="col">
        <input type="text" class="form-control" placeholder="Nom de compte d'annonceur" name='NomAnn' onChange={handleChange} />
        {errors.NomAnn && <span className='span'>*{errors.NomAnn}</span>}
      </div>

<br/>
    <div class="row">
      <div class="col">
        <input type="text" class="form-control in" placeholder="Nom" name='Nom' onChange={handleChange} />
        {errors.Nom && <span className='span'>*{errors.Nom}</span>}
      </div>
      <div class="col">
        <input type="text" class="form-control in" placeholder="Prénom" name='Prenom' onChange={handleChange} />
        {errors.Prenom && <span className='span'>*{errors.Prenom}</span>}
      </div>
    </div>
    <br/> 

<div class="row">
      <div class="col">
        <input type="text" class="form-control" placeholder="Domaine d'activité" name='Domaine' onChange={handleChange} />
        {errors.Domaine && <span className='span'>*{errors.Domaine}</span>}
      </div>

      <div class="col">
        <input type="text" class="form-control" placeholder="Numéro du Téléphone" name='Num' onChange={handleChange} />
        {errors.Num && <span>{errors.Num}</span>}
      </div>
</div>
<br/>  
<div class="row">
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">@</span>
        <input type="text" class="form-control" placeholder="Adress mail" aria-label="Username" aria-describedby="addon-wrapping" name='email' onChange={handleChange} />
      </div>
      {errors.email && <span className='span'>*{errors.email}</span>}
      </div>
<br/>
      <div class="row">
      <div class="input-group flex-nowrap">
        <span class="input-group-text " id="addon-wrapping">@</span>
        <input type="text" class="form-control" placeholder="Confirmer votre Adress" aria-label="Username" aria-describedby="addon-wrapping" name='confirmemail' onChange={handleChange} />
      </div>
      {errors.confirmemail && <span className='span'>*{errors.confirmemail}</span>}
</div>
<br/>  

      <div class="col">
        <input type="password" class="form-control" placeholder="Mot de passe" name="password" onChange={handleChange}/>
        {errors.password && <span className='span'>*{errors.password}</span>} 

      </div>
<br/>
<div class="col">
    <input type="password" class="form-control" placeholder="Confirmer vote Mot de passe" name='confirmPassword' onChange={handleChange} />
    {errors.confirmPassword && <span className='span'>*{errors.confirmPassword}</span>}
</div>

 <br/>   
        <div class="col-12">
            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required />
            <label class="form-check-label" for="invalidCheck2">
                J'accepte les Terms et Conditions
            </label>
            </div>
            </div>
<br/>
      
        <div class="d-grid gap-2 col-6 mx-auto">
            <button class="btn btn-secondary bttn"  type="submit">inscrire</button>
            <p className='ins'>&nbsp; Vous avez déja un compte ?&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;<Link to="/">Se Connecter</Link></p> 
        </div>
</form>

</div>
<div className="imj1">
  <img className="imj1" src="https://vamostirardopapel.com.br/wp-content/uploads/2021/07/Plano-de-Negocios-para-MEI.jpg" alt=""/>
</div>
</main>
  </>  
  )
}
export default Inscription
