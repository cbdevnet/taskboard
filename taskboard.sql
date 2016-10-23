PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE [bins] ([bin_id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE CHECK (bin_id != -1), [bin_name] TEXT NOT NULL);
INSERT INTO "bins" VALUES(1,'INCOMING');
INSERT INTO "bins" VALUES(2,'TODAY');
INSERT INTO "bins" VALUES(3,'THIS WEEK');
INSERT INTO "bins" VALUES(4,'THIS MONTH');
INSERT INTO "bins" VALUES(5,'THIS YEAR');
INSERT INTO "bins" VALUES(6,'SOMETIME');
INSERT INTO "bins" VALUES(7,'DONE');
CREATE TABLE [sections] ([section_id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, [section_name] TEXT NOT NULL);
CREATE TABLE [items] ([item_id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, [item_name] TEXT NOT NULL, [item_text] TEXT, [item_bin] INTEGER NOT NULL REFERENCES [bins] ([bin_id]) ON UPDATE CASCADE ON DELETE SET NULL, [item_section] INTEGER DEFAULT(0) REFERENCES [sections] ([section_id]) ON UPDATE CASCADE ON DELETE CASCADE);
COMMIT;
