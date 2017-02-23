
var makeLeftCol = function(userObj) {
	var leftColNode = document.querySelector('.leftCol')
	var leftHtml = ''
	leftHtml += "<img src='" + userObj.avatar_url + "' class='profileImg'>"
	leftHtml += "<h2 class='name'>" + userObj.name + "</h2>"
	leftHtml += "<p class='username'>" + userObj.login + "</p>"
	leftHtml += "<p class='bio'>" + userObj.bio + "</p>"
	leftHtml += "<p class='location'>" + userObj.location + "</p>"
	leftHtml += "<a href='" + userObj.email + "' class='email'>" + userObj.email + "</a>"
	leftColNode.innerHTML = leftHtml
}

var makeRepo = function(singleRepoObj) {
	var repoHtml = ''
	repoHtml += "<div class='repo'>"
	repoHtml += "<a href='" + singleRepoObj.html_url + "' class='repoName'>" + singleRepoObj.name + "</a>"
	if (singleRepoObj.description) {
		repoHtml += "<p class='description'>" + singleRepoObj.description + "</p>"
	}
	if (singleRepoObj.language) {
		repoHtml += "<p class='language'>" + singleRepoObj.language + "</p>"
	}
	repoHtml += "</div>"
	return repoHtml
}

var makeRightCol = function(repoArray) {
	var rightColNode = document.querySelector('.rightCol')
	var rightHtml = ''
	for (var i = 0; i < repoArray.length; i++) {
		rightHtml += makeRepo(repoArray[i])
	}
	rightColNode.innerHTML = rightHtml
}

var loadUser = function(userName) {
	var userUrl = 'https://api.github.com/users/' + userName
	var userRepo = 'https://api.github.com/users/' + userName + '/repos'
	var userPromise = $.getJSON(userUrl)
	var repoPromise = $.getJSON(userRepo)
	userPromise.then(makeLeftCol)
	repoPromise.then(makeRightCol)
}

loadUser('hankh18')

var inputSearch = document.querySelector('.userSearch')

inputSearch.addEventListener('keydown', function(eventObj) {
	if (eventObj.keyCode === 13) {
		loadUser(eventObj.target.value)
		eventObj.target.value = ''
	}
})
