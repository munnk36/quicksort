function quicksort(inlist, callback) {
	var time = 600;
	var kids = $("ul").children();
	var start = 0;
	
	while (kids.eq(start).html() != inlist[0]) {
		start++;
	}

	for (var index = 0; index < kids.length; index++) {
		var color = kids.eq(index).css("background-color");
		if (color == "rgb(176, 199, 189)"){
			kids.eq(index).css("background-color", "#A4A5AE"); //appearance of deselection by returning to top level color 
		}
		if (color == "rgb(243, 249, 210)"){
			kids.eq(index).css("background-color", "#B8EBD0"); //terminated color for completed pivot
		}
		var width = kids.eq(index).html()
		kids.eq(index).css("width", width * 25);
	}

	if(inlist.length <= 1){
		if (!callback) {
			return;
		}
		callback(inlist);
		if(inlist.length == 1){
			kids.eq(start).css("background-color", "#B8EBD0"); //terminated color for base case
		}
		return;
	}

	var randomindex = (Math.floor(Math.random() * inlist.length));
	var pivot = inlist[randomindex];
	var under = [];
	var over = [];
	for (var x = 0; x < inlist.length; ++x){
		if(x === randomindex){
			continue;
		}
		if (inlist[x] <= pivot){
			under.push(inlist[x]);
		} else {
			over.push(inlist[x]);
		}
	}

	outlist = under.concat([pivot], over);
	for(var index = 0; index < outlist.length; index++){
		kids.eq(start + index).html(outlist[index]);
		kids.eq(start + index).css("background-color", "#B0C7BD") //currently selected partition
		if (index == under.length){
			kids.eq(start + index).css("background-color", "#F3F9D2"); //currently selected pivot
		}
		var width = kids.eq(index).html()
		kids.eq(index).css("width", width * 25);
	}

	
	setTimeout( function () {
		quicksort(under, function (underSorted) {
			setTimeout( function() {
				quicksort(over, function (overSorted) {
				outlist = underSorted.concat([pivot], overSorted);
				if (!callback) {
					return outlist;
				}
				callback(outlist);
			});
			}, time);
		});
	}, time);
}