import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
// import Img from "gatsby-image" // whs 02/08/21: this does not come up as the default pic in links; add as first pic in each blog
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const { ogimage } = post.frontmatter

  const href = () => {
    const url =
      typeof window !== "undefined"
        ? window.location.href.replace(/\/$/, "")
        : ""

    return url
  }

  // const href = () => (location ? location.href.replace(/\/$/, "") : {})
  // const href = location.href.replace(/\/$/, "") || {}
  // const { href } = location
  const ogImagePath = href() && ogimage && ogimage.childImageSharp.fixed.src

  return (
    <Layout location={location} title={siteTitle}>
      {/* {console.log(`title: ${post.frontmatter.title}`)}
      {console.log(`description: ${post.frontmatter.description}`)} */}
      {console.log(ogimage)}
      {console.log(`ogImagePath: ${ogImagePath}`)}
      {/* {console.log(location)} */}
      {console.log(`href: ${href()}`)}
      {/* {console.log(`location href: ${location.href}`)} */}
      {/* {console.log(post.frontmatter)} */}
      {/* {console.log(post)} */}
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={ogImagePath}
        blogPath={href}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
          {/* <Img
            style={{
              borderRadius: 30,
              display: "none",
            }}
            fixed={post.frontmatter.featuredImage.childImageSharp.fixed}
          /> */}
        </header>
        <br />
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        ogimage {
          childImageSharp {
            fixed {
              src
            }
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
