চমৎকার! তুমি জানতে চাচ্ছো MongoDB-এর কিছু core operations:

# 1. Insert, insertOne, find, findOne, field filtering




> `insert`, `insertOne`, `find`, `findOne`, এবং **field filtering**
> আমি নিচে সবগুলোর সংক্ষিপ্ত ও সহজ ব্যাখ্যা দিচ্ছি বাংলা-English mix এ ✅

---

## 🔸 `insertOne()` – এক ডকুমেন্ট ইনসার্ট

```js
db.users.insertOne({
  name: "Irfan",
  age: 26,
  city: "Dhaka"
});
```

🟢 Output:

```json
{ acknowledged: true, insertedId: ObjectId("...") }
```

---

## 🔸 `insertMany()` – একাধিক ডকুমেন্ট ইনসার্ট

```js
db.users.insertMany([
  { name: "Arafat", age: 30 },
  { name: "Sadia", age: 25 }
]);
```

🟢 একসাথে একাধিক data insert করতে insertMany() use হয়।

---

## 🔍 `find()` – এক বা একাধিক ডেটা খুঁজে বের করে (Array আকারে)

```js
db.users.find({ age: { $gt: 25 } });
```

🟡 Output: cursor/array of matched documents

---

## 🔍 `findOne()` – শুধুমাত্র প্রথম ম্যাচ হওয়া ডকুমেন্ট রিটার্ন করে

```js
db.users.findOne({ name: "Irfan" });
```

🟢 Just one document. Very useful when expecting one result only.

---

## 🔎 Field Filtering / Projection

### ✅ কেবল নির্দিষ্ট ফিল্ড দেখতে:

```js
db.users.find({}, { name: 1, _id: 0 });
```

📌 এটা শুধু `name` ফিল্ড দেখাবে, `_id` বাদ দিবে।

> ⚠️ Projection-এ `1` মানে দেখাও, `0` মানে বাদ দাও
> `_id` বাদ দিতে চাইলে আলাদাভাবে `_id: 0` দিতে হয়

---

## 🧪 Summary Table

| Operation      | কাজ                                |
| -------------- | ---------------------------------- |
| `insertOne()`  | একটি ডেটা ইনসার্ট                  |
| `insertMany()` | একাধিক ডেটা ইনসার্ট                |
| `find()`       | একাধিক ডেটা খোঁজা                  |
| `findOne()`    | প্রথম ম্যাচ হওয়া ডেটা              |
| Projection     | নির্দিষ্ট ফিল্ড গুলো দেখানো/লুকানো |

---

------------------------------------------------------------------------------------------------------

# 2. Explain : $eq, $neq, $gt, $lt, $gte, $lte 


MongoDB-তে **query operator** গুলো ব্যবহার হয় ডেটা ফিল্টার বা শর্ত দিয়ে খুঁজে বের করতে। তুমি যে গুলোর কথা বলেছো — `$eq`, `$ne`, `$gt`, `$lt`, `$gte`, `$lte` — এগুলো **comparison operators**।

---

## 🔍 ১. `$eq` → Equal (সমান)

```js
{ age: { $eq: 25 } }
```

➤ `age` ফিল্ডটি **২৫ এর সমান** হলে ডেটা রিটার্ন করবে।

---

## 🔍 ২. `$ne` → Not Equal (অসমান)

```js
{ status: { $ne: "active" } }
```

➤ `status` যদি **"active" না হয়**, তখন মিলে যাবে।

---

## 🔍 ৩. `$gt` → Greater Than (এর চেয়ে বড়)

```js
{ salary: { $gt: 50000 } }
```

➤ `salary` যদি **৫০,০০০ এর চেয়ে বেশি হয়**, সেইসব ডেটা রিটার্ন করবে।

---

## 🔍 ৪. `$lt` → Less Than (এর চেয়ে ছোট)

```js
{ age: { $lt: 18 } }
```

➤ `age` যদি **১৮ এর নিচে হয়**, তখন ডেটা রিটার্ন করবে।

---

## 🔍 ৫. `$gte` → Greater Than or Equal (এর চেয়ে বড় বা সমান)

