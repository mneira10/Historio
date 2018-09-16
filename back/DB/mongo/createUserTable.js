print("--------------------------");
print("current dbs:");
show dbs;
print("--------------------------");
print("We will be using narrario as db:")
use narrario;
print("--------------------------");
print("Creating user collection...")
// pass: qwerty1234
db.users.insertOne(
    { username: "testUser", salt: "aeCae9ciha", hash: "f0fe89b65ae912f42610e04452ecb9b31bed4ef6"}
 )
print("Created user collection.")
show collections
print("--------------------------");
print("Done.")