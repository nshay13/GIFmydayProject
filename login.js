var date = new Date();
// var store = require("store");

window.onload = function() {
	document.getElementById("registerbutton").onclick = function() {
		const username = document.getElementById("username").value;
		const hash = md5(document.getElementById("password").value);

		const prevUser = store.get(username);
		console.log(prevUser);
		if (typeof prevUser === "undefined") {
			console.log("New User initiated!");

			var allValues = {
				'name': username,
				'password': hash,
				'entries': []
			};

			store.set(username, allValues);
			store.set('currentUser', username);
			window.location.href = 'days.html';
			return false;
		} 
		else{
			alert("Please enter valid credentials!");
		}
	}

	document.getElementById("loginbutton").onclick = function() {
		const username = document.getElementById("username").value;
		const hash = md5(document.getElementById("password").value);

		const prevUser = store.get(username);
		console.log(prevUser);
		if (typeof prevUser === "undefined") {
			console.log("User does not exist");
			alert("Username does not exist! Check for typos or please register.");
		} 
		else {
			storedHash = prevUser.password;
			if (hash == storedHash && (storedHash != 'd41d8cd98f00b204e9800998ecf8427e')) {
				console.log("User recognized, login initiated");
				store.set('currentUser', username);
				//redirect to new page
				const current_Date = new Date()
				window.location.href = 'days.html?' + encodeURIComponent(current_Date);
				return false;
			} 
			else if(storedHash == 'd41d8cd98f00b204e9800998ecf8427e'){
				alert("Please enter valid credentials!");
			}		
			else{
				alert("Incorrect password! Please type again.");
			}
		}
	}
/* 
	document.getElementById("addbutton").onclick = function() {
		add_entry(username, "HELLO!", "gifDATAgoesHERE");
	}

	document.getElementById("editbutton").onclick = function() {
		edit_entry(username, "21:18:21", "BYE!", "gifDATAchangesHERE");
	}

	document.getElementById("deletebutton").onclick = function() {
		delete_entry(username, "21:59:57");
	} */
}
