import './App.scss'
import Footer from './Footer.react'
import Header from './Header.react'
import Helmet from 'react-helmet'
import React, { PropTypes, PureComponent } from 'react'
import favicon from '../../common/app/favicon'
import start from '../../common/app/start'
import { connect } from 'react-redux'
import { locationShape } from 'react-router'

const defaultMetas = [
  { charset: 'utf-8' },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
  },
  {
    'http-equiv': 'x-ua-compatible',
    content: 'ie=edge'
  }
]

class AppInternal extends PureComponent {

  static propTypes = {
    children: PropTypes.object.isRequired,
    currentLocale: PropTypes.string.isRequired,
    location: locationShape
  }

  render () {
    const { children, currentLocale, location } = this.props

    return (
      <div className='container'>
        <Helmet
          htmlAttributes={{ lang: currentLocale }}
          titleTemplate='%s'
          meta={[
            ...defaultMetas,
            {
              name: 'description',
              content: 'Dev stack and starter kit for functional and universal React apps'
            },
            ...favicon.meta
          ]}
          link={[
            ...favicon.link
          ]}
        />
        {/* Pass location to ensure header active links are updated. */}
        <Header location={location} />
          {children}
        <Footer />
      </div>
    )
  }

}

const App = start(AppInternal)

export default connect(state => ({
  currentLocale: state.intl.currentLocale
}))(App)
