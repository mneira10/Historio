:BEGIN

MATCH (n)
DETACH DELETE n

:COMMIT
:BEGIN
CREATE CONSTRAINT ON (story:Story) ASSERT exists(story.title)
CREATE CONSTRAINT ON (story:Story) ASSERT exists(story.text)
CREATE CONSTRAINT ON (story:Story) ASSERT exists(story.modifiability)
CREATE CONSTRAINT ON (story:Story) ASSERT exists(story.date)

CREATE CONSTRAINT ON (author:Author) ASSERT (author.username) IS NODE KEY
CREATE CONSTRAINT ON (author:Author) ASSERT exists(author.about_writing)
CREATE CONSTRAINT ON (author:Author) ASSERT exists(author.birth)

CREATE CONSTRAINT ON ()-[rating:Rating]-()  ASSERT exists(rating.rating)

CREATE CONSTRAINT ON (tag:Tag) ASSERT (tag.name) IS NODE KEY

CREATE INDEX ON :Story (titulo)
;
:COMMIT