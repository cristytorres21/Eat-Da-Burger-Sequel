module.exports = function(sequelize, DataTypes) {
  
  var Customer = sequelize.define("Customer", {
    customer: {
      type: DataTypes.STRING,
      // customer must have a name 
      allowNull: false
    }
  });
  return Customer;
};