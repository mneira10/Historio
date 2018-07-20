:begin

DROP CONSTRAINT ON (story:Story) ASSERT exists(story.title)

DROP CONSTRAINT ON (story:Story) ASSERT exists(story.text)

DROP CONSTRAINT ON (story:Story) ASSERT exists(story.modifiability)

DROP CONSTRAINT ON (story:Story) ASSERT exists(story.date)
DROP CONSTRAINT ON (author:Author) ASSERT (author.username) IS NODE KEY
DROP CONSTRAINT ON (author:Author) ASSERT exists(author.about_writing)

DROP CONSTRAINT ON (author:Author) ASSERT exists(author.birth)

DROP CONSTRAINT ON () - [rating:Rating] - ()  ASSERT exists(rating.rating)
DROP CONSTRAINT ON (tag:Tag) ASSERT (tag.name) IS NODE KEY
DROP INDEX ON :Story (titulo)

MATCH (a)
DETACH DELETE a

:commit
