'use client'
import React from 'react'

import { Song } from '@/drizzle/schema'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AudioPlayerComponent = ({ song }: { song: Song }) => {
    if(!song.songUrl) return null
    return (
        <div>
            <AudioPlayer 
                src={song.songUrl}
                onPlay={() => console.log('play')}
            />
        </div>
    )
}

export default AudioPlayerComponent