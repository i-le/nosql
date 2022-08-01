curl -v -X PUT http://riak:8098/riak/movies/IronMan -H "Content-Type: application/json" -d '{"releasedate" : "2008", "runningtime" : "2:15", "genre" : "action"}';
curl -v -X PUT http://riak:8098/riak/movies/NearDark -H "Content-Type: application/json" -d '{"releasedate" : "1987", "runningtime" : "2:35", "genre" : "horror"}';
curl -v -X PUT http://riak:8098/riak/movies/Spartacus -H "Content-Type: application/json" -d '{"releasedate" : "1960", "runningtime" : "1:45", "genre" : "historical"}';
curl -v -X PUT http://riak:8098/riak/movies/Eraserhead -H "Content-Type: application/json" -d '{"releasedate" : "1977", "runningtime" : "4:15", "genre" : "experimental"}';
curl -v -X PUT http://riak:8098/riak/movies/TheMonkeyKing -H "Content-Type: application/json" -d '{"releasedate" : "2013", "runningtime" : "1:15", "genre" : "anime"}';
curl -v -X PUT http://riak:8098/riak/movies/Commando -H "Content-Type: application/json" -d '{"releasedate" : "1985", "runningtime" : "2:30", "genre" : "action"}';

curl -i -X DELETE http://riak:8098/riak/movies/TheMonkeyKing;

curl -X PUT http://riak:8098/riak/branches/East -H "Content-Type: application/json" -H "Link:</riak/movies/IronMan>; riaktag=\"holds\", </riak/movies/NearDark>; riaktag=\"holds\"" -d '{"branches" : East}';
curl -X PUT http://riak:8098/riak/branches/Wast -H "Content-Type: application/json" -H "Link:</riak/movies/Spartacus>; riaktag=\"holds\", </riak/movies/IronMan>; riaktag=\"holds\"" -d '{"branches" : Wast}';
curl -X PUT http://riak:8098/riak/branches/South -H "Content-Type: application/json" -H "Link:</riak/movies/Commando>; riaktag=\"holds\"" -d '{"branches" : South}';

curl -X PUT http://riak:8098/riak/photos/commando.jpeg -H "Content-Type: image/json" -H "Link:</riak/movies/Commando>; riaktag=\"photo\"" --data-binary @commando.jpeg;

curl -X GET http://riak:8098/riak?buckets=true;

curl http://riak:8098/riak/branches/East/_,_,_;
curl http://riak:8098/riak/branches/Wast/_,_,_;
curl http://riak:8098/riak/branches/South/_,_,_;

curl http://riak:8098/riak/branches/South/_,photo,_;