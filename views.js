var currentUser = store.get('currentUser')
var months = ["January", "February", "March", "April", "May", "June",
					 	  "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", 
			"Thursday", "Friday", "Saturday"];
var noDays =[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var current_Date = new Date();
const noEntryGif = 'https://media.giphy.com/media/m0G1raiEtsXDO/giphy.gif'

window.onload = function() {
	checkLoggedIn();
	var url = document.location.href
	current_Date = new Date(decodeURIComponent(url.split('?')[1]))
	if (url.split('?')[1] == null) {
		current_Date = new Date()
    }
	
	if (document.location.pathname.includes('months.html')) {
		loadMonth(current_Date)
		setSearch();
    } else if (document.location.pathname.includes('days.html')) {
    	loadDay(current_Date)
    }
}


function viewToday() {
	const current_Date = new Date()
	document.location = 'days.html?' + encodeURIComponent(current_Date)
}

function viewMonth() {
	const current_Date = new Date()
	document.location = 'months.html?' + encodeURIComponent(current_Date)
}

function loadDay(current_Date) {
	document.getElementById("days-day").innerHTML = current_Date.getDate() + ",";
	document.getElementById("days-month").innerHTML = months[current_Date.getMonth()];
	document.getElementById("days-year").innerHTML = current_Date.getFullYear();
	const dayEntries = getEntriesForDay(current_Date)
	loadDayEntries(dayEntries)
}

function previousDay() { 
	current_Date.setDate(current_Date.getDate() - 1);
	document.location = 'days.html?' + encodeURIComponent(current_Date)
}

function nextDay() { 
	current_Date.setDate(current_Date.getDate() + 1);	
	document.location = 'days.html?' + encodeURIComponent(current_Date)
}

function loadMonth(current_Date) {
	var calTable = document.getElementById("calendar")
	var month = current_Date.getMonth();
	var year = current_Date.getFullYear();
	
	current_Date = new Date(year, month, 1);
	document.getElementById("months-date").innerHTML = months[current_Date.getMonth()] + " "
													 + current_Date.getFullYear();
	var dow = current_Date.getDay();
	var day = 1 - dow;
	var rowCount = 1;
	var daysInMonth = noDays[month];
	if (month == 1 && (current_Date.getFullYear() % 4 == 0) && 
		 			  !(current_Date.getFullYear() % 100 == 0 && current_Date.getFullYear() != 0)) { 
		daysInMonth = 29

	}
	while(day < daysInMonth + 1) { 
		var row = calTable.insertRow(rowCount);	
		for(var i=6; i > -1; --i) { 
			var cell = row.insertCell(0);
			current_Date.setDate(current_Date.getDate() + (i - dow)); 
			cell.innerHTML = current_Date.getDate();
			cell.id = current_Date.toLocaleDateString().replace('/', '-').replace('/', '-');
			current_Date.setDate(current_Date.getDate() - (i - dow)) 
			day += 1;
		}
		current_Date.setDate(current_Date.getDate() + 7);
		rowCount += 1;
	}
	current_Date= new Date(year, month, 1);
	const monthEntries = getMonthGifs(current_Date)
    loadGifsOnMonth(monthEntries, current_Date)
}

function previousMonth() { 
	year = current_Date.getFullYear()
	month = current_Date.getMonth() - 1
	if (month == -1) { 
		year = year - 1
		month = 11
	}
	current_Date = new Date(year, month, 1)
	document.location = 'months.html?' + encodeURIComponent(current_Date)

}

function nextMonth() { 
	year = current_Date.getFullYear()
	month = current_Date.getMonth() + 1
	if (month == 12) { 
		year = year + 1
		month = 0
	}
	current_Date = new Date(year, month, 1)
	document.location = 'months.html?' + encodeURIComponent(current_Date)

}

function searchMonth() {
	year = document.getElementById("year").value
	month = months.indexOf(document.getElementById("dd-year").value)
	current_Date = new Date(year, month, 1)
	document.location = 'months.html?' + encodeURIComponent(current_Date)
}

function clearTable() { 
	var calTable = document.getElementById("calendar")
	while(calTable.rows[1] != null) { 
		calTable.deleteRow(1);
	}
}

function setSearch() {
	var d = new Date()
	document.getElementById(months[d.getMonth()]).selected = "selected"
	document.getElementById("year").value = d.getFullYear()
}




function loadDayEntries(entries) {
	$("#entries").empty()
	if (entries.length == 0){
		const element = (`<div class="card">
			<img class="card-img-top" src="${noEntryGif}" alt="No entries today!">
				<div class="card-body">
				<h5 class="card-title">"No entries today! Why don't you like us?"</h5>
				</div>
			</div>`)

		$("#entries").append(element)
	} else {
		for (const idx in entries) {
            const entry = entries[idx]
            const gif = entry.gif_data
            const notes = entry.notes
            const date = new Date(entry.date)
            const formattedDate = date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
            const editUrl = 'edit_entry.html?' + encodeURIComponent(date)
            const element = (`<div class="card">
				<img class="card-img-top" src="${gif.url}" alt="${gif.title}">
					<div class="card-body">
					<h5 class="card-title">${formattedDate}</h5>
					<p class="card-text">${notes}</p>
					<a href="${editUrl}" class="btn btn-primary" id="edit-submit">Edit</a>
					<a class="btn btn-primary" id="delete-submit" data-toggle="modal" data-target="#exampleModal" 
					onclick="deleteEntry('${date}')">Delete</a>
					</div>
				</div>`)

            $("#entries").append(element)
        }
	}
}

function loadGifsOnMonth(monthEntries, date) {
    const calendarElements = $.find('td')
    const month = date.getMonth()
    const year = date.getFullYear()
    const today = new Date()

    for (const idx in calendarElements) {
        const td = calendarElements[idx]
        const day = Number(td.innerHTML)
        const fullDate = new Date(td.id)
        let src = noEntryGif
        let alt = 'No entries today.'
        if (td.id in monthEntries) {
            const entry = monthEntries[td.id].gif_data
            src = entry.url
            alt = entry.title
        }
        const viewDayUrl = 'days.html?' + encodeURIComponent(fullDate)
        $(`#${td.id}`).empty()
        if (fullDate <= today) {
            $(`#${td.id}`).append(`<a href="${viewDayUrl}"><div class="day-container"><img class='gifDay' src="${src}" alt="${alt}"><div class="centered">${day}</div></div></a>`)
        } else {
            // Don't render gifs for days that haven't occurred yet
            $(`#${td.id}`).append(`<div class="day-container"><div class="centered black">${day}</div></div>`)
        }
    }
}

function deleteEntry(dateString) {
	const modal = $('#deleteEntryButton')
	const date = new Date(dateString)
	modal[0].addEventListener("click", function(event) {
		const currentUser = store.get('currentUser')
		let userData = store.get(currentUser)
		const entries = userData.entries
		const newEntries = entries.filter(entry => {
			const entryDate = (new Date(entry.date)).toString()
			if (entryDate != date.toString()) {
				return entry
			}
		})
		userData.entries = newEntries
		store.set(currentUser, userData)
		location.reload()
	  })
}
