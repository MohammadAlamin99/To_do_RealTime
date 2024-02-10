import { useEffect, useState } from "react";
import { DeleteTaskRequest, ListByStatusRequiest, UpdateStatusRequiest } from "../../apiRequiest/apiRequiest";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineCalendar } from "react-icons/ai";
import Swal from 'sweetalert2'
import Loading from 'react-fullscreen-loading';
import toast, { Toaster } from 'react-hot-toast';

const New = () => {
  const [load, setLoaded] = useState(false);
  const [data, setData] = useState([])
  
  useEffect(()=>{
    (async()=>{
      setLoaded(true)
      let result =await ListByStatusRequiest("New");
      setLoaded(false)
      setData(result);
    })()
    
  },[])

  // delete status api call
  
  const deleteTask = async (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this task!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let result = await DeleteTaskRequest(_id);
          if (result.status === 200) {
            window.location.reload();
            toast.success("Your file has been deleted.");
          } else {
            toast.error("Something Went Wrong");
          }
        } catch (error) {
          console.error(error);
          toast.error("something wrong");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your task is safe :)',
          'info'
        );
      }
    });
  };




  // update status api call
  const updateStatus = async (_id, status) => {
    const { value: newStatus } = await Swal.fire({
      title: 'Update Status',
      input: 'select',
      inputOptions:{New: 'New', Completed: 'Completed', Progress: 'Progress', Canceled: 'Canceled'},
      inputValue: status, // Set default value to the current status
      showCancelButton: true,
      confirmButtonText: 'Update',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to select a status';
        }
      },
    });

    if (newStatus) {
      try {
        setLoaded(true)
        let result = await UpdateStatusRequiest(_id, newStatus);
        setLoaded(false)
        if (result.status === 200) {
          toast.success('Success');
          window.location.reload()
          setData((prevData) => {
            const updatedData = prevData.map((item) =>
              item._id === _id ? { ...item, status: newStatus } : item
            );
            return updatedData;
          });
        } else {
          toast.error('Something went wrong');
        }
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      }
    }
  };

  // ... (existing code)




  return (
   load ?( <Loading loading={true} loaderColor="#419CA6" />):(
    <div className="container-fluid pt-3">
    <div className="row p-0 m-0">
                 <div className="col-12 newJSX">
                     <h5>Task In New</h5>
                 </div>
              
             </div>
   <div className="row row-cols-1 row-cols-md-2 row-cols-xxl-3 g-3">
     {data.length>0 ? (
         data.map((item, i)=>{
           return(
             <div key={i} className="card h-100">
             <div className="card-body">
                 <h6 className="animated fadeInUp">{item.title}</h6>
                 <p className="animated fadeInUp">{item.description}</p>
                 <p className="m-0 animated fadeInUp p-0">
                     <AiOutlineCalendar/> {item.createdDate}
                     <a onClick={()=> updateStatus(item._id,item.status)} className="icon-nav text-primary mx-1"><AiOutlineEdit /></a>
                     <a onClick={() => deleteTask(item._id)} className="icon-nav text-danger mx-1">
                         <AiOutlineDelete /> </a>
                                                     

                     <a className="badge float-end bg-info text-decoration-none">{item.status}</a>
                 </p>
             </div>
         </div>
           )
         })
     ) : (
       <p>No data available</p>
     )}
   </div>
 </div>
   )
  );
};

export default New;
