/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('aruba-catalog');

// Search for documents in the current collection.
db.getCollection('catalog_products')
.aggregate([
    {
        $group: {
            _id: "$resourcecategory",
            count: { $sum: 1 }
        }
    }
])
  .find(
    {
      /*
      * Filter
      * fieldA: value or expression
      */
    },
    {
      /*
      * Projection
      * _id: 0, // exclude _id
      * fieldA: 1 // include field
      */
    }
  );
