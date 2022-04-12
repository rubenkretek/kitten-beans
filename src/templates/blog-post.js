import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

import PageBanner from "../components/PageBanner"

import { MdLocationPin, MdCalendarToday, MdPublic, MdInfo } from 'react-icons/md';


const BlogPostTemplate = ({ data: { previous, next, post } }) => {
  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }
  const cafeInfo = post.cafeInfo

  return (
    <Layout>
      <Seo title={post.title} description={post.excerpt} />
      <PageBanner>
        <h1>{parse(post.title)}<span><br />Cat cafe</span></h1>
      </PageBanner>
      <div className="post__outer">
        <div className="layout__container layout__container--no-padding-large">
          <article
            className="post"
            itemScope
            itemType="http://schema.org/Article"
          >
            <aside className="post__aside">
              <h2 className="post__subtitle">About</h2>
              <div className="post__about-container">
                <div className="post__about post__about--location">
                  <div className="post__about-icon">
                    <MdLocationPin />
                  </div>
                  <div className="post__about-label">Location</div>
                  <div className="post__about-info">
                    <div className="post__about-value">
                      {cafeInfo.fullAddress}
                    </div>
                  </div>
                </div>

                <div className="post__about post__about--date-visited">
                  <div className="post__about-icon">
                    <MdCalendarToday />
                  </div>
                  <div className="post__about-label">Date Visited</div>
                  <div className="post__about-info">
                    <div className="post__about-value">
                      {cafeInfo.dateVisited}
                    </div>
                  </div>
                </div>

                <div className="post__about post__about--website">
                  <div className="post__about-icon">
                    <MdPublic />
                  </div>
                  <div className="post__about-label">Website</div>
                  <div className="post__about-info">
                    <div className="post__about-value">
                      {cafeInfo.website}
                    </div>
                  </div>
                </div>

                <div className="post__about post__about--features">
                  <div className="post__about-icon">
                    <MdInfo />
                  </div>
                  <div className="post__about-label">Features</div>
                  <div className="post__about-info">
                    {cafeInfo.features.map(feature =>
                      <div className="post__about-value">
                        {feature.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>
            <div className="post__main">
              <header>
                <h2 className="post__subtitle">{post.cafeInfo.subtitle}</h2>
                <p className="post__posted-date">Posted on: {post.date}</p>
              </header>

              {!!post.content && (
                <section itemProp="articleBody">{parse(post.content)}</section>
              )}
            </div>

            <nav className="post__post-nav">
              <div className="post__post-nav-title">
                <h4>Explore other cat cafes</h4>
              </div>
              <div className="post__post-nav-menu">
                <ul className="post__post-nav-list">
                  <li className="post__post-nav-list-item">
                    {previous && (
                      <Link to={previous.uri} rel="prev">
                        ← {parse(previous.title)}
                      </Link>
                    )}
                  </li>

                  <li className="post__post-nav-list-item">
                    {next && (
                      <Link to={next.uri} rel="next">
                        {parse(next.title)} →
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </nav>


          </article>
        </div>
      </div>

















    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                placeholder: TRACED_SVG
                layout: FULL_WIDTH
              )
            }
          }
        }
      }
      cafeInfo {
        subtitle
        dateVisited
        location
        fullAddress
        website
        features {
          id
          name
        }
      }
    }
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`
