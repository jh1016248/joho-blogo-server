const  getUserAggregate = (match, target) => { // { articleId } ,'author'
  return [
      { $match: match },
      {
          $lookup: {
              from: 'users',
              let: { "newUserId": { "$toObjectId": `$${target}` } },
              pipeline: [
                  { "$match": { "$expr": { "$eq": [ "$_id", "$$newUserId" ] } } },
                  { "$project": { "_id": 1, "account": 1, 'name': 1, 'avatar': 1 }}
              ],
              as: 'user'
          },
      },
      {$unwind:'$user'}, //返回非数组对象
  ]
}

exports.getUserAggregate = getUserAggregate;