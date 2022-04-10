import React from "react"
import { Link } from "gatsby"

import Logo from '../images/logo-with-text.svg'


const Header = ({ isHomePage, title }) => {

    return (
        <header className="header">
            <div className="header__logo">
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <nav className="header__nav">
                <ul>
                    <li>
                        <Link to="/">
                            <span>About</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/cat-cafes/">
                            <span>Cat Cafes</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact-us">
                            <span>Contact</span>
                        </Link>
                    </li>

                </ul>
            </nav>
        </header>
    )
}

export default Header;
