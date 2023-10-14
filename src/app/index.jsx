import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import EditorContext from '../components/EditorContext'
import SoundContext from '../components/SoundContext'
import Editor from '../editor'
import SoundManager from '../sound/SoundManager'
import { Dashboard } from '../pages/dashboard'

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard/>,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: 'sonify',
        element: <Sonify/>,
      },
      {
        path: 'preferences',
        element: <Preferences/>,
      },
      {
        path: 'about',
        element: <About/>,
      },
      {
        path: 'resources',
        element: <Resources/>,
      }
    ]
  },
])

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

        <main className='container'>
          <Suspense fallback={<p>Loading...</p>}>
            <RouterProvider router={router}/>
          </Suspense>
        </main>

        <footer>
          <div className='col-sm col-md-10 col-md-offset-1'>
            <p>Sound of Code, UNL 2017-2018, ISU 2023</p>
          </div>
        </footer>
      </EditorContext.Provider>
    </SoundContext.Provider>
  )
}

export default App
