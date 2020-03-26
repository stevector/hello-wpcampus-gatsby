import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      wordpress {
        posts {
          nodes {
            id
            title(format: RENDERED)
            slug
            date
            excerpt(format: RENDERED)
            content(format: RENDERED)
            featuredImage {
              mediaItemUrl
              gatsbyImageFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Latest posts</h1>
      {data.wordpress.posts.nodes &&
        data.wordpress.posts.nodes.map(post => (
          <>
            <Link to={post.slug}>
              <h3>{post.title}</h3>
            </Link>
            {post.featuredImage && (
              <div>
                <Link to={post.slug}>
                  <Img
                    fluid={
                      post.featuredImage.gatsbyImageFile.childImageSharp.fluid
                    }
                    alt="Gatsby Docs are awesome"
                  />
                </Link>
              </div>
            )}
            <br />
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
            <Link to={post.slug}>Read more</Link>
            <hr />
          </>
        ))}
    </Layout>
  )
}

export default IndexPage
