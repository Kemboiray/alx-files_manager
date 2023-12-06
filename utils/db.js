// File: db.js
// Description: Database connection and configuration. This is handled through a
// class `DBClient`.

import { MongoClient } from 'mongodb';
// import { promisify } from 'util';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'file_manager';
    const url = `mongodb://${host}:${port}/${database}`;

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
      if (!err) {
        this.db = client.db(database);
        this.users = this.db.collection('users');
        this.files = this.db.collection('files');
      } else {
        this.db = false;
      }
    });
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    const nbUsers = await this.users.countDocuments();
    return nbUsers;
  }

  async nbFiles() {
    const nbFiles = await this.files.countDocuments();
    return nbFiles;
  }
}

const dbClient = new DBClient();
export default dbClient;
