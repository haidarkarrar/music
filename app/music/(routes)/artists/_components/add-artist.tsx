'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import React from 'react'
import AddArtistForm from './add-artist-form'

const AddArtist = () => {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    Add Artist
                </Button>
            </DialogTrigger>
            <DialogContent>
                <AddArtistForm setFormOpen={setOpen}/>
            </DialogContent>
        </Dialog>
    )
}

export default AddArtist