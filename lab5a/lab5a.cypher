//Your Neo4j code goes here



CREATE (ee:Person { name: "a", born: 1000, married: 1030, type: "son" })
;


MATCH (ee:Person) WHERE ee.name = "a"
CREATE (b:Person { name: "b", born: 1001, married: 1030, type: "son"}),
(c:Person { name: "c", born: 950, type: "mother" }),
(d:Person { name: "d", born: 951, type: "father" }),
(e:Person { name: "e", born: 1005, type: "son" }),
(f:Person { name: "f", born: 1003, type: "son" }),
(g:Person { name: "g", born: 1004, type: "son" }),
(h:Person { name: "h", born: 1005, type: "son" }),
(c)-[:KNOWS {since: 960 }]->(d),(ee)-[:SPOUSE]->(b),
(c)-[:PARENT {type: "mother"}]->(b),(b)-[:CHILD {type:"son"}]->(c),
(d)-[:PARENT {type: "father"}]->(b),(b)-[:CHILD {type:"son"}]->(d),
(b)-[:BROTHER]->(e),(e)-[:BROTHER]->(f),
(f)-[:BROTHER]->(g),(g)-[:BROTHER]->(h),
(ee)-[:BROTHER]->(e),(ee)-[:BROTHER]->(f),(ee)-[:BROTHER]->(g),(ee)-[:BROTHER]->(h),
(e)-[:BROTHER]->(f),(e)-[:BROTHER]->(g),(e)-[:BROTHER]->(h),
(f)-[:BROTHER]->(g),(f)-[:BROTHER]->(h),(g)-[:BROTHER]->(h),
(c)-[:PARENT {type: "mother"}]->(e),(c)-[:PARENT {type: "mother"}]->(f),(c)-[:PARENT {type: "mother"}]->(g),
(c)-[:PARENT {type: "mother"}]->(h),(d)-[:PARENT {type: "father"}]->(e),(d)-[:PARENT {type: "father"}]->(f),
(d)-[:PARENT {type: "father"}]->(g),(d)-[:PARENT {type: "father"}]->(h)

;

MATCH (ee:Person)-[:BROTHER]-(brothers)
WHERE ee.name = "a" RETURN ee, brothers


;
