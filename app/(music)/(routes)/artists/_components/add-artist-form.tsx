'use client'

import React, { useEffect, useTransition } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFormState } from 'react-dom'
import { insertArtist } from '@/lib/actions/artist'
import { useForm, useInputControl } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod'
import { uploadImage } from '@/lib/actions/file'
import { artistSchema } from '@/lib/validations/artist-validation-schema'

const AddArtistForm = ({
    setFormOpen
}: {
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [pending, startTransition] = useTransition()

    const [state, formAction] = useFormState(insertArtist, undefined)
    const [form, fields] = useForm({
        // Sync the result of last submission
        lastResult: state,

        // Reuse the validation logic on the client
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: artistSchema });
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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return

        try {
            const data = new FormData()
            data.set('file', e.target.files[0])

            startTransition(async () => {
                const res = await uploadImage(data)

                if (!res.success) throw new Error(res.error)
                image.change(res.path)
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
                <div>{fields.name.errors}</div>
            </div>
            <div>
                <Label htmlFor="image">Image</Label>
                <Input
                    id="image"
                    type="file"
                    onChange={(e) => handleImageUpload(e)}
                />
                <input
                    type="hidden"
                    name={fields.image.name}
                    value={image.value}
                    key={fields.image.key}
                    defaultValue={fields.image.initialValue}
                />
                <div>{fields.image.errors}</div>
            </div>
            <div className="flex justify-end">
                <Button type="submit">
                    Add Artist
                </Button>
            </div>
        </form>
    )
}

export default AddArtistForm