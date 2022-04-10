import React from "react"
import { Link } from "gatsby"

import Logo from '../images/logo-with-text.svg'


const Footer = () => {

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__logo">
                    <Logo />
                </div>
                <div className="footer__link">
                    <a href="https://design-talk.co.uk/" target="blank">
                        Desgined & build by design-talk
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