```js
{ marks: { $gte: 80 } }
```

➤ `marks` যদি **৮০ বা তার বেশি হয়**।

---

## 🔍 ৬. `$lte` → Less Than or Equal (এর চেয়ে ছোট বা সমান)

```js
{ price: { $lte: 1000 } }
```

➤ `price` যদি **১০০০ বা তার কম হয়**।

---

### 🧠 উদাহরণ (Combining multiple conditions):

```js
db.products.find({
  price: { $gt: 500, $lte: 1000 }
})
```

➤ এমন সব প্রোডাক্ট দেখাবে যেগুলোর দাম **৫০০ টাকার বেশি এবং ১০০০ টাকার কম বা সমান**।

---

### 💡 টিপস:

| Operator | মানে                  | বাংলা       |
| -------- | --------------------- | ----------- |
| `$eq`    | Equal                 | সমান        |
| `$ne`    | Not Equal             | অসমান       |
| `$gt`    | Greater Than          | বড়          |
| `$lt`    | Less Than             | ছোট         |
| `$gte`   | Greater Than or Equal | বড় বা সমান  |
| `$lte`   | Less Than or Equal    | ছোট বা সমান |

---


----------------------------------------------------------------------------------------

#  3. Explain : $in, $nin, implicit and condition

তুমি জানতে চাচ্ছো MongoDB-এর `$in`, `$nin`, **implicit condition** এবং **condition structure** নিয়ে। নিচে সহজভাবে সব ব্যাখ্যা করছি বাংলা-English mix এ — যাতে মনে রাখা ও ব্যবহার করা দুটোই সহজ হয়:

---

## 🔷 1. `$in` — "এই list এর মধ্যে থাকলে"

```js
db.users.find({
  city: { $in: ["Dhaka", "Chittagong"] }
})
```

👉 `city` যদি `"Dhaka"` অথবা `"Chittagong"` হয়, তাহলে সেইসব ডেটা রিটার্ন করবে।

---

## 🔷 2. `$nin` — "এই list এর মধ্যে না থাকলে"

```js
db.users.find({
  status: { $nin: ["inactive", "banned"] }
})
```

👉 `status` যদি `"inactive"` বা `"banned"` না হয় — সেগুলোই রিটার্ন হবে।

---

### 🔁 `$in` vs `$nin`

| Operator | মানে                      |
| -------- | ------------------------- |
| `$in`    | যদি এই list এর ভেতরে থাকে |
| `$nin`   | যদি এই list এর বাইরে থাকে |

---

## 🔷 3. Implicit Condition (Shortcut/Direct Query)

MongoDB-তে যখন আমরা সরাসরি `key: value` লিখি, তখন সেটা `$eq` (equal) ধরে নেয়। এটাকে বলে **Implicit Condition**।

### Example:

```js
db.users.find({ age: 25 })
```

এটা আসলে লিখা হচ্ছে:

```js
db.users.find({ age: { $eq: 25 } })
```

🔹 তুমি যেহেতু `$eq` ব্যবহার করো নি, কিন্তু MongoDB নিজেই ধরে নিয়েছে — তাই এটা **implicit condition**।

---

## 🔷 4. Condition Structure in MongoDB

MongoDB-তে query condition গুলো **JSON object** আকারে লেখা হয়। যেমন:

### Single condition:

```js
db.users.find({ name: "Irfan" })
```

### Multiple condition (AND by default):

```js
db.users.find({ age: { $gte: 20 }, city: "Dhaka" })
```

### OR condition:

```js
db.users.find({
  $or: [
    { city: "Dhaka" },
    { age: { $lt: 18 } }
  ]
})
```

---

## ✅ Summary Table

| Operator | কাজ                                                |
| -------- | -------------------------------------------------- |
| `$in`    | কোনো মান list এর মধ্যে আছে কিনা                    |
| `$nin`   | কোনো মান list এর বাইরে কিনা                        |
| `$eq`    | সমান কিনা (implicit default)                       |
| Implicit | সরাসরি `key: value` query (যেমন `{name: "Irfan"}`) |
| `$or`    | যেকোনো একটি শর্ত মিললে                             |
| `$and`   | সবগুলো শর্ত মিললে                                  |

