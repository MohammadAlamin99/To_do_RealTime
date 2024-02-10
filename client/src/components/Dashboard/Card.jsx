import { MdDateRange } from "react-icons/md";


const Card = ({ title, count, description, date, status }) => {
  return (
    <div className="card shadow p-2">
      <div className="card-body">
        <h5 className="card-title text-capitalize" style={{color:"#402C3C", fontFamily:"Poppins", fontWeight:"400", fontSize:"16px"}}>{title}</h5>
        {description && (
          <p className="card-text text-muted fw-medium">{description}</p>
        )}
        {count && <p className="card-text text-muted fw-medium" style={{color:"#402C3C", fontFamily:"Poppins", fontWeight:"400", fontSize:"16px"}}>{count}</p>}
        {date && (
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center justify-content-between">
              <span>
                <span className="pe-2">
                  <MdDateRange />
                </span>
                {date}
              </span>
              <span className="px-2" role="button" style={{ color: "#b315f2" }}>
               {/* <a className=""> <AiOutlineDelete /></a> */}
              </span>
            </div>
            <div>
              <span className="badge" style={{ background: "#D980FA" }}>
                {status}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
