module.exports = (sequelize, DataTypes) => {
  const trigger = sequelize.define('trigger', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  trigger.associate = (models) => {
    trigger.belongsTo(models.user, { foreignKey: { name: 'id_source', allowNull: false }, as: 'source' });
    trigger.belongsTo(models.round, { foreignKey: { name: 'id_round', allowNull: false }, as: 'round' });
    trigger.belongsTo(models.user, { foreignKey: { name: 'id_author', allowNull: false }, as: 'author' });
  };
  return trigger;
};
