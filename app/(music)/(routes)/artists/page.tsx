import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { Artwork } from '../../_components/artwork'
import { Button } from '@/components/ui/button'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import AddArtistForm from './_components/add-artist-form'
import { getArtists } from '@/lib/data/artist'
import AddArtist from './_components/add-artist'


const ArtistsPage = async () => {
    const artists = await getArtists()

    return (
        <div className='col-span-3 lg:col-span-4 p-6 lg:border-l'>
            <div className="flex justify-end mr-4">
                <AddArtist />
            </div>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Artists
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
                        {artists.map((artist) => (
                            <Artwork
                                key={artist.id}
                                cover={artist.image || ''}
                                name={artist.name}
                                desc={''}
                                className="w-[250px]"
                                aspectRatio="square"
                                width={250}
                                height={330}
                            />
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    )
}

export default ArtistsPage