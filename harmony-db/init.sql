CREATE TABLE "user" (
    user_id SERIAL UNIQUE PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    created_on TIMESTAMP NOT NULL,
    active BOOLEAN
);
CREATE TABLE "artist" (
    PRIMARY KEY (user_id),
    artist_name VARCHAR(50) NOT NULL,
    artist_alias VARCHAR(150)
) INHERITS ("user");

CREATE TABLE "post" (
    post_id SERIAL UNIQUE PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(75) NOT NULL,
    post_time TIMESTAMP NOT NULL
);

CREATE TABLE "poll" (
    PRIMARY KEY (post_id)
--Empty because the "poll-option" table can only refer to "poll"s
) INHERITS (post);

CREATE TABLE "poll_option" (
    poll_id INT NOT NULL,
    option VARCHAR(25) NOT NULL,
    CONSTRAINT poll_fk
                        FOREIGN KEY (poll_id)
                                    REFERENCES poll(post_id)
);


CREATE TABLE "discussion" (
    PRIMARY KEY (post_id),
    content VARCHAR(255) NOT NULL
) INHERITS (post);

CREATE TABLE "review" (
    PRIMARY KEY (post_id),
    stars NUMERIC NOT NULL,
    content VARCHAR(255) NOT NULL
) INHERITS (post);

CREATE TABLE "follows" (
    following_id INT NOT NULL,
    follower_id INT NOT NULL,
    follow_time TIMESTAMP NOT NULL,
    PRIMARY KEY (following_id,follower_id),
    CONSTRAINT following_fk
                       FOREIGN KEY (following_id)
                            REFERENCES "user"(user_id),
    CONSTRAINT follower_fk
                       FOREIGN KEY (follower_id)
                            REFERENCES "user"(user_id)
);

CREATE TABLE "likes" (
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    PRIMARY KEY (user_id,post_id),
    CONSTRAINT likes_user_fk
                     FOREIGN KEY (user_id)
                            REFERENCES "user"(user_id),
    CONSTRAINT  likes_post_fk
                     FOREIGN KEY (post_id)
                            REFERENCES "post"(post_id)
);

CREATE TABLE "comment" (
    comment_id SERIAL UNIQUE PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    content VARCHAR(255),
    CONSTRAINT comment_user_fk
                    FOREIGN KEY (user_id)
                            REFERENCES "user"(user_id),
    CONSTRAINT comment_post_fk
                    FOREIGN KEY (post_id)
                            REFERENCES "post"(post_id)
);

CREATE TABLE "album" (
    album_id SERIAL UNIQUE PRIMARY KEY,
    album_name VARCHAR(50) NOT NULL,
    album_description VARCHAR(255)
);

CREATE TABLE "publish" (
    album_id INT NOT NULL,
    artist_id INT NOT NULL,
    CONSTRAINT publish_album_fk
                       FOREIGN KEY (album_id)
                                REFERENCES "album"(album_id),
    CONSTRAINT publish_artist_fk
                       FOREIGN KEY (artist_id)
                                REFERENCES "artist"(user_id)
);

CREATE TABLE "song" (
    song_id SERIAL UNIQUE PRIMARY KEY,
    artist_id INT NOT NULL, --This is just the artists user ID
    song_name VARCHAR(75) NOT NULL,
    song_description VARCHAR(255),
    release_time TIMESTAMP,
    album_id INT,
    CONSTRAINT song_artist_fk
                    FOREIGN KEY (artist_id)
                                REFERENCES "artist"(user_id),
    CONSTRAINT song_album_fk
                    FOREIGN KEY (album_id)
                                REFERENCES "album"(album_id)
);

CREATE TABLE "relate_to" ( --This is an abstract table. Do not create it.
    post_id INT NOT NULL,
    CONSTRAINT post_fk
                         FOREIGN KEY (post_id)
                                    REFERENCES "post"(post_id)
);

CREATE TABLE "relate_song" (
    song_id INT NOT NULL,
    PRIMARY KEY (post_id,song_id),
    CONSTRAINT relate_fk
                           FOREIGN KEY (song_id)
                                        REFERENCES "song"("song_id")
) INHERITS ("relate_to");

CREATE TABLE "relate_album" (
    album_id INT NOT NULL,
    PRIMARY KEY (post_id,album_id),
    CONSTRAINT relate_fk
                            FOREIGN KEY (album_id)
                                        REFERENCES "album"("album_id")
) INHERITS ("relate_to");

CREATE TABLE "relate_artist" (
    artist_id INT NOT NULL,
    PRIMARY KEY (post_id,artist_id),
    CONSTRAINT relate_fk
                             FOREIGN KEY (artist_id)
                                        REFERENCES "artist"(user_id)
) INHERITS ("relate_to");

--End tables

--Just some test data. Will get a good amount of data from MusicBrainz later

INSERT INTO "user"(username, password, created_on, active)
VALUES ('testinguser1','securepassword',CURRENT_TIMESTAMP,FALSE);

INSERT INTO "artist"(username, password, created_on, active, artist_name, artist_alias)
VALUES ('testinguser2','12345',CURRENT_TIMESTAMP,FALSE,'SingerMan',NULL);

INSERT INTO "song"(artist_id, song_name, song_description, release_time, album_id)
VALUES (2,'Best Song','Best Song to Exist',CURRENT_TIMESTAMP,NULL);

INSERT INTO "discussion"(user_id, title, post_time, content)
VALUES (1,'New post who dis',CURRENT_TIMESTAMP,'Any other people on Harmony?');

INSERT INTO "relate_song"(post_id, song_id)
VALUES (1,1);

