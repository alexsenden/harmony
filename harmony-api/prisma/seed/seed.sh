#!/bin/sh
set -ex

DB_CONNECTION_STRING="postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$DB_HOST:$POSTGRES_PORT/$POSTGRES_DB_NAME"

psql $DB_CONNECTION_STRING -f ./prisma/seed/dataset-seed/1_artist.sql
psql $DB_CONNECTION_STRING -f ./prisma/seed/dataset-seed/2_artist_alias.sql
psql $DB_CONNECTION_STRING -f ./prisma/seed/dataset-seed/3_artist_credit.sql
psql $DB_CONNECTION_STRING -f ./prisma/seed/dataset-seed/4_artist_credit_relation.sql
psql $DB_CONNECTION_STRING -f ./prisma/seed/dataset-seed/5_album.sql
psql $DB_CONNECTION_STRING -f ./prisma/seed/dataset-seed/6_song.sql
psql $DB_CONNECTION_STRING -f ./prisma/seed/dataset-seed/7_track.sql
psql $DB_CONNECTION_STRING -f ./prisma/seed/dataset-seed/8_indexes.sql