---

## 📌 Bonus Tip:

Compass / NoSQLBooster-এ `$in` বা `$or` লিখলে তখনও JSON format রাখতে হয়:

```js
{ city: { $in: ["Dhaka", "Sylhet"] } }
```

---

----------------------------------------------------------------------------------------

# 4. Explain : $and, $or, Implicit vs Explicit

তুমি জানতে চাচ্ছো MongoDB এর `$and`, `$or`, এবং **implicit vs explicit** conditions কী — এবং কবে কোনটা ব্যবহার করতে হয়। নিচে আমি **সহজ ভাষায়** সব ব্যাখ্যা করছি বাংলা-English mix এ ✅

---

## 🔷 `$and` — *সবগুলো শর্ত মিলে গেলে*

```js
db.users.find({
  $and: [
    { age: { $gte: 20 } },
    { city: "Dhaka" }
  ]
});
```

🟢 এটি খুঁজবে এমন user যাদের বয়স **২০ বা তার বেশি**, এবং **city "Dhaka"**।

> ✅ **AND** condition MongoDB তে default — তাই নিচের কোডটাও একই কাজ করবে:

```js
db.users.find({
  age: { $gte: 20 },
  city: "Dhaka"
});
```

👉 এটাকেই বলে **Implicit AND**

---

## 🔷 `$or` — *যেকোনো একটি শর্ত মিললেই চলবে*

```js
db.users.find({
  $or: [
    { age: { $lt: 18 } },
    { city: "Chittagong" }
  ]
});
```

🟡 এটা খুঁজবে এমন user যাদের বয়স **১৮ এর নিচে**, অথবা **city "Chittagong"**।

---

## 🔍 Implicit vs Explicit

| টাইপ         | ব্যাখ্যা                      | উদাহরণ                                      |
| ------------ | ----------------------------- | ------------------------------------------- |
| **Implicit** | MongoDB নিজেই বুঝে নেয়        | `{ age: 25 }` মানে `{ age: { $eq: 25 } }`   |
| **Explicit** | তুমি স্পষ্ট করে operator লেখো | `{ age: { $gte: 25 } }`, `{ $or: [ ... ] }` |

---

### ✅ উদাহরণ – Implicit

```js
db.users.find({ name: "Irfan", status: "active" });
```

🔹 এখানে কোনো `$and` বা `$eq` নেই — কিন্তু MongoDB বুঝে নিচ্ছে:

```js
{
  $and: [
    { name: { $eq: "Irfan" } },
    { status: { $eq: "active" } }
  ]
}
```

---

### ✅ উদাহরণ – Explicit

```js
db.users.find({
  $and: [
    { age: { $gt: 30 } },
    { city: "Dhaka" }
  ]
});
```

🔸 এখানে তুমি নিজেই স্পষ্টভাবে `$and` ও `$gt` ব্যবহার করছো।

---

## 🔔 কখন কোনটা ব্যবহার করবো?

| প্রয়োজন                             | ব্যবহার                          |
| ----------------------------------- | -------------------------------- |
| ২টা বা তার বেশি শর্ত দিতে হবে (AND) | Implicit বা `$and` দুইই চলে      |
| OR query দরকার                      | অবশ্যই `$or` লাগবে               |
| Nested / Complex Query              | Explicit `$and` বা `$or` use করো |
| সরল/short query                     | Implicit ভালো চলে                |

---

## 🎯 Bonus: Nested `$and` + `$or` একসাথে

```js
db.users.find({
  $and: [
    { status: "active" },
    {
      $or: [
        { city: "Dhaka" },
        { age: { $lte: 25 } }
      ]
    }
  ]
});
```

👉 এখানে আমরা বলছি:

> এমন user খুঁজো যাদের **status = active** এবং (city = Dhaka অথবা age ≤ 25)

---

## 🔚 Summary

| Operator | ব্যাখ্যা                         | ডিফল্ট?           |
| -------- | -------------------------------- | ----------------- |
| `$and`   | সব condition মিলে গেলে           | ✅ Implicit        |
| `$or`    | যেকোনো condition মিলে গেলে       | ❌ Always Explicit |
| Implicit | সরাসরি `{ key: value }`          | হ্যাঁ             |
| Explicit | `$eq`, `$gt`, `$and`, `$or` লিখে | না                |

