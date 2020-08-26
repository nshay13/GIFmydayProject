const apiKey = "lY2dednJ2mRy4NK2b5GjX3Y86B2GolfX"
const url = 'http://api.giphy.com'

const maxResultsPerPage = 20
const maxResults = 100 //default 25

function search() {
    const q = $('#searchTerm').val().replace(/^\s+|\s+$/g, '')
    const results = searchGif(q)
}

// Gif Search
// ("queryString") -> [{}, {}]
function searchGif(q) {
    const fullUrl = url + '/v1/gifs/search'

    $.get(fullUrl, {"q": q, "api_key": apiKey, "limit": maxResults})
        .then((response) => {
            let result = []
            response.data.forEach((obj) => {
                result.push({
                    id: obj.id,
                    url: obj.images.original.url,
                    rating: obj.rating,
                    original_still: obj.original_still,
                    title: obj.title
                })
            })
            placeResults(result)
        })
        .catch((err) => {
            throw err
        })
}

// GIFs by IDs
// (['id1', 'id2']) -> [{}, {}]
function getGIF(ids) {
    client.gifsByIDs({"ids": id, "limit": maxResults })
      .then((response) => {
          let result = []
            response.data.forEach((obj) => {
                result.push({
                    id: obj.id,
                    url: obj.images.original.url,
                    rating: obj.rating,
                    original_still: obj.original_still,
                    title: obj.title
                })
            })

          return result
      })
      .catch((err) => {
          throw err
      })
}

function placeResults(results) {
    $('#mini-container').empty()
    results.forEach((obj) => {
        $('#mini-container').append(`<img class='gifSearchResult' src=${obj.url} alt="${obj.title}" onclick=chooseGif("${obj.id}")>`)
    })
    addGifMetaData(results)
}
