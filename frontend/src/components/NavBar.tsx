import React from 'react'

function NavBar() {
  return (
    // <!-- Navbar -->
<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  {/* <!-- Container wrapper --> */}
  <div className="container">
    {/* <!-- Navbar brand --> */}
    <a className="navbar-brand" href="#"><i className="fab fa-linkedin fa-2x"></i></a>
    {/* <!-- Search form --> */}
    <form className="input-group" style={{width: "400px"}}>
      <input type="search" className="form-control" placeholder="Type query" aria-label="Search" />
      <button className="btn btn-outline-primary" type="button" data-mdb-ripple-color="dark" style={{padding: ".45rem 1.5rem .35rem;"}}>
        Search
      </button>
    </form>

    {/* <!-- Toggle button --> */}
    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
      aria-label="Toggle navigation">
      <i className="fas fa-bars"></i>
    </button>

    {/* <!-- Collapsible wrapper --> */}
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {/* <!-- Left links --> */}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active d-flex flex-column text-center" aria-current="page" href="#"><i className="fas fa-home fa-lg"></i><span className="small">Home</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link d-flex flex-column text-center" aria-current="page" href="#"><i className="fas fa-user-friends fa-lg"></i><span className="small">My Network</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link d-flex flex-column text-center" aria-current="page" href="#"><i className="fas fa-briefcase fa-lg"></i><span className="small">Jobs</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link d-flex flex-column text-center" aria-current="page" href="#"><i className="fas fa-comment-dots fa-lg"></i><span className="small">Messaging</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link d-flex flex-column text-center" aria-current="page" href="#"><i className="fas fa-bell fa-lg"></i><span className="small">Notifications</span></a>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle d-flex align-items-center"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg"
              className="rounded-circle"
              height="30"
              alt=""
              loading="lazy"
            />
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a className="dropdown-item" href="#">My profile</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Logout</a></li>
          </ul>
        </li>
      </ul>
    </div>
    {/* <!-- Collapsible wrapper --> */}
  </div>
  {/* <!-- Container wrapper --> */}
</nav>
  )
}

export default NavBar
