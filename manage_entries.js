// window.onload = function() {
// 	checkLoggedIn()
	

// 	// document.getElementById("deletebutton").onclick = function() {
// 	// 	delete_entry(username, "21:59:57");
// 	// }
// }

function add_entry(username, date, notes, selectedGIF) {
	currentUser = store.get(username);
	entries = currentUser.entries;

	newEntry = {
		'date': date,
		'notes': notes,
		'gif_data': selectedGIF
	}

	entries.push(newEntry);
	store.update(username, function(username) {
		username.entries = entries;
	});
}

function edit_entry(username, i, notes, selectedGIF) {
	currentUser = store.get(username);
	entries = currentUser.entries;

	entries[i].notes = notes;
	entries[i].gif_data = selectedGIF;
	
	console.log(entries);
	store.update(username, function(username) {
		username.entries = entries;
	});
}

function delete_entry(username, date) {
	currentUser = store.get(username);
	entries = currentUser.entries;

	for (i = 0; i < entries.length; i++) {
		if (entries[i].date.includes(date)) {
			entries.splice(i, 1);
		}
	}

	console.log(entries);
	store.update(username, function(username) {
		username.entries = entries;
	});
}

function addGifMetaData(results) {
	if (store.get('gifMetaData') == undefined) {
        store.set('gifMetaData', {})
    }
    let dict = {}
	results.forEach(obj => {
		dict[obj.id] = obj
	})

	const newEntry = Object.assign(store.get('gifMetaData'), dict)
	store.set('gifMetaData', newEntry)
}

//Gets all entries from a specific day
function getEntriesForDay(date) {
    const day = date.getDate()
	const month = date.getMonth()
	const year = date.getFullYear()

	const dayEntries = store.get(currentUser).entries.filter(entry => {
        const entryDate = new Date(entry.date)

		if (entryDate.getDate() == day
		&& entryDate.getMonth() == month
		&& entryDate.getFullYear() == year) {
        	return entry
		}
    })

	return dayEntries
}

// Gets the gif from the last entry of the day
function getMonthGifs(date) {
    const month = date.getMonth()
	const year = date.getFullYear()
    var dates =  {} //entries by date
    var monthEntries = {}

    store.get(currentUser).entries.forEach(entry => {
        const entryDate = new Date(entry.date)

		if ((entryDate.getMonth() == month || entryDate.getMonth() == month -1 || entryDate.getMonth() == month +1)
		&& entryDate.getFullYear() == year) {
        	if (!(entryDate.getDate() in dates)) dates[entryDate.toLocaleDateString().replace('/', '-').replace('/', '-')] = []
            dates[entryDate.toLocaleDateString().replace('/', '-').replace('/', '-')].push(entry)
		}
    })

    Object.keys(dates).forEach(key => {
        const last_idx = dates[key].length - 1
        monthEntries[key] = dates[key][last_idx]
    })

	return monthEntries
}
