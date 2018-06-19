function createDate () {
	var d = new Date();
	var changedDate = "";

	changedDate += (d.getMonth() + 1) + "_";
	changedDate += d.getDate() + "_";
	changedDate += d.getFullYear();

	return changedDate;
};

module.exports = createDate;