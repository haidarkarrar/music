'use server'

import { writeFile } from "fs/promises";
import { join } from "path";
import path from "path";
import fs from "fs";
import { fileTypeFromBuffer } from 'file-type';

export const uploadSong = async (formData: FormData) => {
    const rawFormData = {
        file: formData.get('file') as unknown as File | null,
    }

    const { file } = rawFormData

    if (!file) return {
        success: false,
        path: '',
        error: 'No file selected',
        status: 400,
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const type = await fileTypeFromBuffer(buffer);
    if (!type || !['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/flac'].includes(type.mime)) {
        return {
            success: false,
            path: '',
            error: 'Invalid file type',
            status: 400,
        };
    }

    const relativePath = path.join('public', 'uploads', file.name);
    const absolutePath = path.resolve(process.cwd(), relativePath);

    const dir = path.dirname(absolutePath)

    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            path: '',
            error: 'Failed to create directory',
            status: 500,
        };
    }

    try {
        await writeFile(absolutePath, buffer)
    } catch (error) {
        console.log(error)
        return {
            success: false,
            path: '',
            error: 'Failed to write file',
            status: 500,
        };
    }

    const fileUrl = `/uploads/${file.name}`;

    return {
        success: true,
        path: fileUrl,
        error: '',
        status: 200,
    }
};

export const uploadImage = async (formData: FormData) => {
    const rawFormData = {
        file: formData.get('file') as unknown as File | null,
    }

    const { file } = rawFormData

    if (!file) return {
        success: false,
        path: '',
        error: 'No file selected',
        status: 400,
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const type = await fileTypeFromBuffer(buffer);
    if (!type || !['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(type.mime)) {
        return {
            success: false,
            path: '',
            error: 'Invalid file type',
            status: 400,
        };
    }

    const relativePath = path.join('public', 'uploads', file.name);
    const absolutePath = path.resolve(process.cwd(), relativePath);

    const dir = path.dirname(absolutePath)

    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            path: '',
            error: 'Failed to create directory',
            status: 500,
        };
    }

    try {
        await writeFile(absolutePath, buffer)
    } catch (error) {
        console.log(error)
        return {
            success: false,
            path: '',
            error: 'Failed to write file',
            status: 500,
        };
    }

    const fileUrl = `/uploads/${file.name}`;

    return {
        success: true,
        path: fileUrl,
        error: '',
        status: 200,
    }
};