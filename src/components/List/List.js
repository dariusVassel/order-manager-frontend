import React from 'react'
import Dashboard_Sidebar from '../Dashboard_Sidebar/Dashboard_Sidebar'
import Datatable from '../Datatable/Datatable'
import "./List.scss"


function List() {
  return (
    <>
        {/* <br/>
        <br/>
        <br/> */}
        <div className="list">
            
            <Dashboard_Sidebar/>
        
        <div className="listContainer">
        
            
            <Datatable/>
            
        </div>
        </div>
    </>
  )
}

export default List