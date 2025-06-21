# Express and Mongoose install

```bash
npm i express mongoose
```

# 2. ts-node-dev

### Step-1
```bash
npm i ts-node-dev
```

[https://www.npmjs.com/package/ts-node-dev](https://www.npmjs.com/package/ts-node-dev)

Add this line in `package.json`

```json
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts"
  },
```

####  Step-2

```bash
npm run dev
```


