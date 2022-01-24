import React,{useState} from 'react'
import Navigation from '../navigation/navigation'
import {schema} from '../navigation/navigation'


function ContactFrom(){

    const [firstname,setFirstName] = useState('')
    const [lastname,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [message,setMessage] =useState('')
    const [adeatils,setDetails] = useState('')
    let formErrors = {};   
    const [studNameErr,setStudentNameErr] = useState()
    const [lastNameErr,setLastNameErr] = useState()
    const [emailErr,setEmailErr] = useState()
    // const { studNameErr, emailIdErr, dobErr, genderErr, phoneNumberErr, cityErr } = useState()   

   const handleFormValidation = () => {    
        let formIsValid = true;    
    
        //Student name     
        if (!firstname) {    
            formIsValid = false;    
            formErrors = "";   
            setStudentNameErr('First Name is required.')  
        }   

        if (!lastname) {    
            formIsValid = false;    
            formErrors= "";   
            setLastNameErr('Last Name is required.') 
        }  
    
        //Email    
        if (!email) {    
            formIsValid = false;    
            formErrors = "";  
            setEmailErr('Email id is required.')  
        }    
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {    
    
            formIsValid = false;    
            formErrors = "";   
            setEmailErr('Invalid email id.') 
        }    
        // formErrors({ formErrors: formErrors });    
        return formIsValid;    
    }   





  const handleSubmit =async (e) =>{
      try{
        e.preventDefault()
        if(handleFormValidation()){
           
              const response =  await fetch(`http://localhost:3001/addContact`, {
                method: "POST",
                body: JSON.stringify({
                    firstname:firstname,
                    lastname:lastname,
                    email:email,
                    message:message,
                    adeatils:adeatils
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
           
          
            const data = await response.json();
              console.log(data)
              if(response.status == 200){
                  alert('Contact Added Successfully')
                  setFirstName('')
                  setLastName('')
                  setDetails('')
                  setEmail('')
                  setMessage('')
              }else{
                  alert('Not Able To Add The Contact')
              }
            }
      }
      catch(err){
          console.log(err)
      }
  }


  
  
    return(
        <div>
            <Navigation/>
        <div className="container">
            <section className="mb-4">


                <h2 className="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
            
                <p className="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
                    a matter of hours to help you.</p>

                <div className="row">

                
                    <div className="col-md-9 mb-md-0 mb-5">
                        <form onSubmit={handleSubmit}>

                        
                            <div className="row">

                            
                                <div className="col-md-6">
                                    <div className="md-form mb-0">
                                        <input type="text" id="name" name="firstname" className={studNameErr ? ' showError' : ''} className="form-control"
                                        onChange={e=>{
                                            
                                            setFirstName(e.target.value)}} value={firstname} />
                                        <label htmlFor="name" className="">First Name</label>
                                        {studNameErr &&    
                                         <div style={{ color: "red", paddingBottom: 10 }}>{studNameErr}</div>    
                                        }  
                                    </div>
                                </div>
                            
                                <div className="col-md-6">
                                    <div className="md-form mb-0">
                                        <input type="text" id="lastname" name="lastname" className={lastNameErr ? ' showError' : ''} className="form-control" 
                                        onChange={e=>setLastName(e.target.value)} value={lastname} />
                                        <label htmlFor="lastname" className="">Last Name</label>
                                        {lastNameErr &&    
                                         <div style={{ color: "red", paddingBottom: 10 }}>{lastNameErr}</div>    
                                        }  
                                    </div>
                                </div>
                                

                            </div>


                            <div className="row">

                            
                                <div className="col-md-6">
                                    <div className="md-form mb-0">
                                        <input type="email" id="name" name="email"  className={emailErr ? ' showError' : ''} 
                                        className="form-control"
                                        onChange={e=>setEmail(e.target.value)} value={email}  />
                                        <label htmlFor="name" className="">Email</label>
                                        {lastNameErr &&    
                                         <div style={{ color: "red", paddingBottom: 10 }}>{emailErr}</div>    
                                        } 
                                    </div>
                                </div>
                            
                                <div className="col-md-6">
                                    <div className="md-form mb-0">
                                        <input type="text" id="message" name="email" className="form-control"
                                        onChange={e=>setMessage(e.target.value)} value={message} />
                                        <label htmlFor="message" className="">Message</label>
                                    </div>
                                </div>
                                

                            </div>
                        
                        
                        
                            <div className="row"> 
                                <div className="col-md-12">

                                    <div className="md-form">
                                        <textarea type="text" id="message" name="message" rows="2" className="form-control md-textarea"
                                        onChange={e=>setDetails(e.target.value)} value={adeatils} ></textarea>
                                        <label htmlFor="message">Additional Details</label>
                                    </div>

                                </div>
                            </div>
                        
                            <div className="text-center text-md-left">
                                <button className='btn btn-primary' type="submit">Send</button>
                            </div>
                        </form>

                        
                        <div className="status"></div>
                    </div>
                
                    <div className="col-md-3 text-center">
                        <ul className="list-unstyled mb-0">
                            <li><i className="fas fa-map-marker-alt fa-2x"></i>
                                <p>Bangalore India</p>
                            </li>

                            <li><i className="fas fa-phone mt-4 fa-2x"></i>
                                <p>+ 91 9844726619</p>
                            </li>

                            <li><i className="fas fa-envelope mt-4 fa-2x"></i>
                                <p>kevinjoseph697@gmail.com</p>
                            </li>
                        </ul>
                    </div>
                

                </div>

            </section>
        </div>
        </div>
    )
}


export default ContactFrom