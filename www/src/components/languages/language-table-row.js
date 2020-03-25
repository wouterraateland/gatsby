/** @jsx jsx */
import { jsx } from "theme-ui"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import { mediaQueries } from "gatsby-design-tokens/dist/theme-gatsbyjs-org"

import { localizedPath } from "../../utils/i18n"

import { MdLaunch as LaunchIcon } from "react-icons/md"
import DefaultLanguageBadge from "./default-language-badge"

const LocalName = styled.strong`
  flex: 1;
  width: 6rem;
  color: ${p => p.theme.colors.text};
`

const MutedLink = styled.a`
  && {
    color: inherit;
    &:not(:hover) {
      border-bottom-color: transparent;
    }
  }
`

const Row = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${p => p.theme.space[2]} ${p => p.theme.space[4]};
  margin: 0 -${p => p.theme.space[4]};
  border-radius: ${p => p.theme.radii[3]};

  &&,
  &&:hover {
    border: 2px solid transparent;
    color: ${p => p.theme.colors.textMuted};
  }

  &:hover {
    box-shadow: ${p => p.theme.shadows.raised};

    & ${LocalName} {
      color: ${p => p.theme.colors.link.color};
    }
  }

  ${p =>
    p.isCurrent &&
    css`
      &&,
      &&:hover {
        border-color: ${p.theme.colors.gatsby};
      }

      box-shadow: ${p.theme.shadows.floating};

      & ${LocalName} {
        color: ${p.theme.colors.link.color};
      }
    `}

  ${mediaQueries.md} {
    padding: ${p => p.theme.space[3]} ${p => p.theme.space[6]};
    margin: 0 -${p => p.theme.space[6]};
  }
`

const LanguageIdentification = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  ${mediaQueries.sm} {
    width: 12rem;
    flex-direction: row;
  }
`

const LanguageMeta = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-end;

  ${mediaQueries.sm} {
    flex-direction: row;
  }
`

const LanguageBadgeContainer = styled.div`
  flex: 1;

  ${mediaQueries.sm} {
    width: 9rem;
  }
`

const LanguageTableRow = ({ lang, isDefault, isCurrent }) => {
  return (
    <Row isCurrent={isCurrent} to={localizedPath(lang.code, "/languages")}>
      <LanguageIdentification>
        <LocalName>{lang.localName}</LocalName>
        <span sx={{ width: "6rem", flex: 1 }}>{lang.name}</span>
      </LanguageIdentification>
      <LanguageMeta>
        <LanguageBadgeContainer>
          {isDefault && (
            <DefaultLanguageBadge>Default language</DefaultLanguageBadge>
          )}
        </LanguageBadgeContainer>
        <MutedLink
          href={`https://github.com/gatsbyjs/gatsby-${lang.code}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={event => event.stopPropagation()}
        >
          Contribute <LaunchIcon />
        </MutedLink>
      </LanguageMeta>
    </Row>
  )
}

export default LanguageTableRow
