import React from "react"

const PageBanner = ({ children }) => {

    return (
        <div className="page-banner">
            <div className="layout__container">
                <div className="page-banner__title">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PageBanner;
