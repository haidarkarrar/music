'use client'

import React, { useEffect, useTransition } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFormState } from 'react-dom'
import { useForm, useInputControl } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod'
import { uploadImage, uploadSong } from '@/lib/actions/file'
import { Album, Artist } from '@/drizzle/schema'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { songSchema } from '@/lib/validations/song-validation-schema'
import { insertSong } from '@/lib/actions/song'
import { toast } from 'sonner'

const AddSongForm = ({
    setFormOpen,
    albums,
    artists
}: {
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
    albums: Album[]
    artists: Artist[]
}) => {
    const [pending, startTransition] = useTransition()

    const [state, formAction] = useFormState(insertSong, undefined)
    const [form, fields] = useForm({
        // Sync the result of last submission
        lastResult: state,

        // Reuse the validation logic on the client
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: songSchema });
        },

        // Validate the form on blur event triggered
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    });

    useEffect(() => {
        if (form.status === 'success') {
            setFormOpen(false)
        }
    }, [form.status, setFormOpen])

    const image = useInputControl(fields.image)
    const songUrl = useInputControl(fields.songUrl)
    const artistId = useInputControl(fields.artistId)
    const albumId = useInputControl(fields.albumId)

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'songUrl') => {
        if (!e.target.files || e.target.files.length === 0) return

        try {
            const data = new FormData()
            data.set('file', e.target.files[0])

            startTransition(async () => {
                let res = undefined
                if (type === 'image') {
                    res = await uploadImage(data)
                } else {
                    res = await uploadSong(data)
                }

                if (!res.success) {
                    toast.error(res.error)
                    return
                }
                if (type === 'image') {
                    image.change(res.path)
                } else {
                    songUrl.change(res.path)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <form id={form.id} onSubmit={form.onSubmit} action={formAction} className="grid w-full items-center gap-1.5">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    key={fields.name.key}
                    name={fields.name.name}
                    defaultValue={fields.name.initialValue}
                />
                <div className='text-red-700'>{fields.name.errors}</div>
            </div>
            <div>
                <Label htmlFor="image">Image</Label>
                <Input
                    id="image"
                    type="file"
                    onChange={(e) => {
                        handleFileUpload(e, 'image')
                    }}
                />
                <input
                    type="hidden"
                    name={fields.image.name}
                    value={image.value}
                    key={fields.image.key}
                    defaultValue={fields.image.initialValue}
                />
                <div className='text-red-700'>{fields.image.errors}</div>
            </div>
            <div>
                <Label htmlFor="image">Song</Label>
                <Input
                    id="image"
                    type="file"
                    onChange={(e) => {
                        handleFileUpload(e, 'songUrl')
                    }}
                />
                <input
                    type="hidden"
                    name={fields.songUrl.name}
                    value={songUrl.value}
                    key={fields.songUrl.key}
                    defaultValue={fields.songUrl.initialValue}
                />
                <div className='text-red-700'>{fields.songUrl.errors}</div>
            </div>
            <div>
                <Select
                    value={fields.artistId.value || ''}
                    onValueChange={(value) => artistId.change(value)}
                >
                    <SelectTrigger className="">
                        <SelectValue placeholder="Select an artist" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Artists</SelectLabel>
                            {artists.map((artist) => (
                                <SelectItem key={artist.id} value={artist.id.toString()}>{artist.name}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className='text-red-700'>{fields.artistId.errors}</div>
            </div>
            <div>
                <Select
                    value={fields.albumId.value || ''}
                    onValueChange={(value) => albumId.change(value)}
                >
                    <SelectTrigger className="">
                        <SelectValue placeholder="Select an album" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Albums</SelectLabel>
                            {albums.map((album) => (
                                <SelectItem key={album.id} value={album.id.toString()}>{album.name}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className='text-red-700'>{fields.albumId.errors}</div>
            </div>
            <div className="flex justify-end">
                <Button type="submit">
                    Add Song
                </Button>
            </div>
        </form>
    )
}

export default AddSongForm