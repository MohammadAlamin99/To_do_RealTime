import axios from "axios";
// import store from "../Redux/Store/store";
//import { setNewTask, setCompleteTask, setProgressTask, setCanceledTask } from "../Redux/State-Slice/taskSlice";
import { getToken, setUserDetails } from "../Helper/SessionHelper";

let BaseURL = "http://localhost:5000";
const Headers ={headers:{"token":getToken()}};

// registraion
export  async function UserRegistrationRequiest(email,firstName,lastName,mobile,password,photo) {
    try {
        let reqBody={email:email,firstName:firstName,lastName:lastName,mobile:mobile,password:password, photo:photo}
        let result = await axios.post(BaseURL+'/api/v1/registration',reqBody);
        return result;
    }
    catch (e) {
        return false
    }
 }


//  login
export  async function UserLoginRequiest(email,password) {
    try {
        let reqBody={email:email,password:password}
        let result = await axios.post(BaseURL+'/api/v1/userLogin',reqBody);
        return result;
    }
    catch (e) {
        return false
    }
 }

//  create task
export  async function CreateTaskRequiest(title,description) {
    try {
        let reqBody={title:title, description:description, status:"New"}
        let result = await axios.post(BaseURL+'/api/v1/createTask',reqBody,Headers);
        return result;
    }
    catch (e) {
        return false
    }
 }

 //  List by status requiest
export  async function ListByStatusRequiest(status) {
    try {
        let result = await axios.get(BaseURL+'/api/v1/listByStatus/'+status,Headers);
        let data = result.data["data"];
        return data
    }
    catch (e) {
        return false
    }
 }

//  Task list count
 export  async function ListTaskCountRequiest() {
    try {
        let result = await axios.get(BaseURL+'/api/v1/listTaskCount',Headers);
        let data = result.data["data"];
        return data
    }
    catch (e) {
        return false
    }
 }

//  Delete Task
export  async function DeleteTaskRequest(id) {
    try {
        let result = await axios.delete(BaseURL+'/api/v1/deleteTask/'+id,Headers);
        return result;
    }
    catch (e) {
        return false
    }
 }

//  update status task
export  async function UpdateStatusRequiest(id, status) {
    try {
        let result = await axios.get(BaseURL+'/api/v1/updateStatus/'+id+"/"+status,Headers);
        return result 
    }
    catch (e) {
        return false
    }
 }

//  User profile update

export  async function UserProfileUpdateRequest(email,firstName,lastName,mobile,password,photo) {
    try {
        let reqBody={email:email,firstName:firstName,lastName:lastName,mobile:mobile,password:password, photo:photo}
        let UserDetails={email:email,firstName:firstName,lastName:lastName,mobile:mobile,photo:photo}
        let result = await axios.post(BaseURL+'/api/v1/upadateProfile', reqBody, Headers);
        setUserDetails(UserDetails);
        return result
    }
    catch (e) {
        return false
    }
 }
 
 //  User profile details

export  async function userDetailsRequest() {
    try {
        let result = await axios.get(BaseURL+'/api/v1/profileDetails', Headers);
        let data = result['data'];
        return data;
    }
    catch (e) {
        return false
    }
 }

  //  Recover emailVerify

export  async function RecoverEmailVerifyRequest(email) {
    try {
        let result = await axios.get(BaseURL+'/api/v1/emailVerify/'+email);
        let data = result['data'];
        return data;
    }
    catch (e) {
        return false
    }
 }

   //  Recover OTP Verify

export  async function RecoverOTPVerifyRequest(email,OTP) {
    try {
        let result = await axios.get(BaseURL+'/api/v1/otpVerify/'+email+'/'+OTP);
        let data = result['data'];
        return data;
    }
    catch (e) {
        return false
    }
 }

//  Recover Password 

export  async function RecoverPassRequest(email,otp,password) {
    try {
        let reqbody = {email:email, otp:otp, password:password}
        let result = await axios.post(BaseURL+'/api/v1/setNewPass', reqbody);
        let data = result['data'];
        return data;
    }
    catch (e) {
        return false
    }
 }