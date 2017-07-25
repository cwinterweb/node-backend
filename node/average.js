function average(nums) {
	var total = 0;
	nums.forEach(function(num) {
		total += num;
	});

	var avg = Math.round(total / nums.length);
	console.log(avg);
}

var scores = [90, 98, 89, 100, 100, 86, 94];
average(scores);

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
average(scores2);