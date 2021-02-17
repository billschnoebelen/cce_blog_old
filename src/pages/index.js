import React from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Bio from "../components/bio"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const ogImageFullPath = `https://circuit-case-blog.s3-us-west-1.amazonaws.com/main-og-image.jpg`

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <div>
      {" "}
      <Helmet>
        <script
          type="module"
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        />
        <script
          nomodule
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"
        />
      </Helmet>
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" image={ogImageFullPath} />
        {/* <model-viewer style={{width: "100%", height: "650px"}} skybox-image="https://circuit-case-blog.s3-us-west-1.amazonaws.com/SAND-SPIKE/umhlanga_sunrise_1k.hdr" src="https://circuit-case-blog.s3-us-west-1.amazonaws.com/SAND-SPIKE/sand-spike-GLTF-Aligned.gltf" alt="A 3D model of an welded aluminum sand spike" auto-rotate camera-controls></model-viewer> */}
        <Bio />
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <li key={post.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <Link to={post.fields.slug} itemProp="url">
                      <h2>
                        <span itemProp="headline">{title}</span>
                      </h2>
                      <br />
                      <Img
                        style={{
                          borderRadius: 30,
                        }}
                        fixed={
                          post.frontmatter.featuredImage.childImageSharp.fixed
                        }
                      />
                    </Link>
                    {/* <Img
                    fixed={post.frontmatter.featuredImage.childImageSharp.fixed}
                  /> */}
                    <small>{post.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
            )
          })}
        </ol>
      </Layout>
    </div>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          featuredImage {
            childImageSharp {
              # Specify the image processing specifications right in the query.
              # Makes it trivial to update as your page's design changes.
              fixed(width: 630, height: 630) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