---

<br>

---------------------------- xxxxxxxxxxxxxxxx ------------------------------------------

# 5. Explain : $exists, $type, $size

তুমি জানতে চাও MongoDB এর `$exists`, `$type`, এবং `$size` কীভাবে কাজ করে — নিচে আমি সেগুলো সহজভাবে ব্যাখ্যা করছি বাংলা-English mix এ ✅

---

## 🔷 `$exists` — কোনো ফিল্ড **আছে কিনা** সেটা চেক করে

```js
db.users.find({ email: { $exists: true } });
```

🔹 এখানে `email` ফিল্ড যাদের আছে, শুধু সেইসব ডকুমেন্ট রিটার্ন করবে।

👉 ফিল্ড যদি **null** হয়, তাও এটি থাকবে। কিন্তু ফিল্ড **না থাকলে** result এ আসবে না।

### Example:

```js
db.users.find({ phone: { $exists: false } });
```

📌 যাদের `phone` ফিল্ড **নেই**, শুধুমাত্র তাদেরই দেখাবে।

---

## 🔷 `$type` — ফিল্ডের **ডেটা টাইপ** চেক করে

```js
db.users.find({ age: { $type: "int" } });
```

🔹 এটি খুঁজবে যাদের `age` ফিল্ডের টাইপ `int` (integer)

### আরো কিছু টাইপ:

| Type Name | Value |
| --------- | ----- |
| "double"  | 1     |
| "string"  | 2     |
| "object"  | 3     |
| "array"   | 4     |
| "bool"    | 8     |
| "int"     | 16    |
| "null"    | 10    |

✅ তুমি string লিখতেও পারো (`"int"`), আবার number code দিয়েও লিখতে পারো (`{ $type: 16 }`)

---

## 🔷 `$size` — array ফিল্ডের **length/size** চেক করে

```js
db.users.find({ tags: { $size: 3 } });
```

🔹 `tags` নামক array ফিল্ড যাদের length = 3, তাদেরই দেখাবে।

📌 এটি শুধুমাত্র array এর উপর কাজ করে।

---

## ✅ সংক্ষেপে তুলনা

| Operator  | কাজ করে              | Syntax                         |
| --------- | -------------------- | ------------------------------ |
| `$exists` | ফিল্ড আছে কিনা       | `{ field: { $exists: true } }` |
| `$type`   | ডেটা টাইপ match করে  | `{ field: { $type: "int" } }`  |
| `$size`   | Array ফিল্ডের length | `{ field: { $size: 3 } }`      |

---

## ✅ Practical Example:

```js
db.users.find({
  $and: [
    { phone: { $exists: true } },
    { tags: { $size: 2 } },
    { age: { $type: "int" } }
  ]
});
```

🔹 এখানে খুঁজছে এমন user যাদের:

* phone ফিল্ড আছে
* tags array এর size ২
* age ফিল্ডের টাইপ integer

---

## 🔚 Summary:

* `$exists` ➤ ফিল্ড আছে/নেই চেক করতে
* `$type` ➤ ফিল্ডের ডেটা টাইপ চেক করতে
* `$size` ➤ array ফিল্ডের length match করতে

---

<br>

# 6. Explain : $all , $elemMatch

তুমি জানতে চাচ্ছো MongoDB-র `$all` এবং `$elemMatch` কী — এবং কখন কোনটা ব্যবহার করতে হয়। নিচে আমি **সহজভাবে** ব্যাখ্যা করছি বাংলা-English mix এ ✅

---

## 🔷 `$all` — Array এর মধ্যে **সবগুলো মান** থাকতে হবে

```js
db.users.find({
  skills: { $all: ["JavaScript", "Node.js"] }
})
```

🔹 এটা খুঁজবে এমন user যাদের `skills` array-তে **"JavaScript" এবং "Node.js" দুইটিই** আছে।

📌 **Order matter করে না**, শুধু presence চায়।

---

