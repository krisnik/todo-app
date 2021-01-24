# CRUD Operations

## Insert 
[Documentation](https://docs.mongodb.com/manual/tutorial/insert-documents/)

To create a new record, insert methods are used. The basic syntax of the method is 

```javascript
db.collection.insertOne(
   <document>,
   {
      writeConcern: { w: <value>, j: <boolean>, wtimeout: <number> }
   }
)
```

Other alternate methods that are available are `insertMany` and `insert`. 

Example

```javascript

// Creates a new todo note. 
db.todo.insertOne(
    {
        "title": "Mongo Shell",
        "desc": "Complete the setup for Mongo Shell",
        "reminder": false,
        "tasks": {
            "list": ["installation", "documentation"],
            "progress": 50
        }
    }
)
```


To retrieve data from the Mongo DB, query methods are used. The basic syntax of the method is

```javascript
db.collection.find(query, projection)
```

Sample queries

```javascript
// SELECT * from todo;
db.todo.find();

// SELECT * from todo where reminder == false;
db.todo.find({"reminder": false});
```

### Query Conditionals
[Documentation](https://docs.mongodb.com/manual/reference/operator/query/#query-selectors)

- Comparitive conditions such as $eq, $gt, $lte, $in, $ne etc.
- Logical conditions such as $and, $or etc.
- Conditions on the elements present in the document - $exists, $type

### Nested Queries

```javascript

// Creates a new todo note. 
db.todo.insertMany([
    {
        "title": "Mongo Databases",
        "desc": "Complete the basics of Mongo Databases",
        "reminder": false,
        "tasks": {
            "list": ["documentation", "basic commands"],
            "progress": 50
        }
    },
    {
        "title": "Mongo CRUD",
        "desc": "Complete the CRUD Operations for Mongo",
        "reminder": false,
        "tasks": {
            "list": ["documentation", "insert", "query", "update", "delete", "bulk write"],
            "progress": 60
        }
    }
])

// Nested Query
db.todo.find({"tasks.progress": { $gt: 55 }}) // Returns all the tasks whose progress is greater than 55
```

### Query on Array fields

```javascript
db.todo.find({ "tasks.list": ["documentation", "basic commands"] } ) // Query exact match for the array field. 

db.todo.find({"tasks.list": "documentation"}) // Query returns all the tasks which contain task "documentation".

db.todo.find({"tasks.list.1": "documentation"}) // Query returns all tasks which contain task "documentation" at index 1.
```

### Field Projections

By default all the fields in the document are projected as part of the query response. 

```javascript

// Prints all the fields in the todo document
db.todo.find({"reminder": false});

// Explicity include specified columns. Toggle the column by providing the value as 1. 
db.todo.find({"reminder": false}, { title: 1, tasks: 1 })

// Supress a _id field by providing value as 0. Only _id can be excluded when inclusion projection is provided. 
db.todo.find({"reminder": false}, { title: 1, tasks: 1, _id: 0})

// Explicity exclude specified columns. Toggle the column by providing the value as 0.
db.todo.find({"reminder": false}, { desc: 0})
```

### Query Null or Missing Fields

```javascript

// Create a new todo with additional field called "tags". 
// The existing records won't have this field. 
db.todo.insertOne(
    {
        "title": "Mongo Collections",
        "desc": "Complete the basics for Mongo Collections",
        "reminder": false,
        "tasks": {
            "list": ["documentation", "basic commands"],
            "progress": 50
        },
        "tags": ["mongo", "db"]
    }
)

db.todo.find({ tags: null})
```

### Queries based on Type Check

The value type of various fields are categoriezed into different Binary Serialization formats. Read [BSON Types](https://docs.mongodb.com/manual/reference/bson-types/)

```javascript
// Create a new todo with field called "tags" having "string" value. 
db.todo.insertOne(
    {
        "title": "Mongo DB Key features",
        "desc": "Understand Key Features of Mongo DB",
        "reminder": false,
        "tasks": {
            "list": ["documentation"],
            "progress": 0
        },
        "tags": "mongodb"
    }
)

// Query todo notes whose tags type is Array
db.todo.find( { tags : { $type: 4 } } )

// Query todo notes whose tags type is String
db.todo.find( { tags : { $type: 2 } } )
```

### Queries based on existence checks on particular field. 

```javascript

// Query all todo notes without tags. 
db.todo.find({ tags : { $exists: false }})

// Query all the todo notes with tags
db.todo.find({ tags : { $exists: true }})
```

### Cursor

The find method returns a Cursor which can be iterated using basic `while` and `forEach` loops. 

```javascript
var myCursor = db.todo.find( { tags: { $exists: false } } );

while (myCursor.hasNext()) {
   print(tojson(myCursor.next()));
}
```

## Update
[Documentation](https://docs.mongodb.com/manual/tutorial/update-documents/)

Syntax

```javascript
db.collection.updateOne(
   <filter>, // Filter same as "find" method
   <update>, // Values to update
   {
     upsert: <boolean>,
     writeConcern: <document>,
     collation: <document>, // Collation allows users to specify language-specific rules for string comparison, such as rules for lettercase and accent marks.
     ...
   }
)
```

Sample queries

```javascript
// Following command updates a Mongo Document

db.todo.updateOne({ "title": "Mongo CRUD"},{ 
    $set : {
        "tags": ["mongo", "crud", "databases"]}
    }
)

// Following command replaces a mongo document.
db.todo.replaceOne({ "title": "Mongo DB Key features"},
    {
        "title": "Mongo DB Key features",
        "desc": "Understand Key Features of Mongo DB",
        "reminder": false,
        "tasks": {
            "list": ["documentation"],
            "progress": 10
        },
        "tags": ["mongo", "databases", "features"]
    }
)

```

### Upsert

Both Update and Replace document can be done using "upsert" flag. This flag creates a new document, if intended document does not exist. 

```javascript
db.todo.replaceOne({ "title": "Introduction to MongoDB"},
    {
        "title": "Introduction to MongoDB",
        "desc": "Getting started with Mongo DB",
        "reminder": false,
        "tasks": {
            "list": ["documentation"],
            "progress": 10
        },
        "tags": ["mongo"]
    },
    {"upsert": true}
)
```

## Deletion
[Documentation](https://docs.mongodb.com/manual/core/bulk-write-operations/)

```javascript
// Following command deletes the todo whose title is Introduction to MongoDB
db.todo.deleteOne( {title: "Introduction to MongoDB" } )
```

## Bulk Writes  

- Ordered - Operations are executed sequentially. An error will abort the Bulk Operation. Default option. 
- Unordered - Operations are executed in parallel. An error will not hamper the on going process. 

Supported operations - insertOne, updateOne, updateMany, replaceOne, deleteOne, deleteMany

```javascript
db.todo.bulkWrite(
	[{
			"insertOne": {
				"document": {
					"title": "Introduction to MongoDB",
					"desc": "Getting started with Mongo DB",
					"reminder": false,
					"tasks": {
						"list": ["documentation"],
						"progress": 10
					},
					"tags": ["mongo"]
				}
			}
		},
		{
			"updateOne": {
				"filter": {
					"title": "Mongo CRUD"
				},
				"update": {
					$set: {
						"tags": ["mongo", "crud", "databases", "features"]
					}
				},
				"upsert": true
			}
		}
	]
)
```

## Text Search

MongoDB supports query operations that perform a text search of string content. 
To perform text search, MongoDB uses a `text` index and the `$text` operator.

```javascript
// To create a text index run the command 
db.todo.createIndex( { title: "text", desc: "text" } )

// Using $text operator
db.todo.find( { $text: { $search: "Introduction" }} )
```

## Indexes

Indexes support the efficient execution of queries in MongoDB without which, it must perform entire collection scan. 

### Types of indexes

- Default _id index - Unique value index created on primary key
- Single field index - Index that is created on a individual field. 
- Compound index - Index created on multiple fields. The order in which fields are ordered while creating the index are followed while querying the data.
- Multikey index - Index is created on Array type fields. 
- Text index - Index is created on String type fields to enable text search on such fields. 
- Hashed index - Index that is used for hashing purposes. The hash value of the field identifies the shard to which data has to be stored. 
