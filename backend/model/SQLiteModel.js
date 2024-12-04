// import { Sequelize, DataTypes } from "sequelize";
const { Sequelize, DataTypes } = require("sequelize");

// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

// Define the Submissions table
const Submission = sequelize.define("Submission", {
  submissionid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

//Add more tables here

const User = sequelize.define("User", {
  userid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spotify_refresh_token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

class _SQLiteModel {
  constructor() {}

  async init(fresh = false) {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    // An exception will be thrown if either of these operations fail.

    if (fresh) {
      await this.delete();
      await this.createSubmission({
        title: "Default Title 1",
        artist: "Artist 1",
      });
      await this.createSubmission({
        title: "Default Title 2",
        artist: "Artist 2",
      });
      await this.createSubmission({
        title: "Default Title 3",
        artist: "Artist 3",
      });
    }
  }

  // SUBMISSION
  async createSubmission(submission) {
    return await Submission.create(submission);
  }

  async readSubmission(id = null) {
    if (id) {
      return await Submission.findByPk(id);
    }

    return await Submission.findAll();
  }

  async updateSubmission(submission) {
    const submissionu = await Submission.findByPk(submission.submissionid);
    if (!submission) {
      return null;
    }

    await submissionu.update(submission);
    return submissionu;
  }

  async deleteSubmission(submission = null) {
    if (submission === null) {
      await Submission.destroy({ truncate: true });
      return;
    }

    await Submission.destroy({
      where: { submissionid: submission.submissionid },
    });
    return task;
  }

  // USER
  async readUser(id = null) {
    if (id) {
      return await User.findByPk(id);
    }
    return await User.findAll();
  }

  async createUser(user) {
    return await User.create(user);
  }

  async updateUser(user) {
    const useru = await User.findByPk(user.userid);
    if (!useru) {
      return null;
    }
    await useru.update(user);
    return useru;
  }

  async deleteUser(user = null) {
    if (user === null) {
      await User.destroy({ truncate: true });
      return;
    }
    await User.destroy({
      where: { userid: user.userid },
    });
    return user;
  }
}

const SQLiteModel = new _SQLiteModel();

// export default SQLiteModel;
module.exports = SQLiteModel;

