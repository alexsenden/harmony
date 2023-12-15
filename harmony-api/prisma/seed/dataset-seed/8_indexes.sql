create index artist_name_text_pattern_ops_idx on artist(artist_name text_pattern_ops);
cluster artist using artist_name_text_pattern_ops_idx;

create index album_name_text_pattern_ops_idx on album(album_name text_pattern_ops);
cluster album using album_name_text_pattern_ops_idx;

create index song_name_text_pattern_ops_idx on song(song_name text_pattern_ops);
cluster song using song_name_text_pattern_ops_idx;