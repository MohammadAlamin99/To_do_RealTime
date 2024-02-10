import React, {Fragment, useRef, useState} from 'react';
import { getEmail, getOTP } from '../../Helper/SessionHelper';
import { RecoverPassRequest } from '../../apiRequiest/apiRequiest';
import { IsEmpty} from '../../Helper/FormHelper';
import { useNavigate } from 'react-router-dom';
import Loading from 'react-fullscreen-loading';
import toast, { Toaster } from 'react-hot-toast';


const ConfirmPass = () => {
    const [load, setLoaded] = useState(false);
    const NewPassRef = useRef();
    const ConfirmPassRef = useRef();
    const navigator = useNavigate();

    const onHandlaer = ()=>{
        const password = NewPassRef.current.value;
        const ConfirmPassword = ConfirmPassRef.current.value;
        if(IsEmpty(password)){
            toast.error("Password Required !")
        }
        else if(IsEmpty(ConfirmPassRef)){
           toast.error("Confirm Password Required !") 
        }
        else if(password!==ConfirmPassword){
            toast.error("Password & Confirm Password Should be Same")
        }
        else{
            setLoaded(true)
            let res = RecoverPassRequest(getEmail(),getOTP(),password);
            setLoaded(false)
                toast.success("Password Change Sucessful");
                navigator("/login");
        }
    }

    return (
       load?( <Loading loading={true} loaderColor="#419CA6" />):(
        <Fragment>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6 center-screen">
                    <div className="card w-90 p-4">
                        <div className="card-body">
                            <h4 className='Loginpage'>SET NEW PASSWORD</h4>
                            <br/>
                            <label className='profileInside'>Your email address</label>
                            <input readOnly={true} value={getEmail()} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                            <br/>
                            <label className='profileInside'>New Password</label>
                            <input ref={NewPassRef} placeholder="New Password" className="form-control animated fadeInUp" type="password"/>
                            <br/>
                            <label className='profileInside'>Confirm Password</label>
                            <input ref={ConfirmPassRef} placeholder="Confirm Password" className="form-control animated fadeInUp" type="password"/>
                            <br/>
                            <button style={{fontFamily:"'Poppins', sans-serif;", fontWeight:"400", background:"#419CA6", color:"#fff"}} onClick={onHandlaer} className="btn w-100 animated fadeInUp float-end ">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
       )
    );
};
export default ConfirmPass;