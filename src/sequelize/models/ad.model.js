module.exports = (sequelize, DataTypes) => {
	const Ad = sequelize.define('ad', {
		title: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		description: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		price: {
			allowNull: false,
			type: DataTypes.FLOAT,
		}
	});

	return {
		ad: Ad
	}
};