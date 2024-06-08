import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { Artwork } from '../../_components/artwork'
import { Button } from '@/components/ui/button'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { getAlbums } from '@/lib/data/album'
import { getArtists } from '@/lib/data/artist'
import AddSong from './_components/add-song'
import { getSongs } from '@/lib/data/song'
import AudioPlayerComponent from './_components/audio-player'
import SongCard from './_components/song-card'

const AlbumsPage = async () => {
    const songsData = getSongs()
    const artistsData = getArtists()
    const albumsData = getAlbums()

    const [songs, artists, albums] = await Promise.all([songsData, artistsData, albumsData])

    console.log(songs)

    return (
        <div className='col-span-3 lg:col-span-4 p-6 lg:border-l'>
            <div className="flex justify-end mr-4">
                <AddSong albums={albums} artists={artists} />
            </div>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Songs
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Top picks for you. Updated daily.
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">
                <ScrollArea>
                    <div className="flex space-x-4 pb-4">
                        {songs.map((song) => (
                            <SongCard key={song.id} song={song} />
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    )
}

export default AlbumsPage