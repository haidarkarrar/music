'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import React from 'react'
import AddSongForm from './add-song-form'
import { Album, Artist } from '@/drizzle/schema'

const AddSong = ({
    artists,
    albums
}: {
    artists: Artist[]
    albums: Album[]
}) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    Add Song
                </Button>
            </DialogTrigger>
            <DialogContent>
                <AddSongForm setFormOpen={setOpen} albums={albums} artists={artists}/>
            </DialogContent>
        </Dialog>
    )
}

export default AddSong