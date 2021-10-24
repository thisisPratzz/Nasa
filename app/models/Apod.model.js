module.exports = (sequelize, Sequelize) => {
    const Apod = sequelize.define("apod", {
        Name: {
        type: Sequelize.STRING
      },
      Dateforapod : {
        type: Sequelize.STRING                    
      },
      explanation : {
        type: Sequelize.TEXT           

      },   
      media_type : {
        type: Sequelize.TEXT                     

      },
      title : {
        type: Sequelize.TEXT                    

      },
      url: {
        type: Sequelize.TEXT
      }
      

    });
    freezeTableName: true
    return Apod;
  };