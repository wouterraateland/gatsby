import React from "react"
import PropTypes from "prop-types"

import { MdArrowForward as ArrowForwardIcon } from "react-icons/md"

import HomepageSection from "./homepage-section"
import HomepageBlogPosts from "./homepage-blog-posts"

import { BlogIcon } from "../../assets/icons"

const HomepageBlog = ({ posts }) => (
  <HomepageSection
    sectionName="Blog"
    sectionIcon={BlogIcon}
    title="The Gatsby blog"
    links={[
      {
        label: `View all posts`,
        to: `/blog/`,
        icon: ArrowForwardIcon,
        tracking: `The Gatsby Blog - View all posts`,
      },
    ]}
  >
    <HomepageBlogPosts posts={posts} />
  </HomepageSection>
)

HomepageBlog.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default HomepageBlog
