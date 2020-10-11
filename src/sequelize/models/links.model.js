module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define('link', {
    link: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  });

  return {
    link: Link,
  };
};
