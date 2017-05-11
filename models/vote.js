module.exports = function (sequelize, DataTypes) {
		return sequelize.define('vote', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		}, value: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		}
	});
};