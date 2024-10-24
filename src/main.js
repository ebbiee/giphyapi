import $ from 'jquery';
import './css/styles.css';


$(document).ready(function(){
    $(".giphy").click(function(){
        let giphyInput = $("#searchInput").val().toUpperCase().trim("");
        $('#searchInput').val("");
        console.log(giphyInput)

        let promise = new Promise(function(resolve, reject){
            let request = new XMLHttpRequest();
            const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${giphyInput}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
            request.onload = function() {
              if (this.status === 200) {
                resolve(request.response);
              } else {
                reject(request.response);
              }
            }
            request.open("GET", url, true);
            request.send();
            console.log(process.env.API_KEY)
        })
        promise.then(function(response) {
            const body = JSON.parse(response);
            const grid = document.getElementById('giphyGrid');

            const gifs = body.data.map(gif => `
                <div class="giphy-item">
                    <img src="${gif.images.original.url}" alt="${gif.title}">
                </div>
            `).join('');
            grid.innerHTML = gifs;
          }, function(error) {
            $('.showErrors').text(`There was an error processing your request: ${error}`);
          });
    })
})