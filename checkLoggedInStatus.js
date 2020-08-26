window.onload = function() {
    checkLoggedIn()
}

function checkLoggedIn() {
    if (store.get('currentUser') == undefined) {
        document.location = 'login.html'
    }
}
