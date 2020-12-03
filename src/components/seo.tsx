/* eslint-disable react/prop-types */

/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { FC } from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

interface Meta {
    name: string
    content: string
}

interface Prop {
  description?: string
  lang?: string
  meta?: Meta[]
  title: string
}

interface Site {
  siteMetadata?: {
    title: string
    description: string
    author: string
  }
}

const SEO: FC<Prop> = ({ description, lang, meta, title }) => {
  const { site } = useStaticQuery<{ site: Site }>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata?.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      meta={[
        {
          name: 'description',
          content: metaDescription
        },
        {
          property: 'og:title',
          content: title
        },
        {
          property: 'og:description',
          content: metaDescription
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata?.author || ''
        },
        {
          name: 'twitter:title',
          content: title
        },
        {
          name: 'twitter:description',
          content: metaDescription
        }
      ].concat(meta ?? [])}
      title={title}
      titleTemplate={defaultTitle ?? `%s | ${defaultTitle}`}
    />
  )
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  description: ''
}

export default SEO
