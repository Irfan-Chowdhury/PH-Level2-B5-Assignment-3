1. npm init -y

2. npm i -D typescript // typescript dev dependency hisebe install hobe


3. npm i express // express install


4. tsc --init // typescript install
or issue found: install globally : npm i -g typescript

5. npm i --save-dev @types/express

6. npx tsc

7. npx tsc -w // run all time


8. npm i -D nodemon  // automatic build
9. sudo npm install -g nodemon // install globally
10. nodemon ./dist/server.js // run the full server. Now if you change any code, server change and display the changes data.
11. in `package.json` just write
    ```json
        "scripts": {
            "dev" : "nodemon ./dist/server.js"
        },
    ```
    in terminal : `npm run dev`

<!-- From Advance -->
12. Validator :

```bash
npm i validator
``` 

Visit : [https://www.npmjs.com/package/validator](https://www.npmjs.com/package/validator)

```bash
npm i --save @types/validator
```

13. Zod 

```bash
npm install zod
```

Visit : [https://zod.dev/](https://zod.dev/)



<br>

Basic File Structure:
# server.ts : 
    server handling like
        - starting
        - closing 
        - error handling of server
        - only related to server
# app.ts 
    - route handling
    - middleware,
    - route related errro

# app folder
    - app business logic like CRUD 
    - database related works







# Install MongoDB compass & No SQL Booster


MongoDB Community Edition Ubuntu-তে ইনস্টল করার জন্য নিচের ধাপে ধাপে গাইডটি অনুসরণ করো। এখানে MongoDB 7.0 ধরে দেওয়া হলো (সবচেয়ে recent stable):

---

## ✅ Step-by-Step: Install MongoDB Community Edition on Ubuntu

> এই গাইডটি Ubuntu 20.04, 22.04 এবং তার পরে যেকোনো LTS ভার্সনের জন্য কাজ করবে।

---

### 🔹 Step 1: Import the MongoDB GPG Key

```bash
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
--dearmor
```

---

### 🔹 Step 2: Add the MongoDB Repository

```bash
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -sc)/mongodb-org/7.0 multiverse" | \
sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list > /dev/null
```

---

### 🔹 Step 3: Update Package List

```bash
sudo apt update
```

---

### 🔹 Step 4: Install MongoDB

```bash
sudo apt install -y mongodb-org
```

---

### 🔹 Step 5: Start MongoDB

```bash
sudo systemctl start mongod
```

---

### 🔹 Step 6: Enable MongoDB on Boot

```bash
sudo systemctl enable mongod
```

---

### 🔹 Step 7: Check Status (Optional)

```bash
sudo systemctl status mongod
```

---

## ✅ Verify Installation

```bash
mongosh
```

যদি নিচের মতো কিছু দেখাও, তাহলে MongoDB ঠিকভাবে ইনস্টল হয়েছে:

```bash
test> db
test
```

---

## 🧠 Bonus Commands:

| কাজ              | কমান্ড                          |
| ---------------- | ------------------------------- |
| Restart MongoDB  | `sudo systemctl restart mongod` |
| Stop MongoDB     | `sudo systemctl stop mongod`    |
| Mongo Shell open | `mongosh`                       |

---

---------------------------------------
# If any Issue Arise

### 🔹 Step 1: MongoDB Official Repo যোগ করো

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
```

### 🔹 Step 2: Source list এ MongoDB যোগ করো

```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

### 🔹 Step 3: Update করে MongoDB install করো

```bash
sudo apt update
sudo apt install -y mongodb-org
```

---

## 🔁 এখন আবার Try করো:

### 🔸 Start MongoDB:

```bash
sudo systemctl start mongod
```

### 🔸 Enable MongoDB at boot:

```bash
sudo systemctl enable mongod
```

### 🔸 Check status:

```bash
sudo systemctl status mongod
```

---


## ✅ Verify করো:

```bash
mongod --version
mongosh
```

---------------------------------------------------------------------------------------

# Install MongoDB Compass (GUI)



## ✅ সমাধান ২: `.deb` দিয়ে MongoDB Compass ইনস্টল (Recommended)

### 🔹 Step 1: ডাউনলোড করো MongoDB Compass `.deb` ফাইল

👉 Visit: [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)

* Select Platform (OS): **Ubuntu/Debian**
* Format: **.deb (64-bit)**
* তারপর Download বাটনে ক্লিক করো

### 🔹 Step 2: ইনস্টল করো

টার্মিনালে গিয়ে নিচের কমান্ড চালাও:

```bash
cd ~/Downloads
sudo dpkg -i mongodb-compass_*.deb
sudo apt --fix-broken install
```

---

## ✅ Compass চালাও

```bash
mongodb-compass
```

---

## 🧠 Bonus Tip:

ইনস্টল হয়ে গেলে Menu → Search: `compass` → ওপেন করো। এবার তোমার লোকাল `localhost:27017` বা Atlas URI দিয়ে Connect করে UI থেকে MongoDB explore করতে পারবে।

---



-----------------------------------------------------------
# Install No SQL Booster (GUI)

### 🔹 Step 1: ডাউনলোড করো No SQL Booster AppImage `.deb` ফাইল

👉 Visit: [https://nosqlbooster.com/downloads](https://nosqlbooster.com/downloads)

দারুন! ✅ তুমি যদি `nosqlbooster4mongo-10.0.3.AppImage` ডাউনলোড করে থাকো, তাহলে এটি **install করার দরকার নেই** — শুধু **executable permission** দিলেই সরাসরি চালানো যায়।

---

## 🚀 Step-by-Step: Run `.AppImage` of NoSQLBooster

### ✅ Step 1: Move to Download Directory

```bash
cd ~/Downloads
```

### ✅ Step 2: Make the File Executable

```bash
chmod +x nosqlbooster4mongo-10.0.3.AppImage
```

এটা AppImage ফাইলটিকে চালানোর অনুমতি দেয়।

### ✅ Step 3: Run the Application

```bash
./nosqlbooster4mongo-10.0.3.AppImage
```

> 🟢 **NoSQLBooster** এখন GUI-তে চালু হবে।

---

## 🎯 \[Optional] Add to Application Menu

যদি তুমি চাও এটা Ubuntu-এর Application Launcher (Menu) থেকে চালাতে:

### Step 1: Create `.desktop` File

```bash
nano ~/.local/share/applications/nosqlbooster.desktop
```

### Paste this content:

```ini
[Desktop Entry]
Name=NoSQLBooster
Exec=/home/your-username/Downloads/nosqlbooster4mongo-10.0.3.AppImage
Icon=nosqlbooster
Type=Application
Categories=Development;Database;
```

🔁 Replace `/home/your-username/Downloads/...` with your actual file path (check by running `pwd` in that folder).

### Step 2: Save and Exit

Press `Ctrl + O`, then `Enter`, then `Ctrl + X`

---

## ✅ Now you're done!

* প্রথমবার চালানোর সময় Ubuntu confirmation চাইতে পারে – “Trust this file” → Yes দিন
* পরবর্তীতে সরাসরি **App launcher** থেকে “NoSQLBooster” লিখেই চালাতে পারবেন

---







