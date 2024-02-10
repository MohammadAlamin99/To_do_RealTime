import { useRef } from "react";
import { CreateTaskRequiest } from "../../apiRequiest/apiRequiest";
import { useNavigate } from "react-router-dom";
import { IsEmpty } from "../../Helper/FormHelper";
import toast from "react-hot-toast";

const Create = () => {
  const createRef = useRef();
  const taskRef = useRef();
  const navigate = useNavigate();

  const createNew = async(e)=>{
    e.preventDefault();
    const create = createRef.current.value;
    const task = taskRef.current.value;
    
      if (IsEmpty(create)) {
        toast.error("Task Name Required !");
      }
      else if(IsEmpty(task)){
        toast.error("Task Description Required !");
      }
      else{
       let res = await CreateTaskRequiest(create, task);

        if (res.status===200) {
          toast.success("New Task Created")
          navigate("/new");
        }
        else{
          toast.error("Something Went Wrong!")
        }
      }
  }

  return (
    <div className="container-fluid pt-3">
      <div
        className="bg-body p-5 rounded mx-auto mt-5"
        style={{ maxWidth: "50rem" }}
      >
        <h3 className="CreateJSX">Create Task</h3>
        <form className="row g-3">
          <div className="col-12">
            <input
              type="text"
              className="form-control focus-ring custom"
              placeholder="Task Name"
              ref={createRef}
            />
          </div>
          <div className="col-12">
            <textarea
              className="form-control focus-ring custom"
              cols="30"
              rows="5"
              placeholder="Task Description"
              ref={taskRef}
            ></textarea>
          </div>

          <div className="col-12 createBtn">
            <button
              type="submit"
              className="btn text-white"
              style={{ background: "#419CA6" }}
              onClick={createNew}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
