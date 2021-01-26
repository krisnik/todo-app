# Basic Concepts

## Mongo DB

- A document database designed for ease of development and scalability. 
  
## Database

`Database` is a physical container for a set of collections. Each database is saved onto the file system in a separate file. 

## Collection

- `Collection` is a collection of multiple Mongo Documents. Equivalent to a table in SQL / RDBMS systems. 
- Does not enforce a schema unlike SQL table. 

## Document

- Collection of multiple key value pairs. Equivalent to a `row` in regular SQL table. 

Basic differences between regular SQL and Mongo terminology 
| RDBMS | MongoDB |
| ---   | ---   | 
| Database | Database | 
| Table | Collection | 
| Tuple/Row | Document | 
| Column | Field | 
| Primary Key (User defined) | Primary Key (Default key _id provided by MongoDB itself)

> _id is a 12 bytes hexadecimal number which assures the uniqueness of every document.

#### Advantages of using a JSON structure

- Documents (i.e. objects) correspond to native data types in many programming languages.
- Embedded documents and arrays reduce need for expensive joins.
- Dynamic schema.

### Sample document

```javascript
{
	"_id": ObjectId("600d4616ab4f1e7fd872b6f7"),
	"title": "Mongo Shell",
	"desc": "Complete the setup for Mongo Shell",
	"reminder": false,
	"tasks": {
		"list": ["installation", "documentation"],
		"progress": 50
	}
}

```

## Benefits of MongoDB over SQL

- Ease of scaling
  - MongoDB scales horizontally. Its lot easier to add a new node to the existing DB cluster. 
- No fixed schema
- Maintainability 
  - When a new shard is added to the cluster, the data gets distributed accordingly without any manual intervention.
- Low latency
  - Lack of rollbacks and joins support make the queries take less CPU time.

Sample usecase - Managing content metadata, user management systems, systems that handle big and complex data.  

## Other features of MongoDB

- Queries support wide range of functionalities. 
- Indexing 
- Data replication
  - A master can perform Reads and Writes and a Slave copies data from the master and can only be used for reads or back up. 
  - The built in replication support augurs well for *high availability*. 
- Load balancing
  - Supports automatic load balancing when shards are added / removed. 
  
## When not to use MongoDB

- Strong ACID guarantees.
  - MongoDB allows for duplicate data to be stored, inconsistent reads, and even data loss.
- Multi Object transactions. 
  - MongoDB does not support transactional support across multiple collections. Hence it does not suit well for banking or reservation systems. 
- Stored Procedures support
  - MongoDB does not support stored procedures. 
- Ease of migration
  - No SQL databases do not follow a specification. So, it will be hard to migrate to different NoSQL solution in future.

## Choosing right database

CAP Theorem - Consistency, Availability and Partition Tolerance

CA - RDBMS

CP - MongoDB, HBase

AP - Cassandra, Couch DB