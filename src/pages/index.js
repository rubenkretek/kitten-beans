import React from "react"
import Layout from "../components/layout"
import PageBanner from "../components/PageBanner"

const Homepage = () => {

    return (
        <Layout>
            <PageBanner>
                <h1>A place for <span>coffee</span><br /> & <span>cat</span> lovers</h1>
            </PageBanner>
        </Layout>
    )
}

export default Homepage
