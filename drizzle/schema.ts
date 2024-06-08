import { relations } from "drizzle-orm"
import { int, mysqlTable, text, varchar, } from "drizzle-orm/mysql-core"

export const songs = mysqlTable("songs", {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    image: text('image'),
    songUrl: text('songUrl'),
    albumId: int('album_id').references(() => albums.id, { onDelete: "cascade" }).notNull(),
    artistId: int('artist_id').references(() => artists.id, { onDelete: "cascade" }).notNull(),
})

export const songsRelation = relations(songs, ({ one }) => ({
    album: one(albums, {
        fields: [songs.albumId],
        references: [albums.id],
    }),
    artist: one(artists, {
        fields: [songs.artistId],
        references: [artists.id],
    }),
}))

export const albums = mysqlTable("albums", {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    image: text('image'),
    artistId: int('artist_id').references(() => artists.id),
})

export const albumsRelation = relations(albums, ({ many, one }) => ({
    songs: many(songs),
    artist: one(artists, {
        fields: [albums.artistId],
        references: [artists.id],
    }),
}))

export const artists = mysqlTable("artists", {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    image: text('image'),
})

export const artistsRelation = relations(artists, ({ many }) => ({
    albums: many(albums),
    songs: many(songs),
}))


export type Song = typeof songs.$inferSelect
export type Album = typeof albums.$inferSelect
export type Artist = typeof artists.$inferSelect