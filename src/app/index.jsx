import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import '../firebaseConfig.js'

import EditorContext from '../components/EditorContext'
import SoundContext from '../components/SoundContext'
import Editor from '../editor'
import SoundManager from '../sound/SoundManager'
import { Dashboard } from '../pages/dashboard'

const Home = lazy(() => import('../pages'))

const Sonify = lazy(() =>
  import('../pages/sonify')
)

const Preferences = lazy(() =>
  import('../pages/preferences')
)

const About = lazy(() =>
  import('../pages/about')
)

const Resources = lazy(() =>
  import('../pages/resources')
)

const Tutorial = lazy(() =>
  import('../pages/tutorial')
)

const Tutorial2 = lazy(() =>
  import ('../pages/TutorialSlides/tutorial2')
)

const Tutorial3 = lazy(() =>
  import ('../pages/TutorialSlides/tutorial3')
)

const Tutorial4 = lazy(() =>
  import ('../pages/TutorialSlides/tutorial4')
)

const Tutorial5 = lazy(() =>
  import ('../pages/TutorialSlides/tutorial5')
)

const Tutorial6 = lazy(() =>
  import ('../pages/TutorialSlides/tutorial6')
)

const Question = lazy(() =>
  import('../pages/question')
)

const Feedback = lazy(() =>
  import('../pages/feedback')
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: 'sonify',
        element: <Sonify/>
      },
      {
        path: 'preferences',
        element: <Preferences/>
      },
      {
        path: 'about',
        element: <About/>
      },
      {
        path: 'resources',
        element: <Resources/>
      },
      {
        path: 'tutorial',
        element: <Tutorial/>
      },
      {
        path: 'tutorial2',
        element: <Tutorial2/>
      },
      {
        path: 'tutorial3',
        element: <Tutorial3/>
      },
      {
        path: 'tutorial4',
        element: <Tutorial4/>
      },
      {
        path: 'tutorial5',
        element: <Tutorial5/>
      },
      {
        path: 'tutorial6',
        element: <Tutorial6/>
      },
      {
        path: 'question',
        element: <Question/>
      },
      {
        path: 'feedback',
        element: <Feedback/>
      }
    ]
  }
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
        <Helmet defaultTitle="Sound of Code">
          <meta
            name="description"
            content="The sound of code is an interactive JavaScript environment for
                learning (and hearing) JavaScript. We leverage state of the art
                sonification techniques to augment your code. You simply write
                JavaScript (or load from a file) and our system annotates it
                with sounds. You will be able to hear the difference between
                different data types and structures as well as hear both syntax
                and runtime errors."
          />
        </Helmet>

        <main className="container">
          <Suspense fallback={<p>Loading...</p>}>
            <RouterProvider router={router}/>
          </Suspense>
        </main>

        <footer>
          <div className="col-sm col-md-10 col-md-offset-1">
            <p>Sound of Code, UNL 2017-2018, ISU 2023</p>
          </div>
        </footer>
      </EditorContext.Provider>
    </SoundContext.Provider>
  )
}

export default App