### 🧠 Example:

```json
{ name: "Irfan", skills: ["JavaScript", "PHP", "Node.js"] }
```

⏩ এটা `$all: ["JavaScript", "Node.js"]` এ match করবে ✅

---

## 🔷 `$elemMatch` — Array এর **একটা element** এর ভেতরে multiple condition match করতে হয়

### 👉 যখন array-এর প্রতিটি item নিজে একটা object হয় তখন `$elemMatch` দরকার হয়।

```js
db.products.find({
  reviews: {
    $elemMatch: {
      rating: { $gte: 4 },
      by: "admin"
    }
  }
})
```

🔹 এখানে `reviews` হচ্ছে array of objects, যেমন:

```json
reviews: [
  { rating: 5, by: "admin" },
  { rating: 3, by: "user" }
]
```

⏩ `$elemMatch` check করবে — একটি single element-এই যদি **rating ≥ 4 এবং by = "admin"** — তাহলে match করবে ✅

---

## 🔍 না বুঝলে নিচেরটা দেখো:

### এটা `$all` দিয়ে হবে না:

```js
db.products.find({
  reviews: {
    rating: { $gte: 4 },
    by: "admin"
  }
})
```

🔴 এটা ভুল, কারণ MongoDB জানে না তুমি **একই object** এর ভিতরে condition match চাও।

তাই `$elemMatch` ব্যবহার করতেই হবে।

---

## ✅ Summary

| Operator     | Use Case                                                 | Example                                                             |
| ------------ | -------------------------------------------------------- | ------------------------------------------------------------------- |
| `$all`       | Array তে multiple value থাকা দরকার                       | `{ skills: { $all: ["PHP", "Laravel"] } }`                          |
| `$elemMatch` | Array-of-objects এর মধ্যে একটার ভিতরে multiple condition | `{ reviews: { $elemMatch: { rating: { $gte: 4 }, by: "admin" } } }` |

---

## ✅ Bonus:

### `$all` works with values:

```js
tags: ["web", "api", "backend"]
// Query:
{ tags: { $all: ["web", "api"] } }
```

### `$elemMatch` works with objects:

```js
comments: [
  { text: "ok", likes: 5 },
  { text: "great", likes: 10 }
]
// Query:
{ comments: { $elemMatch: { likes: { $gt: 8 }, text: "great" } } }
```

---

<br>

# 7. Explain : $set, $addToSet, $push,

তুমি জানতে চাচ্ছো MongoDB-এর `$set`, `$addToSet`, এবং `$push` অপারেটর কীভাবে কাজ করে — এবং তাদের মধ্যে পার্থক্য কী। নিচে আমি বাংলা-English mix এ সবগুলো **সহজ ভাষায়** ব্যাখ্যা করছি ✅

---

## 🔷 `$set` – **কোনো ফিল্ড আপডেট বা নতুন করে সেট করতে**

```js
db.users.updateOne(
  { _id: "454042342342324234nddfsd" },
  { $set: { city: "Dhaka", age: 25 } }
);
```

🟢 ব্যাখ্যা:

* যদি `city` বা `age` ফিল্ড না থাকে, তাহলে তৈরি করবে।
* থাকলে আপডেট করে দিবে।

> 🔁 Always overwrite করে।

---

## 🔷 `$push` – **একটি array ফিল্ডে নতুন item যোগ করতে**

```js
db.users.updateOne(
  { name: "Irfan" },
  { $push: { skills: "Node.js" } }
);
```

🟡 ব্যাখ্যা:

* `skills` নামের ফিল্ড যদি না থাকে, তাহলে নতুন array তৈরি করে `["Node.js"]` করে দিবে।
* যদি থাকে, তাহলে array এর শেষে `"Node.js"` যোগ করবে।

> ❗ একই item বারবার push করা যাবে।

---

### ➕ Multiple item add করতে চাইলে:

```js
{ $push: { skills: { $each: ["React", "Express"] } } }
```

---

## 🔷 `$addToSet` – **array তে item যোগ করবে, কিন্তু ডুপ্লিকেট এড়াবে**

