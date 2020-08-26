var chosenGif = {}
var currentUser = store.get('currentUser')
var date = new Date() //use this variable to add custom date

function displayGifResults() {
    const q = $('#gifSearchTerm').val().replace(/^\s+|\s+$/g, '')
    if (q == ''){
        alert('Please enter a search term.')
    } else {
        searchGif(q)
    }
}

function chooseGif(id) {
    const obj = store.get('gifMetaData')[id]
    chosenGif = obj
    $('#mini-container2').empty()
    $('#mini-container2').append(`<img class='gifSelected' src=${obj.url} alt="${obj.title}">`)
}

function submitEntry(){
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const text = $('#entry').val().replace(/^\s+|\s+$/g, '')
    if (!text) {
        alert('Please write about your day!')
        return
    } else if (Object.keys(chosenGif).length === 0) {
        alert('Please pick a GIF!')
        return
    }
    enteredDate = document.getElementById("datelabel").innerHTML;
    enteredTime = document.getElementById("entrytime").value;
    notes = document.getElementById("entry").value;
    // console.log(notes);
    dateArray = enteredDate.split(' ');
    timeArray = enteredTime.split(":");
    month = months.indexOf(dateArray[0]);
    year = parseInt(dateArray[2])
    day = parseInt(dateArray[1])
    // dateStr = dateArray[2]+'-'+month+'-'+dateArray[1]+'T'+enteredTime+'-05:00';
    // console.log(dateStr);
    // pageDate = new Date(dateStr);

    d = new Date(year, month, day, timeArray[0], timeArray[1], timeArray[2]);
    // console.log(pageDate);
    // console.log(enteredDate);
    // console.log(enteredTime);

    username = store.get('currentUser');
    currUser = store.get(username);
    entries = currUser.entries;
    // console.log(entries[0].date);

    flag = 0
    for (i = 0; i < entries.length; i++) {
        entry = entries[i];
        entrydate = new Date(entry.date).toString();
        // console.log(entrydate);
        if (entrydate.includes(enteredDate) && entrydate.includes(enteredTime)) {
            console.log('Entry exists, overwriting...');
            edit_entry(username, i, notes, chosenGif);
            flag = 1
            break;
        }
    }
    if (flag == 0) {
        console.log('No existing entry, creating new...');
        add_entry(username, d, notes, chosenGif);
    }
    const dayViewUrl = 'days.html?' + encodeURIComponent(d)
    console.log(dayViewUrl);
    document.location = dayViewUrl
}