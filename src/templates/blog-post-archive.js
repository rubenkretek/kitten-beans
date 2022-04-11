import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"

import parse from "html-react-parser"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

import PageBanner from "../components/PageBanner"
import { MdLocationPin } from 'react-icons/md';



const BlogIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allWpPost.nodes

  if (!posts.length) {
    return (
      <Layout>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add posts to your WordPress site and they'll
          appear here!
        </p>
      </Layout>
    )
  }



  return (
    <Layout>
      <PageBanner>
        <h1><span>Cat cafes</span> we have visted</h1>
      </PageBanner>
      <Seo title="All posts" />
      <div className="post-archive">
        <div className="layout__container">
          <ol className="post-archive__list">
            {posts.map(post => {
              const title = post.title
              const featuredImage = {
                data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
                alt: post.featuredImage?.node?.alt || ``,
              }

              return (
                <li className="post-archive__list-item" key={post.uri}>
                  <article
                    className="post-archive__teaser"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <div className="post-archive__image">
                      <GatsbyImage
                        image={featuredImage.data}
                        alt={featuredImage.alt}

                      />
                    </div>
                    <div className="post-archive__text">
                      <h2 className="post-archive__title">{parse(title)}</h2>
                      <div className="post-archive__location"><MdLocationPin />{post.cafeInfo.location}</div>
                      <section className="post-archive__description" itemProp="description">{parse(post.excerpt)}</section>
                      <Link to={post.uri} itemProp="url" className="post-archive__link button">Read more</Link>
                    </div>

                  </article>
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      {previousPagePath && (
        <>
          <Link to={previousPagePath}>Previous page</Link>
          <br />
        </>
      )}
      {nextPagePath && <Link to={nextPagePath}>Next page</Link>}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    allWpPost(
      sort: { fields: [date], order: DESC }
      limit: $postsPerPage
      skip: $offset
    ) {
      nodes {
        excerpt
        uri
        date(formatString: "MMMM DD, YYYY")
        title
        excerpt
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
