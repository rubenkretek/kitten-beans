import React from "react"
import Layout from "../components/layout"
import PageBanner from "../components/PageBanner"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import parse from "html-react-parser"
import { Link, graphql } from "gatsby"
import { MdLocationPin } from 'react-icons/md';

const Homepage = ({ data }) => {
    const frontPagePosts = data.allWpPost.nodes


    return (
        <Layout>
            <PageBanner>
                <h1>A place for <span>coffee</span><br /> & <span>cat</span> lovers</h1>
            </PageBanner>
            <section className="home">
                <div className="layout__container">
                    <div className="home__intro">
                        <div className="home__intro-image">
                            <StaticImage
                                src="../images/late-art.jpg"
                                alt="Kitten Beans Logo"
                                layout="fullWidth"
                                objectFit="cover"
                                objectPosition="50% 50%"
                            />
                        </div>
                        <div className="home__intro-text">
                            <h2 className="home__heading-2">Join us on the journey of discovering all the cat cafes in the world</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin faucibus fermentum tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mauris turpis, auctor ut congue ut, maximus eu justo. Donec diam dui, elementum ac pellentesque non, tempor eu sapien. Praesent nulla arcu, pharetra cursus volutpat quis, scelerisque efficitur ipsum. Phasellus sodales dui at facilisis lacinia. Sed lacinia, nisi eget ornare faucibus, quam metus vehicula risus, in semper massa mauris sit amet sapien.</p>
                            <Link to="/cat-cafes/" className="button">
                                Cafe Reviews
                            </Link>
                        </div>
                    </div>
                    <div className="home__featured-posts">
                        <div className="home__featured-posts-title">
                            <h2 className="home__heading-2">Featured Reviews</h2>
                        </div>
                        <div className="home__featured-posts-items">
                            <div className="featured-posts">
                                <ul className="featured-posts__list">
                                    <li className="featured-posts__link">
                                        <Link to="/cat-cafes/">
                                            <span>View all</span>
                                        </Link>
                                    </li>
                                    {frontPagePosts.map(post => {
                                        const title = post.title
                                        const location = post.cafeInfo.location
                                        console.log(post.uri)
                                        const featuredImage = {
                                            data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
                                            alt: post.featuredImage?.node?.alt || ``,
                                        }
                                        return (
                                            <li className="featured-posts__item" key={post.id}>
                                                <Link to={post.uri} itemProp="url">
                                                    <div className="featured-posts__card">
                                                        <div className="featured-posts__text">
                                                            <div className="featured-posts__title">
                                                                <h3>{title}</h3>
                                                            </div>
                                                            <div className="featured-posts__location">
                                                                <MdLocationPin /> {location}
                                                            </div>
                                                        </div>
                                                        <div className="featured-posts__image">
                                                            {featuredImage?.data && (
                                                                <GatsbyImage
                                                                    image={featuredImage.data}
                                                                    alt={featuredImage.alt}

                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Homepage

// Filter out 4 items with the 'Front page' category assigned
export const query = graphql`
  {
    allWpPost(
      filter: {categories: {nodes: {elemMatch: {id: {eq: "dGVybTozNw=="}}}}}
      limit: 4
    ) {
      nodes {
        id
        title
        uri
        cafeInfo {
          location
        }
        featuredImage {
          node {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(
                    quality: 100
                    placeholder: TRACED_SVG
                    layout: FULL_WIDTH
                    aspectRatio: 1.3
                    transformOptions: {cropFocus: CENTER, fit: COVER}
                  )
              }
            }
          }
        }
      }
    }
  }
`