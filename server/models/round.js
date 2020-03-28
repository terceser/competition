module.exports = (sequelize, DataTypes) => {
  const round = sequelize.define('round', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    max_trigger: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trophy: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    url_image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
  round.associate = (models) => {
    round.belongsTo(models.user, { foreignKey: { name: 'id_author', allowNull: false }, as: 'author' });
    round.belongsTo(models.user, { foreignKey: { name: 'id_winner', allowNull: true }, as: 'winner' });
    round.hasMany(models.trigger, { foreignKey: { name: 'id_round', allowNull: true }, as: 'triggers' });
  };
  return round;
};
