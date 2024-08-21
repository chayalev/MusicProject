import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {SongProvider} from './context/songsContext.jsx'
import { SelectedPlaylistProvider} from './context/selectedPlaylistContext.jsx'
  import {SelectedSongProvider} from './context/selectedSongContext.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <SelectedPlaylistProvider>
     <SelectedSongProvider>
    <SongProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </SongProvider>
    </SelectedSongProvider>
    </SelectedPlaylistProvider>
  </React.StrictMode>,
)
