// Requiring bcrypt-nodejs for password hashing. 
var bcrypt = require("bcrypt-nodejs");

// Creating Serielize model for the database table User (for password management)
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The User Name cannot be null.
    userName:{
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true
    },

    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // Logged flag helps determine if the user is already logged in/ logged off
    logged: {
      type: DataTypes.BOOLEAN, 
      defaultValue:false
    }

  }, 
  {
    timestamps: false
  });

  // Decrypting the Password (Hashing). 
  // This will check if an unhashed password is entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // Hashes the entered Password in Decrypt form by hashing
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
