CREATE TABLE `comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`text` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
