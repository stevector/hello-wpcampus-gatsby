import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

const PostTemplate = props => {

  const { post } = props.data ? props.data.wordpress : {};

  return (
    <Layout>
      <SEO title={post.title} />
      <article>
        <h1>{post.title}</h1>
        <Img
          fluid={post.featuredImage.gatsbyImageFile.childImageSharp.fluid}
          alt="Gatsby Docs are awesome"
        />
        <br />
        <div dangerouslySetInnerHTML={{__html:post.content}}></div>
      </article>
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query post($id: ID!) {
    wordpress {
      post(id: $id) {
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
    site {
      siteMetadata {
        title
      }
    }
  }
`;
