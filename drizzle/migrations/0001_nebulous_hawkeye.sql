ALTER TABLE `songs` DROP FOREIGN KEY `songs_album_id_albums_id_fk`;
--> statement-breakpoint
ALTER TABLE `songs` DROP FOREIGN KEY `songs_artist_id_artists_id_fk`;
--> statement-breakpoint
ALTER TABLE `songs` MODIFY COLUMN `album_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `songs` MODIFY COLUMN `artist_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `songs` ADD `songUrl` text;--> statement-breakpoint
ALTER TABLE `songs` ADD CONSTRAINT `songs_album_id_albums_id_fk` FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `songs` ADD CONSTRAINT `songs_artist_id_artists_id_fk` FOREIGN KEY (`artist_id`) REFERENCES `artists`(`id`) ON DELETE cascade ON UPDATE no action;