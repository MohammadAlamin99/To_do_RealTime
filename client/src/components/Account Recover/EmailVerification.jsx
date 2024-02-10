import React, {Fragment, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { RecoverEmailVerifyRequest } from '../../apiRequiest/apiRequiest';
import { IsEmpty } from '../../Helper/FormHelper';
import { setEmail } from '../../Helper/SessionHelper';
import Loading from 'react-fullscreen-loading';
import toast, { Toaster } from 'react-hot-toast';

const SendOTP = () => {
    const [load, setLoaded] = useState(false);

    let emailRef=useRef();
    let navigate=useNavigate();

    const verifyEmail = async()=>{
        let email = emailRef.value;
        setLoaded(true);
        let result = await RecoverEmailVerifyRequest(email);
        setLoaded(false);
            if(result.status==="success"){
                if (IsEmpty(email)) {
                    toast.error("Valid Email Required !");
                }
                else{
                    setEmail(email)
                    toast.success("Email Send Success");
                    navigate("/verifyOtp")
                } 
            }
            else{
                toast.error("somothing went wrong")
            }

    }
   
    return (
      load?( <Loading loading={true} loaderColor="#419CA6" />):(
        <Fragment>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6 center-screen">
                    <div className="card w-90  p-4">
                        <div className="card-body">
                            <h4 className='Loginpage'>EMAIL ADDRESS</h4>
                            <br/>
                            <label className='profileInside'>Your email address</label>
                            <input ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                            <br/>
                            <button style={{fontFamily:"'Poppins', sans-serif;", fontWeight:"400", background:"#419CA6", color:"#fff"}} onClick={verifyEmail} className="btn w-100 animated fadeInUp float-end">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
      )
    );
};

export default SendOTP;