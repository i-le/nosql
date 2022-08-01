#!/usr/bin/env bash

#Add your curl statements here

curl -X PUT http://couchdb:5984/restaurants

curl -i -X POST "http://couchdb:5984/restaurants/" -H "Content-Type: application/json" -d '{ "_id":"a_a","name": "a a","food_type":["American","Mexican"],"phonenumber":1233211234,"website":"www.aa.com"}'
curl -i -X POST "http://couchdb:5984/restaurants/" -H "Content-Type: application/json" -d '{ "_id":"b_b","name": "b b","food_type":["Chinese","Thai"],"phonenumber":1233212345,"website":"www.bb.com"}'
curl -i -X POST "http://couchdb:5984/restaurants/" -H "Content-Type: application/json" -d '{ "_id":"c_c","name": "c c","food_type":["Korean","Germen"],"phonenumber":1233213456,"website":"www.cc.com"}'

#DO NOT REMOVE
curl -Ssf -X PUT http://couchdb:5984/restaurants/_design/docs -H "Content-Type: application/json" -d '{"views": {"all": {"map": "function(doc) {emit(doc._id, {rev:doc._rev, name:doc.name, food_type:doc.food_type, phonenumber:doc.phonenumber, website:doc.website})}"}}}'
curl -Ssf -X GET http://couchdb:5984/restaurants/_design/docs/_view/all
