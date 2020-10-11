// const { DataTypes }  = require('sequelize');

// module.exports = (sequelize) => {
// 	sequelize.define('advertisement', {
// 		// id: {
// 		// 	allowNull: false,
// 		// 	autoIncrement: true,
// 		// 	primaryKey: true,
// 		// 	type: DataTypes.INTEGER
// 		// },
// 		name: {
// 			allowNull: false,
// 			type: DataTypes.STRING,
// 			// unique: true,
// 		},
// 	});
// };



module.exports = (sequelize, DataTypes) => {
	const Test = sequelize.define('test', {
		message: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true,
		},
	});

	return {
		test: Test
	}
};