```js
db.users.updateOne(
  { name: "Irfan" },
  { $addToSet: { skills: "PHP" } }
);
```

🟢 ব্যাখ্যা:

* যদি `skills` array-তে `"PHP"` না থাকে, তাহলে **যোগ করবে**।
* যদি আগে থেকেই থাকে, তাহলে **ignore করবে**।

> 🚫 No duplicate insertion.

---

## ✅ পার্থক্য সংক্ষেপে:

| Operator    | কাজ                            | ডুপ্লিকেট নেয়? | Target        |
| ----------- | ------------------------------ | -------------- | ------------- |
| `$set`      | ফিল্ড আপডেট/সেট                | না             | যে কোনো ফিল্ড |
| `$push`     | Array-তে নতুন item যোগ         | হ্যাঁ          | Array         |
| `$addToSet` | Array-তে item যোগ, যদি না থাকে | না             | Array         |

---

## ✅ Practical Example:

```js
db.users.updateOne(
  { name: "Irfan" },
  {
    $set: { city: "Dhaka" },
    $push: { skills: "MongoDB" },
    $addToSet: { skills: "JavaScript" }
  }
);
```

🔹 এখানে:

* `city` কে সেট করবে।
* `skills` এ "MongoDB" যোগ করবে (চাইলে ডুপ্লিকেট হতে পারে)।
* `skills` এ "JavaScript" শুধু যোগ করবে যদি আগে না থাকে।

---

## 🧪 Bonus Tip:

* `skills` array-তে ডুপ্লিকেট না চাও = `$addToSet`
* সব সময় নতুন item যোগ করতে চাই = `$push`
* ফিল্ডের মান সেট/আপডেট করতে চাই = `$set`

---

<br>

# 8. Explain : $unset, $pop, $pull, $pullAll

তুমি জানতে চাও MongoDB-এর `$unset`, `$pop`, `$pull`, `$pullAll` অপারেটরগুলো কী কাজ করে — নিচে আমি সহজভাবে বাংলা-English মিক্সে সবগুলো ব্যাখ্যা করলাম ✅

---

## 🔷 `$unset` – **কোনো ফিল্ড মুছে ফেলার জন্য**

```js
db.users.updateOne(
  { name: "Irfan" },
  { $unset: { age: "" } }
);
```

🔹 এখানে `age` ফিল্ডটি ডকুমেন্ট থেকে **permanently delete** করে ফেলবে।

✅ `$unset` value হিসেবে `""` বা `1` দিলেও কাজ করবে।

---

## 🔷 `$pop` – **Array থেকে item মুছে ফেলে — প্রথম বা শেষ**

```js
// Array এর শেষে থেকে item মুছবে
db.users.updateOne(
  { name: "Irfan" },
  { $pop: { skills: 1 } }
);

// Array এর শুরু থেকে item মুছবে
db.users.updateOne(
  { name: "Irfan" },
  { $pop: { skills: -1 } }
);
```

🧠 ব্যাখ্যা:

* `1` = শেষের item remove
* `-1` = শুরু থেকে item remove

> শুধু **একটি item** remove করে।

---

## 🔷 `$pull` – **Array থেকে নির্দিষ্ট condition অনুযায়ী item মুছে ফেলে**

```js
db.users.updateOne(
  { name: "Irfan" },
  { $pull: { skills: "PHP" } }
);
```

🔹 `skills` array থেকে `"PHP"` মুছে ফেলবে।

🧠 এটি **matching item গুলো** সবগুলো মুছে ফেলে।

### Complex Example:

```js
db.students.updateOne(
  { name: "Raju" },
  { $pull: { scores: { $lt: 50 } } }
)
```

🔹 ৫০ এর নিচের যেসব `scores` আছে, সব remove করবে।

---

## 🔷 `$pullAll` – **Array থেকে multiple exact value মুছে ফেলবে**

```js
db.users.updateOne(
  { name: "Irfan" },
  { $pullAll: { skills: ["PHP", "Node.js"] } }
);
```

🔹 `skills` array থেকে `"PHP"` এবং `"Node.js"` remove করবে **if exact match found**.

🧠 `$pullAll` vs `$pull`:

