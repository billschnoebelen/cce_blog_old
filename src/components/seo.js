/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
// import { Location } from "@reach/router"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
// import defaultOpenGraphImage from "../../content/assets/CCElogo.png"

// const MyComponent = () => (
//   <Location>{({ location }) => `"the location" ${location}`}</Location>
// )

const SEO = ({ description, lang, meta, title, image }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl

            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  // const ogImageUrl =
  //   site.siteMetadata.siteUrl + (image || defaultOpenGraphImage)
  // const href = () => {
  //   const url =
  //     typeof window !== "undefined"
  //       ? window.location.href.replace(/\/$/, "")
  //       : ""

  //   return url
  // }
  // const href = MyComponent()
  // const ogImageUrl = MyComponent() + (image || defaultOpenGraphImage)

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: image,
        },
        {
          property: `twitter:image`,
          content: image,
        },
        {
          property: `image`,
          content: image,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.social?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      {/* {console.log(`ogImageUrl: ${ogImageUrl}`)}{" "}
      {console.log(`href: ${href.toString}`)}{" "} */}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
