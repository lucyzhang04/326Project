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

  //create a dummy userID/submissionDate attribute for now
  userID: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  submissionDate: {
    type: DataTypes.DATE,
    allowNull: false,

  }
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

  /*method queries into submissions table to count the freq. of unique song/podcast names
  and returns the top 5 shared entries for a given day (will filter submission table by current day)
  with info such as artist, name, and freq. 
  */
  async getTrending(){

    //TO-DO: MODIFY SO THAT THE QUERIES FILTER BASED ON CURRENT DAY --> DONE

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    try{

      const topSongs = await Submission.findAll({
        //the attributes value essentially determine the freq. count for each song title
        attributes: [
          'title',
          'artist',
          [Sequelize.fn('COUNT', Sequelize.col('title')), 'songFrequency']
        ], 
        //filters out only entries that were submitted at most a week ago. 
        where: {
          submissionDate: {
            [Op.gte]: currentDate,
          },
        },
        //this aggregates the frequency by group
        group: ['title'],
        //sort in desc. order and limit to top 5.
        order: [[Sequelize.literal('songFrequency'), 'DESC']],
        limit: 5
      });

      //map each entry to {title, artist, freq}
      return topSongs.map(entry => ({
        title: entry.title,
        artist: entry.artist,
        frequency: entry.getDataValue('songFrequency'),
      }));
    }catch(e){
      console.log(e);
    }
  }

  /*method determines the top 3 contributors for the past week (will filter by past 7 days in submission table)
  by querying into the submission table to find the # of contributions of each user and then 
  joins results with the user table on userID to ultimately return a result
  that contains a mapping of username to # of contributions for the 
  3 users with the most contributions over the past week. 
  */

  async getTopContributors(){

    //TO-DO: MODIFY SO THAT THE QUERIES FILTER OUT ENTRIES THAT ARE OLDER THAN A WEEK --> DONE
    const currentDate = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(currentDate.getDate() - 7);

    try{
      const topContributors = await Submission.findAll({
        attributes: [
          'userID',
          [Sequelize.fn('COUNT', Sequelize.col('userID')), 'userFrequency']
        ],
        where: {
          submissionDate : {
            [Op.gte]: oneWeekAgo,
          },
        },
        group: ['userID'],
        order: [[Sequelize.literal('userFrequency'), 'DESC']],
        limit: 3
      });

      //for now, since the users database isn't set up yet, the userID will be returned
      //ultimately, will need to join the submission/user databases using userID to associate username with the freq.
      return topContributors.map(user => ({
        user: user.userID,
        frequency: user.getDataValue('userFrequency'),
      }));
    }catch(e){
      console.log(e);
    }
  }

  async getUserContributionTime(userID){
    try{
      const totalContributionTime = await Submission.sum({
        where: {
          userID: userID,
        }
      });

      return totalContributionTime;
    }catch(e){
      //unable to fetch user's contributions from submission table
      console.log(e);
    }
  }

  async getUserTotalContributions(userID){
    try{ 
      const totalContributions = await Submission.count({
        where: {
          userID: userID,
        },
      });

      return totalContributions;

    }catch(e){
      console.log(e);
    }
  }





  // USER
  async readUser(id = null) {
    if (id) {
      return await User.findByPk(id);
    }
    return await User.findAll();
  }

  async findUser(user) {
    return await User.findOne({
      where: {
        username: user.username,
        spotify_refresh_token: user.spotify_refresh_token,
      },
    });
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
