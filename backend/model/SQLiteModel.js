// import { Sequelize, DataTypes } from "sequelize";
const { Sequelize, DataTypes, Op } = require("sequelize");
const fetch = require("node-fetch");

// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

// Define User table
const User = sequelize.define("User", {
  userid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure that usernames are unique
  },
  spotify_refresh_token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
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
  submissionDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW, // Automatically set to current timestamp if not provided
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User, 
      key: 'username',
    },
    onDelete: 'CASCADE', // Cascade delete: when a User is deleted, the associated Submissions are also deleted
    onUpdate: 'CASCADE', // Cascade update: if the username is updated, the associated Submissions are updated
  },
});

// Define the Quotes table
const Quote = sequelize.define("Quote", {
  quoteid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  quote: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  person: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quoteDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW, 
  },
});

// Define relationships
User.hasMany(Submission, { foreignKey: 'user_name' }); // A User can have many Submissions
Submission.belongsTo(User, { foreignKey: 'user_name' }); // A Submission belongs to a User

class _SQLiteModel {
  constructor() {}

  async init(fresh = false) {
    try {
      await sequelize.authenticate();
      await sequelize.sync({force: fresh }); 
      if (fresh) {
        await this.delete();
        console.log("Database initialized with a fresh start (tables dropped).");
      } else {
        console.log("Database initialized without dropping existing tables.");
      }
    } catch (error) {
      console.error("Error during database initialization:", error);
      throw error; // Propagate the error for further handling
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

  async getSubsToday(){
    const today = new Date(); 
    today.setHours(0, 0, 0, 0); 
    try{
      const songsToday = await Submission.findAll({
        attributes: [
          "title", 
          "artist",
          "imageURL"
        ],
        where: {
          submissionDate: {
            [Op.gte]: today
          }
        }
      });

      const query = songsToday.map((sub) => ({
        title: sub.title, 
        artist: sub.artist, 
        imageURL: sub.imageURL 
      })); 
      console.log(query); 
      return songsToday; 
    }
    catch(e){
      console.log(e);
      console.log("Unable to fetch today's songs."); 
    }
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
          'user_name',
          [Sequelize.fn('COUNT', Sequelize.col('user_name')), 'userFrequency']
        ],
        where: {
          submissionDate : {
            [Op.gte]: oneWeekAgo,
          },
        },
        group: ['user_name'],
        order: [[Sequelize.literal('userFrequency'), 'DESC']],
        limit: 3
      });

