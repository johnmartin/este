import React, { PureComponent } from 'react'
import linksMessages from '../../common/app/linksMessages'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'

class Header extends PureComponent {

  render () {
    return (
      <header>
        <h1>
          <Link to='/'>
            <FormattedMessage {...linksMessages.home} />
          </Link>
        </h1>
        <ul>
          <li>
            <Link activeClassName='active' to='/intl'>
              <FormattedMessage {...linksMessages.intl} />
            </Link>
          </li>
        </ul>
      </header>
    )
  }

}

export default Header