* `$pull`: condition-based remove (e.g. less than 50)
* `$pullAll`: exact match value remove

---

## ✅ Summary Table

| Operator   | কাজ                                      | Target | Condition        |
| ---------- | ---------------------------------------- | ------ | ---------------- |
| `$unset`   | ফিল্ড মুছে ফেলে                          | ফিল্ড  | না               |
| `$pop`     | Array এর প্রথম/শেষ item মুছে             | Array  | 1 বা -1          |
| `$pull`    | Array থেকে condition অনুযায়ী item remove | Array  | হ্যাঁ            |
| `$pullAll` | Array থেকে exact multiple value remove   | Array  | না (exact match) |

---

## ✅ Bonus Example:

```js
db.products.updateOne(
  { _id: ObjectId("...") },
  {
    $unset: { tempPrice: "" },
    $pop: { tags: -1 },
    $pull: { categories: "discount" },
    $pullAll: { colors: ["red", "blue"] }
  }
);
```

---

<br>

# 9. Explain : Delete Documents, Drop Collection and How to explore

তুমি জানতে চাচ্ছো MongoDB - তে :

1. কিভাবে **Document delete** করতে হয়
2. কিভাবে **Collection drop** করতে হয়
3. এবং কিভাবে ডেটা **Explore/Check** করা যায়

নিচে আমি সবগুলো বিষয় বাংলা-English মিক্সে ব্যাখ্যা করছি ✅

---

## 🔹 1. **Delete Documents** – (শুধু কিছু নির্দিষ্ট ডেটা মুছে ফেলা)

### ✅ `deleteOne()` – একটিমাত্র document delete করবে

```js
db.users.deleteOne({ name: "Irfan" });
```

🔸 এটি `name = "Irfan"` যেটা প্রথমে match করবে, সেটি মুছে ফেলবে।

---

### ✅ `deleteMany()` – একাধিক matching document delete করবে

```js
db.users.deleteMany({ city: "Dhaka" });
```

🔸 যাদের `city = "Dhaka"` — তাদের **সবগুলো** document delete হবে।

---

## 🔹 2. **Drop Collection** – (পুরো Collection মুছে ফেলা)

```js
db.users.drop();
```

🛑⚠️ এই কমান্ড চালালে `users` collection সহ সব data, index **permanently delete** হয়ে যাবে।

**Confirm before running!**

---

## 🔹 3. **Explore / Check Data in MongoDB**

### ✅ `find()` – সব document দেখতে

```js
db.users.find();
```

➡️ সবকিছু দেখাবে (কিন্তু অনেক হলে scroll করতে হবে)

---

### ✅ `find().pretty()` – format করে সুন্দরভাবে দেখাবে

```js
db.users.find().pretty();
```

---

### ✅ কিছু limited data দেখতে চাইলে

```js
db.users.find().limit(5);
```

---

### ✅ নির্দিষ্ট field only দেখতে (Projection)

```js
db.users.find({}, { name: 1, city: 1 });
```

🔸 শুধু `name` আর `city` দেখাবে, `_id` থাকবে default-এ।

---

## ✅ Bonus: Data Explore using MongoDB Compass / NoSQLBooster

### MongoDB Compass:

1. Open Compass
2. Connect with URI: `mongodb://localhost:27017`
3. বাম পাশে Database দেখাবে
4. Database > Collection > "Documents" tab-এ গিয়ে ডেটা Explore করতে পারো

   * ✅ Filter query দাও
   * ✅ Add/Delete/Edit option পাবো UI তে

### NoSQLBooster:

1. Install & Run
2. Connect with localhost
3. Left-sidebar > Database > Collection
4. Right-click > Run Query / Explore Documents

---

## ✅ Summary:

| Task             | Command                        |
| ---------------- | ------------------------------ |
| Delete one doc   | `db.collection.deleteOne({})`  |
| Delete many docs | `db.collection.deleteMany({})` |
| Drop collection  | `db.collection.drop()`         |
| View all data    | `db.collection.find()`         |
| View nicely      | `find().pretty()`              |
| Limited data     | `find().limit(5)`              |
| Projection       | `find({}, { field: 1 })`       |

---