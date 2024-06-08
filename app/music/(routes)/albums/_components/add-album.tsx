'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import React from 'react'
import AddAlbumForm from './add-album-form'
import { Artist } from '@/drizzle/schema'

const AddAlbum = ({
    artists,
}: {
    artists: Artist[]
}) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    Add Album
                </Button>
            </DialogTrigger>
            <DialogContent>
                <AddAlbumForm artists={artists} setFormOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}

export default AddAlbum