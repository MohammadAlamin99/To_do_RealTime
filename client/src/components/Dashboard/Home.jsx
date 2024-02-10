import { useEffect, useState } from "react";
import Card from "./Card";
import { ListTaskCountRequiest } from "../../apiRequiest/apiRequiest";
import Loading from 'react-fullscreen-loading';

const Home = () => {

  const [data, setData] = useState([]);
  const [load, setLoaded] = useState(false);
  useEffect(()=>{
    (async()=>{
        setLoaded(true);
        let result = await ListTaskCountRequiest();
        setLoaded(false)
        setData(result);
    })()
  },[])

  return (
    
    <div className="container-fluid pt-3">
      {
        load ?(
          <Loading loading={true} loaderColor="#419CA6" />
        ):(
          <div className="row row-cols-1 row-cols-md-3 row-cols-xxl-4 g-3" >
          {
            data.length>0?(
              data.map((item, i)=>{
                return(
                  <div key={i} className="col">
                    <Card title={item["_id"]} count={item["total"]} />
                  </div>
                )
              })
            ):(<p>No data available</p>)
          }
      </div>
        )
      }
    </div>
  );
};

export default Home;
