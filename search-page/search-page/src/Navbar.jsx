import "./Navbar.css"
import logo from "./assets/logos.png"
import profile from "./assets/profile-icon.png"
import searchIcon from "./assets/search-icon.png"

export default function Navbar() {
    return (
        <div className="nav-bar">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    {/* Logo */}
                    <a className="navbar-brand logos" href="#">
                        <img src={logo} alt="logo" />
                    </a>

                    {/* Toggle button */}
                    <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Sidebar */}
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">

                        {/* Sidebar header */}
                        <div className="offcanvas-header border-bottom">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                                <img src="images/Group 4.png" alt="logo" />
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>

                        {/* Navbar content */}
                        <div className="offcanvas-body">
                            <div className="container-fluid" id="search-div">
                                <form className="d-flex justify-content-center" role="search">
                                    <div className="position-relative" style={{ maxWidth: '45%', width: '100%' }}>
                                        <input type="search" id="search-field" className="form-control" placeholder="search items" aria-label="Search"  />
                                        <button className="btn search-btn btn-outline-success position-absolute top-0 end-0" type="submit" style={{ height: '100%', marginTop: '2px' }}>
                                            <img src={searchIcon} alt="search-button" className="search-button"/>
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Right icons */}
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item ms-3">
                                    <a className="nav-link" href="#" style={{ fontSize: '1.25rem' }}>order</a>
                                </li>
                                <li className="nav-item ms-3">
                                    <a className="nav-link" href="#" style={{ fontSize: '1.25rem' }}>wishlist</a>
                                </li>
                                <li className="nav-item ms-3">
                                    <a className="nav-link" href="#" style={{ fontSize: '2rem', marginTop: '0', paddingTop: '0' }}>
                                        <img src={profile} alt="profile" className="profile-pic"/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}