# taskboard
Simple task manager, loosely inspired by Kanban.

I wrote this for myself to use, be aware that it does not offer any
form of authentication or user management. You should probably only
run it on localhost or use external authentication mechanisms such as
those most probably provided by your http server.

## Features
taskboard allows you to organize your tasks with aset of *bins*, between
which you can freely move them by drag-and-drop.

Different *boards* (all with the same set of *bins*) may be used
to keep track of tasks within different contexts.
Boards can be shown in combination with eachother by **shift-clicking**
their selectors.

## Setup
* Make sure you have the SQLite3 PDO driver for PHP installed
* Clone the repo into a directory served by your http daemon
* Make sure the user running the httpd has read and write access to both the database file and the folder containing it
* Edit the database path in `api/db_conn.php` to match your setup

## Configuration
As of now, configuring taskboard requires you to interact directly
with the sqlite database storing the data. To create a new board, run 

`INSERT INTO sections (section_name) VALUES ('YOUR NEW BOARDS NAME');`

To create a new bin, run 

`INSERT INTO bins (bin_name) VALUES ('YOUR NEW BINS NAME');`

## Implementation
**taskboard** was written in plain HTML/CSS/JavaScript and a PHP5/SQLite3 backend,
without using any fancy frameworks.
