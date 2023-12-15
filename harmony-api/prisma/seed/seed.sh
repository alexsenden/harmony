#!/bin/sh
set -ex

psql $POSTGRES_URL -f ./prisma/seed/dataset-seed/1_artist.sql
psql $POSTGRES_URL -f ./prisma/seed/dataset-seed/2_artist_alias.sql
psql $POSTGRES_URL -f ./prisma/seed/dataset-seed/3_artist_credit.sql
psql $POSTGRES_URL -f ./prisma/seed/dataset-seed/4_artist_credit_relation.sql
psql $POSTGRES_URL -f ./prisma/seed/dataset-seed/5_album.sql
psql $POSTGRES_URL -f ./prisma/seed/dataset-seed/6_song.sql
psql $POSTGRES_URL -f ./prisma/seed/dataset-seed/7_track.sql
psql $POSTGRES_URL -f ./prisma/seed/dataset-seed/8_indexes.sql
