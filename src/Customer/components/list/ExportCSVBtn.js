import React from "react";
const MyExportCSV = (props) => {
    const handleClick = () => {
      props.onExport();
    };
    return (
      <div>
        <button className="btn btn-success" onClick={ handleClick }>Export Filter Data to CSV</button>
      </div>
    );
  };
  export default MyExportCSV;