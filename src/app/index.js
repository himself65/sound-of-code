import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Router, Link } from '@reach/router'

import EditorContext from '../components/EditorContext'
import SoundContext from '../components/SoundContext'
import Editor from '../editor'
import SoundManager from '../sound/SoundManager'
import { getUrl } from '../utils'

const Home = lazy(() =>
  import(/* webpackChunkName: "home", webpackPrefetch: true */ '../pages')
)

const Sonify = lazy(() =>
  import(
    /* webpackChunkName: "sonify", webpackPrefetch: true */ '../pages/sonify'
  )
)

const Preferences = lazy(() =>
  import(
    /* webpackChunkName: "preferences", webpackPrefetch: true */ '../pages/preferences'
  )
)

const About = lazy(() =>
  import(
    /* webpackChunkName: "about", webpackPrefetch: true */ '../pages/about'
  )
)

const Resources = lazy(() =>
  import(
    /* webpackChunkName: "resources", webpackPrefetch: true */ '../pages/resources'
  )
)

/**
 * @param {object} props
 * @param {*} props.path
 * @param {*} props.route
 */
function Page (props) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <props.route />
    </Suspense>
  )
}

export function App () {
  /** @type {[Editor, React.Dispatch<Editor>]} */
  const [editor, setEditor] = useState(null)

  /** @type {[SoundManager, React.Dispatch<SoundManager>]} */
  const [sound, setSound] = useState(null)

  useEffect(() => {
    if (!editor) {
      setEditor(new Editor())
    }

    if (!sound) {
      setSound(new SoundManager())
    }
  }, [editor, sound])

  return (
    <SoundContext.Provider value={sound}>
      <EditorContext.Provider value={editor}>
        <Helmet defaultTitle='Sound of Code'>
          <meta
            name='description'
            content='The sound of code is an interactive JavaScript environment for
                learning (and hearing) JavaScript. We leverage state of the art
                sonification techniques to augment your code. You simply write
                JavaScript (or load from a file) and our system annotates it
                with sounds. You will be able to hear the difference between
                different data types and structures as well as hear both syntax
                and runtime errors.'
          />
        </Helmet>

        <header>
          <div className='col-sm col-md-10 col-md-offset-1'>
            <Link role='button' to={getUrl('./')}>
              Home
            </Link>
            <Link role='button' to={getUrl('./sonify')}>
              Sonify
            </Link>
            <Link role='button' to={getUrl('./preferences')}>
              Preferences
            </Link>
            <Link role='button' to={getUrl('./about')}>
              About
            </Link>
            <Link role='button' to={getUrl('./resources')}>
              Tutorial & JS Resources
            </Link>
          </div>
        </header>

        <main className='container'>
          <Router>
            <Page path={getUrl('./')} route={Home} />
            <Page path={getUrl('./sonify')} route={Sonify} />
            <Page path={getUrl('./preferences')} route={Preferences} />
            <Page path={getUrl('./about')} route={About} />
            <Page path={getUrl('./resources')} route={Resources} />
          </Router>
        </main>

        <footer>
          <div className='col-sm col-md-10 col-md-offset-1'>
            <p>Sound of Code, UNL 2017-2018</p>
          </div>
        </footer>
      </EditorContext.Provider>
    </SoundContext.Provider>
  )
}

export default App
