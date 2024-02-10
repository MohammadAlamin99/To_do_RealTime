import React, {Fragment, useState} from 'react';
import ReactCodeInput from "react-code-input";
import Loading from 'react-fullscreen-loading';
import {useNavigate} from "react-router-dom";
import { RecoverOTPVerifyRequest } from '../../apiRequiest/apiRequiest';
import { getEmail, setOTP } from '../../Helper/SessionHelper';
import toast, { Toaster } from 'react-hot-toast';

const VerifyOTP = () => {
    const [load, setLoaded] = useState(false);
    let navigate=useNavigate();

    let  defaultInputStyle= {
            fontFamily: "monospace",
            MozAppearance: "textfield",
            margin: "4px",
            paddingLeft: "8px",
            width: "45px",
            borderRadius: '3px',
            height: "45px",
            fontSize: "32px",
            border: '1px solid lightskyblue',
            boxSizing: "border-box",
            color: "black",
            backgroundColor: "white",
            borderColor: "lightgrey"
        }


    let [OTP,SetOTP]=useState("")

        
        
        
    const SubmitOTP = async() => {
      if(OTP.length===6){
        setLoaded(true)
          let result = await RecoverOTPVerifyRequest(getEmail(),OTP);
          setLoaded(false)
              if(result.status==="success"){
                setOTP(OTP);
                toast.success("Verification Succcess")
                  navigate("/restPass")
              }
              else{
                toast.error("Invalid otp code")
              }
         
      }
      else {
        toast.error("Enter 6 Digit Code")
      }
    }    


    return (
        load ?(<Loading loading={true} loaderColor="#419CA6" />):(
            <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90  p-4">
                            <div className="card-body">
                                <h4 className='Loginpage'>OTP VERIFICATION </h4>
                                <p className='profileInside'>A 6 Digit verification code has been sent to your email address. </p>
                                <ReactCodeInput onChange={(value)=>SetOTP(value)} inputStyle={defaultInputStyle}  fields={6}/>
                                <br/>  <br/>
                                <button style={{fontFamily:"'Poppins', sans-serif;", fontWeight:"400", background:"#419CA6", color:"#fff"}} onClick={SubmitOTP} className="btn w-100 animated fadeInUp float-end">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
        )
    );
};
export default VerifyOTP;