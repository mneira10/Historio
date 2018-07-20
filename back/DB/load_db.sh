echo "exec drop"
cat ./0_drop.cypher | cypher-shell -u neo4j -p Millonarios43va
echo "exec tags"
cat ./1_tags.cypher | cypher-shell -u neo4j -p Millonarios43va
echo "exec authors"
cat ./1_authors.cypher | cypher-shell -u neo4j -p Millonarios43va
echo "exec story"
cat ./1_story.cypher | cypher-shell -u neo4j -p Millonarios43va
