import React from "react"
import Layout from "../components/layout"
import PageBanner from "../components/PageBanner"

const About = () => {

    return (
        <Layout>
            <PageBanner>
                <h1>Get in <span>touch</span></h1>
            </PageBanner>
            <section className="contact">
                <div className="layout__container">
                    <div className="contact__text">
                        <h2>Send us a message by filling out this form</h2>
                    </div>
                    <div className="contact__form">
                        <form name="contact" method="POST" data-netlify="true" className="form">
                            <div className="form__field">
                                <label>Your Name</label>
                                <input type="text" name="name" />
                            </div>
                            <div className="form__field">
                                <label>Your Email</label>
                                <input type="email" name="email" />
                            </div>
                            <div className="form__field">
                                <label>Message</label>
                                <textarea name="message"></textarea>
                            </div>
                            <div className="form__field">
                                <button type="submit" className="button">Send</button>

                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default About
