import { createContext, useState } from "react";

export const PlaylistContext=createContext()
export const PlaylistProvider = ({ children }) => {
    const [playLists, setPlaylists] = useState([]);
  
    const data = {
      playLists,
      setPlayLists: (data) => {
        setPlaylists(data);
      },
      removePlaylist: (playlistId) => {
        setPlaylists((prevPlaylists) => prevPlaylists.filter((playlist) => playlist.playlistId !== playlistId));
      },
      updatePlaylist: (updatedPlaylist) => {
        setPlaylists((prevPlaylists) =>
          prevPlaylists.map((playlist) => (playlist.playlistId === updatedPlaylist.playlistId ? updatedPlaylist : playlist))
        );
      },
    };
  
    return <PlaylistContext.Provider value={data}>{children}</PlaylistContext.Provider>;
  };