import { Song } from '@/drizzle/schema';
import { create } from 'zustand';

interface AudioPlayerState {
    isOpen: boolean;
    isMinimized: boolean;
    isCollapsed: boolean;
    playlist: Song[];
    currentMusicIndex: number;
    openPlayer: (index: number) => void;
    closePlayer: () => void;
    minimizePlayer: () => void;
    collapsePlayer: () => void;
    addToPlaylist: (song: Song) => void;
    purgePlaylist: () => void;
    nextSong: () => void;
    previousSong: () => void;
    setIsOpen: (isOpen: boolean) => void;
    setIsMinimized: (isMinimized: boolean) => void;
    setIsCollapsed: (isCollapsed: boolean) => void;
    setCurrentMusicIndex: (index: number) => void;
}

export const useAudioPlayerStore = create<AudioPlayerState>((set, get) => ({
    isOpen: false,
    isMinimized: false,
    isCollapsed: false,
    playlist: [],
    currentMusicIndex: 0,
    openPlayer: (index: number) =>
        set({
            isOpen: true,
            isMinimized: false,
            currentMusicIndex: index,
        }),
    closePlayer: () =>
        set({
            isOpen: false,
        }),
    minimizePlayer: () =>
        set((state) => ({
            isMinimized: !state.isMinimized,
        })),
    collapsePlayer: () =>
        set((state) => ({
            isCollapsed: !state.isCollapsed,
        })),
    addToPlaylist: (song: Song) =>
        set((state) => ({
            playlist: [...state.playlist, song],
        })),
    purgePlaylist: () =>
        set((state) => ({
            playlist: [],
        })),
    nextSong: () =>
        set((state) => ({
            currentMusicIndex: state.currentMusicIndex < state.playlist.length - 1 ? state.currentMusicIndex + 1 : 0,
        })),
    previousSong: () =>
        set((state) => ({
            currentMusicIndex: state.currentMusicIndex === 0 ? state.playlist.length - 1 : state.currentMusicIndex - 1,
        })),
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
    setIsMinimized: (isMinimized: boolean) => set({ isMinimized }),
    setIsCollapsed: (isCollapsed: boolean) => set({ isCollapsed }),
    setCurrentMusicIndex: (index: number) => set({ currentMusicIndex: index }),
}));