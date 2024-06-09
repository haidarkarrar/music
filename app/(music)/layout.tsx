import Image from 'next/image'
import React from 'react'
import { Sidebar } from './_components/sidebar'
import { playlists } from './_data/playlists'
import GlobalAudioPlayer from '@/components/custom/global-audio-player'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <GlobalAudioPlayer />
            <>
                <div className="md:hidden">
                    <Image
                        src="/examples/music-light.png"
                        width={1280}
                        height={1114}
                        alt="Music"
                        className="block dark:hidden"
                    />
                    <Image
                        src="/examples/music-dark.png"
                        width={1280}
                        height={1114}
                        alt="Music"
                        className="hidden dark:block"
                    />
                </div>
                <div className="hidden md:block">
                    {/* <Menu /> */}
                    <div className="border-t">
                        <div className="bg-background">
                            <div className="grid lg:grid-cols-5">
                                <Sidebar playlists={playlists} className="hidden lg:block" />
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

export default layout