'use client'

import React from 'react';
import { useAudioPlayerStore } from '@/zustand/audio-player';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { ArrowUpDown, Minimize, XIcon } from 'lucide-react';

const GlobalAudioPlayer: React.FC = () => {
    const {
        isOpen,
        closePlayer,
        playlist,
        currentMusicIndex,
        nextSong,
        previousSong,
        setCurrentMusicIndex,
        isMinimized,
        minimizePlayer,
        isCollapsed,
        collapsePlayer,
        purgePlaylist
    } = useAudioPlayerStore();

    if (playlist.length === 0) return null;

    const currentSong = playlist[currentMusicIndex];

    if (!currentSong || !currentSong.songUrl) return null;

    if (!isOpen) return null;

    const handleClosePlayer = () => {
        //alert the user before closing the player
        if (window.confirm('Closing the player will remove all the songs from the playlist. ')) {
            purgePlaylist();
            closePlayer();
        }
    }

    return (
        <div
            className={`
                ${isCollapsed && isMinimized
                    ?
                    'w-1/3 fixed bottom-[-146px] right-0 z-50 bg-white p-4 shadow-lg flex items-center justify-between transition-all duration-300'
                    :
                    `${isMinimized
                        ?
                        'w-1/3 fixed bottom-0 right-0 z-50 bg-white p-4 shadow-lg flex items-center justify-between transition-all duration-300'
                        :
                        `w-full fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
                    `}
                `}>
            <div className={`bg-white px-4 pb-4 pt-8 rounded-lg relative ${!isMinimized ? 'w-1/3' : 'w-full'}`}>
                {isMinimized && (
                    <div className="absolute top-2 right-[47%]">
                        <ArrowUpDown className="h-4 w-4 cursor-pointer" onClick={collapsePlayer} />
                    </div>
                )}
                <div className="absolute top-2 right-2 flex items-center justify-center gap-2">
                    <Minimize className="h-4 w-4 cursor-pointer" onClick={minimizePlayer} />
                    <XIcon className="h-4 w-4 cursor-pointer" onClick={() => handleClosePlayer()} />
                </div>
                <div>
                    <AudioPlayer
                        src={currentSong.songUrl}
                        onClickPrevious={previousSong}
                        onClickNext={nextSong}
                        onEnded={nextSong}
                        autoPlayAfterSrcChange
                        showSkipControls
                        showJumpControls={false}
                    />
                    <div className="flex items-center justify-center font-semibold">
                        <p>{currentSong.name}</p>
                    </div>
                </div>
                {!isMinimized && playlist.map((song, index) => (
                    <div
                        key={song.id}
                        className={`${index === currentMusicIndex ? 'bg-accent' : ''} flex items-center justify-between p-2 rounded-lg hover:bg-accent/80 cursor-pointer`}
                        onClick={() => setCurrentMusicIndex(index)}
                    >
                        <p>{song.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default GlobalAudioPlayer;