      //for now, since the users database isn't set up yet, the userID will be returned
      //ultimately, will need to join the submission/user databases using userID to associate username with the freq.
      return topContributors.map(user => ({
        user: user.user_name,
        frequency: user.getDataValue('userFrequency'),
      }));
    }catch(e){
      console.log(e);
    }
  }

  async getUserContributionTime(user_name){
    try{
      const totalContributionTime = await Submission.sum({
        where: {
          user_name: user_name,
        }
      });

      return totalContributionTime;
    }catch(e){
      //unable to fetch user's contributions from submission table
      console.log(e);
    }
  }

  async getUserTotalContributions(user_name){
    try{ 
      const totalContributions = await Submission.count({
        where: {
          user_name: user_name,
        },
      });

      return totalContributions;

    }catch(e){
      console.log(e);
    }
  }

  async getLongestStreak(){
    const submissions = await Submission.findAll({
      attributes: ['user_name', 'submissionDate'],
      order: [
        ['user_name', 'ASC'],
        ['submissionDate', 'ASC']
      ]
    });

    let longestStreakUser = null;
    let longestStreak = 0;
    let currentUser = null;
    let currentStreak = 0;
    let previousDate = null;

    submissions.forEach(submission => {
      const userID = submission.user_name;
      const submissionDate = submission.submissionDate

      if (userID !== currentUser) {
        // New user: reset streak
        currentUser = userID;
        currentStreak = 1;
        previousDate = submissionDate;
      } else {
        // Same user: check if submission is consecutive
        const diffDays = (submissionDate - previousDate) / (1000 * 60 * 60 * 24);
        if (diffDays === 1) {
          currentStreak++; // Increment streak if consecutive
        } else if (diffDays > 1) {
          currentStreak = 1; // Reset streak if not consecutive
        }
        previousDate = submissionDate;
      }

      // Update longest streak
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
        longestStreakUser = currentUser;
      }
    });

    return { userID: longestStreakUser, streak: longestStreak };
  }

  async getYourSubmissions(username) {
    console.log("In getYourSubmissions");
    if (!username) {
      throw new Error("Username filter is required.");
    }
  
    try {
      const submissions = await Submission.findAll({
        attributes: ["title", "artist", "user_name", "submissionDate"], // Extract title and artist from Submission table
        where: {
          user_name: username,
        },
      });
      console.log("Here are all your submissions!")
      console.log(submissions);
  
      return submissions.map((submission) => ({
        username: submission.user_name, // Access the associated User's username
        title: submission.title,
        artist: submission.artist,
        submissiondate: submission.submissionDate
      }));

    } catch (error) {
      console.error("Error fetching submissions with user details:", error);
      throw error;
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

  async getSubsToday(){
    const today = new Date(); 
    today.setHours(0, 0, 0, 0); 
    try{
      const songsToday = await Submission.findAll({
        attributes: [
          "title", 
          "artist",
          "imageURL"
        ],
        where: {
          submissionDate: {
            [Op.gte]: today
          }
        }
      });

      const query = songsToday.map((sub) => ({
        title: sub.title, 
        artist: sub.artist, 
        imageURL: sub.imageURL 
      })); 
      console.log(query); 
      return songsToday; 
    }
    catch(e){
      console.log(e);
      console.log("Unable to fetch today's songs."); 
    }
  }

  // QUOTES
  async createQuote(quote) {
    return await Quote.create(quote);
  }

  async readQuote(id = null) {
    if (id) {
      return await Quote.findByPk(id);
    }
    return await Quote.findAll();
  }

  async deleteQuote(quote = null) {
    if (quote === null) {
      await Quote.destroy({ truncate: true });
      return;
    }

    await Quote.destroy({
      where: {quoteid: quote.quoteid},
    });
    return quote;
  }

  // QUOTES
  async getQuote() {
    let currDay = new Date();
    currDay.setHours(0, 0, 0, 0);

    try {
      let currQuote = await Quote.findOne({
        where: {
          quoteDate: {
            [Op.eq]: currDay
          }
        }
      });

      if (!currQuote) {
        try {
          const response = await fetch("https://api.allorigins.win/raw?url=https://zenquotes.io/api/random");
          const quoteData = await response.json();

          currQuote = await this.createQuote({
            quote: quoteData[0].q, 
            person: quoteData[0].a, 
            quoteDate: currDay
          });
        } catch (error) {
          console.error("Error:", error);
          currQuote = await this.createQuote({
            quote: "326! Yay!", 
            person: "Tim Richards", 
            quoteDate: currDay
          });
        }
      }
      return currQuote;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async getQuoteByDate(date) {
    // Normalize the provided date to the start of the day (set hours to 00:00:00)
    let currDay = new Date(date);
    currDay.setHours(0, 0, 0, 0);
  
    try {
      // Attempt to find a quote for the given date
      let currQuote = await Quote.findOne({
        where: {
          quoteDate: {
            [Op.eq]: currDay
          }
        }
      });
  
      // If no quote exists for the provided date
      if (!currQuote) {
        try {
          // Fetch a random quote from an external API
          const response = await fetch("https://api.allorigins.win/raw?url=https://zenquotes.io/api/random");
          const quoteData = await response.json();
  
          // Create a new quote record for the provided date
          currQuote = await this.createQuote({
            quote: quoteData[0].q,
            person: quoteData[0].a,
            quoteDate: currDay
          });
        } catch (error) {
          console.error("Error fetching quote:", error);
          
          // If fetching the API quote fails, create a fallback quote
          currQuote = await this.createQuote({
            quote: "Default quote due to error.", 
            person: "Unknown", 
            quoteDate: currDay
          });
        }
      }
  
      // Return the quote (either from the DB or newly created)
      return currQuote;
    } catch (error) {
      console.error("Error in getQuoteByDate:", error);
      throw error;
    }
  }
  
}

const SQLiteModel = new _SQLiteModel();

// export default SQLiteModel;
module.exports = SQLiteModel;
