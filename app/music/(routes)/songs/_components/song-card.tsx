'use client'

import { Artwork } from '@/app/music/_components/artwork'
import { Button } from '@/components/ui/button'
import { Album, Artist, Song } from '@/drizzle/schema'
import { useAudioPlayerStore } from '@/zustand/audio-player'
import React from 'react'

type SongCardProps = Song & {
    album: Album | null
    artist: Artist | null
}

const SongCard = ({ song }: { song: SongCardProps }) => {
    const { openPlayer, addToPlaylist, playlist } = useAudioPlayerStore();

    const handlePlaySong = () => {
        const songIndex = playlist.findIndex((s) => s.songUrl === song.songUrl);
        if (songIndex !== -1) {
            openPlayer(songIndex);
        } else {
            addToPlaylist(song);
            openPlayer(playlist.length);
        }
    };

    return (
        <div className="flex flex-col space-y-2 cursor-pointer">
            <div onClick={handlePlaySong}>
                <Artwork
                    key={song.id}
                    cover={song.image || ''}
                    name={song.name}
                    desc={''}
                    className="w-[250px]"
                    aspectRatio="square"
                    width={250}
                    height={330}
                />
            </div>
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Artist: {song.artist?.name}</p>
                <p className="text-sm text-muted-foreground">Album: {song.album?.name}</p>
            </div>
            <Button onClick={() => addToPlaylist(song)}>Add to Playlist</Button>
        </div>
    )
}

export default SongCard