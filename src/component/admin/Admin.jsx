import React from 'react'
import { Link } from 'react-router-dom'

function Admin() {
  return (
     <section className='container mt-5'>
         <h2>Welcome to admin page</h2>
         <hr />
         <Link to={"/add-room"} className="bg-midnight text-tahiti">
           Manage Room
         </Link>

     </section>
  )
}

export default Admin
