DROP TABLE songs;

CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL
);

INSERT INTO songs (id, song_title, notes) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4'),
(2, 'Twinkle, Twinkle, Little Star', 'C4 C4 G4 G4 A4 A4 G4 _ F4 F4 E4 E4 D4 D4 C4'),
(3, 'Happy Birthday', 'C4 C4 D4 C4 F4 E4 C4 C4 D4 C4 G4 F4'),
(4, 'Mary Had a Little Lamb', 'E4 D4 C4 D4 E4 E4 E4 _ D4 D4 D4 _ E4 E4 E4 _ E4 D4 C4 D4 E4 E4 E4 C4 D4 D4 E4 D4 C4');;


