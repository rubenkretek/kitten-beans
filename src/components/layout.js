import React from "react"
import { useStaticQuery, graphql } from "gatsby"

// Compnents
import Header from './Header'
import Footer from "./Footer"

const Layout = ({ isHomePage, children }) => {
  const {
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)

  return (
    <div className="global-wrapper" data-is-root-path={isHomePage}>
      <Header isHomePage={isHomePage} title={title} />

      <main>{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
