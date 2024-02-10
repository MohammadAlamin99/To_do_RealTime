import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfileUpdateRequest, userDetailsRequest } from '../../apiRequiest/apiRequiest';
import Loading from 'react-fullscreen-loading';
import toast, { Toaster } from 'react-hot-toast';


const Profile = () => {
  const photoRef = useRef();
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const mobileRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [load, setLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoaded(true)
        const res = await userDetailsRequest();
        setLoaded(false)
        setData(res.data[0]);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, []);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject('Error: ', error);
    });

  const handleUpdate = async () => {
    const email = emailRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const mobile = mobileRef.current.value;
    const password = passwordRef.current.value;
    const photo = photoRef.current.files[0];

    try {
      let encoded = null;

      if (photo) {
        // Only attempt to get base64 if a photo is selected
        encoded = await getBase64(photo);
      }
     else {
      // Use the previous photo value if no new photo is selected
      encoded = data['photo'];
    }
      
    setLoaded(true)
      const res = await UserProfileUpdateRequest(email, firstName, lastName, mobile, password, encoded);
      setLoaded(false)
      if (res.status === 200) {
        if (res.data.status === 'success') {
          toast.success('Profile Update Success');
          navigate('/');
          window.location.reload();
        } else {
          toast.error('Something Went Wrong');
        }
      }
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  const handleChangeImg = (e) => {
    const file = e.target.files[0];

    if (file) {
      getBase64(file)
        .then((result) => {
          // Do something with the result if needed
          
        })
        .catch((e) => console.log(e));
    }
  };

  return (
   load ? ( <Loading loading={true} loaderColor="#419CA6" />):(
    <div className="container">
    <div className="row d-flex justify-content-center">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <div className="container-fluid">
              <div className="row profileInside">   
              <img style={{ width:"148px"}} ref={photoRef} className="icon-nav-img-lg" src={data['photo']} alt=""/>              
                <hr />
                <div className="col-4 p-2">
                <label>Profile Picture</label>
                 <input  key={Date.now()} onChange={handleChangeImg} ref={photoRef} placeholder="User Email" className="form-control animated fadeInUp" type="file"/>
                </div>
                <div className="col-4 p-2">
                  <label>Email Address</label>
                  <input  key={Date.now()} ref={emailRef} readOnly defaultValue={data.email} placeholder="User Email" className="form-control animated fadeInUp" type="email" />
                </div>
                <div className="col-4 p-2">
                  <label>First Name</label>
                  <input  key={Date.now()} ref={firstNameRef} defaultValue={data.firstName} placeholder="First Name" className="form-control animated fadeInUp" type="text" />
                </div>
                <div className="col-4 p-2">
                  <label>Last Name</label>
                  <input  key={Date.now()} ref={lastNameRef} defaultValue={data.lastName} placeholder="Last Name" className="form-control animated fadeInUp" type="text" />
                </div>
                <div className="col-4 p-2">
                  <label>Mobile</label>
                  <input  key={Date.now()} ref={mobileRef} defaultValue={data.mobile} placeholder="Mobile" className="form-control animated fadeInUp" type="mobile" />
                </div>
                <div className="col-4 p-2">
                  <label>Password</label>
                  <input  key={Date.now()} ref={passwordRef} defaultValue={data.password} placeholder="User Password" className="form-control animated fadeInUp" type="password" />
                </div>
                <div className="col-4 p-2 ProfileUpdateBtn">
                  <button onClick={handleUpdate} className="w-100 float-end animated fadeInUp rounded">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
   )
  );
};

export default Profile;
