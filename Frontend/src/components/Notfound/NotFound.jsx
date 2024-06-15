import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <section className="notFound">
        <div className="content">
          <img src="" alt="" />
          <Link to='/'>Return To Home</Link>
        </div>
      </section>
    </>
  )
}

export default NotFound
