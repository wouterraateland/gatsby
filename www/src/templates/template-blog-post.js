/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

import { mediaQueries } from "gatsby-design-tokens/dist/theme-gatsbyjs-org"
import Link from "../components/localized-link"
import Container from "../components/container"
import EmailCaptureForm from "../components/email-capture-form"
import TagsSection from "../components/tags-section"
import Avatar from "../components/avatar"
import PrevAndNext from "../components/prev-and-next"
import FooterLinks from "../components/shared/footer-links"

class BlogPostTemplate extends React.Component {
  render() {
    const {
      pageContext: { prev, next },
      data: { mdx: post },
      location: { href },
    } = this.props
    const BioLine = ({ children }) => (
      <p
        sx={{
          color: `textMuted`,
          fontFamily: `heading`,
          lineHeight: `dense`,
          m: 0,
        }}
      >
        {children}
      </p>
    )
    let canonicalLink

    if (post.frontmatter.canonicalLink) {
      canonicalLink = (
        <link rel="canonical" href={post.frontmatter.canonicalLink} />
      )
    }
    return (
      <>
        <Container>
          {
            // TODO
            // - settle on `docSearch-content` as selector to identify
            //   Algolia DocSearch content
            // - make use of components/docsearch-content in place of <main>
            //
            // `post` and `post-body` are only in use as selectors in the
            // docsearch config for gatsbyjs.org for individual blog posts:
            // https://github.com/algolia/docsearch-configs/blob/89706210b62e2f384e52ca1b104f92bc0e225fff/configs/gatsbyjs.json#L71-L76
          }
          <main id={`reach-skip-nav`} className="post docSearch-content">
            {/* Add long list of social meta tags */}
            <Helmet>
              <title>{post.frontmatter.title}</title>
              <link
                rel="author"
                href={`https://gatsbyjs.org${post.frontmatter.author.fields.slug}`}
              />
              <meta name="description" content={post.fields.excerpt} />

              <meta property="og:description" content={post.fields.excerpt} />
              <meta name="twitter:description" content={post.fields.excerpt} />
              <meta property="og:title" content={post.frontmatter.title} />
              <meta property="og:url" content={href} />
              {post.frontmatter.image && (
                <meta
                  property="og:image"
                  content={`https://gatsbyjs.org${post.frontmatter.image.childImageSharp.resize.src}`}
                />
              )}
              {post.frontmatter.image && (
                <meta
                  name="twitter:image"
                  content={`https://gatsbyjs.org${post.frontmatter.image.childImageSharp.resize.src}`}
                />
              )}
              <meta property="og:type" content="article" />
              <meta
                name="article:author"
                content={post.frontmatter.author.id}
              />
              <meta
                name="twitter:creator"
                content={post.frontmatter.author.twitter}
              />
              <meta name="author" content={post.frontmatter.author.id} />
              <meta name="twitter:label1" content="Reading time" />
              <meta
                name="twitter:data1"
                content={`${post.timeToRead} min read`}
              />
              <meta
                name="article:published_time"
                content={post.frontmatter.rawDate}
              />
              {canonicalLink}
            </Helmet>
            <div sx={{ display: `flex`, flexDirection: `column` }}>
              <section
                sx={{
                  display: `flex`,
                  mb: 5,
                  [mediaQueries.md]: {
                    mt: 3,
                    mb: 9,
                  },
                }}
              >
                <div css={{ flex: `0 0 auto` }}>
                  <Link
                    to={post.frontmatter.author.fields.slug}
                    css={{ "&&": { borderBottom: 0 } }}
                  >
                    <Avatar
                      image={
                        post.frontmatter.author.avatar.childImageSharp.fixed
                      }
                      overrideCSS={{ mr: 5 }}
                    />
                  </Link>
                </div>
                <div css={{ flex: `1 1 auto` }}>
                  <Link to={post.frontmatter.author.fields.slug}>
                    <h4
                      sx={{
                        fontSize: 3,
                        mb: 1,
                        color: `link.color`,
                      }}
                    >
                      <span
                        sx={{
                          borderBottom: t =>
                            `1px solid ${t.colors.link.border}`,
                          transition: t =>
                            `all ${t.transition.speed.fast} ${t.transition.curve.default}`,
                          "&:hover": { borderColor: `link.hoverBorder` },
                        }}
                      >
                        {post.frontmatter.author.id}
                      </span>
                    </h4>
                  </Link>
                  <BioLine>{post.frontmatter.author.bio}</BioLine>
                  <BioLine>
                    {post.timeToRead} min read · {post.frontmatter.date}
                    {post.frontmatter.canonicalLink && (
                      <span>
                        {` `}
                        (originally published at
                        {` `}
                        <a href={post.frontmatter.canonicalLink}>
                          {post.fields.publishedAt}
                        </a>
                        )
                      </span>
                    )}
                  </BioLine>
                </div>
              </section>
              <h1
                sx={{
                  marginTop: 0,
                  order: 0,
                  letterSpacing: `tight`,
                  lineHeight: `dense`,
                  fontSize: [6, 7, 8, 9, 11],
                  [mediaQueries.lg]: {
                    mb: 8,
                  },
                }}
              >
                {post.frontmatter.title}
              </h1>
              {post.frontmatter.image &&
                post.frontmatter.showImageInArticle !== false && (
                  <div
                    sx={{
                      mt: 8,
                      mb: 12,
                      [mediaQueries.lg]: {
                        ml: `-8em`,
                      },
                    }}
                  >
                    <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
                    {post.frontmatter.imageAuthor &&
                      post.frontmatter.imageAuthorLink && (
                        <em>
                          Image by
                          {` `}
                          <a href={post.frontmatter.imageAuthorLink}>
                            {post.frontmatter.imageAuthor}
                          </a>
                        </em>
                      )}
                  </div>
                )}
            </div>
            <section className="post-body">
              <MDXRenderer>{post.body}</MDXRenderer>
            </section>
            <TagsSection tags={post.frontmatter.tags} />
            <EmailCaptureForm />
          </main>
        </Container>
        <div
          sx={{
            borderTop: t => `1px solid ${t.colors.ui.border}`,
            mt: 9,
            [mediaQueries.md]: { pt: 5 },
            [mediaQueries.lg]: { pt: 7 },
          }}
        >
          <Container>
            <PrevAndNext prev={prev} next={next} />
          </Container>
          <FooterLinks />
        </div>
      </>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      timeToRead
      fields {
        slug
        excerpt
        publishedAt
      }
      frontmatter {
        title
        date(formatString: "MMMM Do YYYY")
        rawDate: date
        canonicalLink
        tags
        image {
          childImageSharp {
            resize(width: 1500, height: 1500) {
              src
            }
            fluid(maxWidth: 786) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        imageAuthor
        imageAuthorLink
        imageTitle
        showImageInArticle
        author {
          id
          bio
          twitter
          avatar {
            childImageSharp {
              fixed(
                width: 64
                height: 64
                quality: 75
                traceSVG: {
                  turdSize: 10
                  background: "#f6f2f8"
                  color: "#e0d6eb"
                }
              ) {
                ...GatsbyImageSharpFixed_tracedSVG
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
