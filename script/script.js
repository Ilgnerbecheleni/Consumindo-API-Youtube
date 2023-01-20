
// Your API key
var apiKey = 'SUA_KEY';



let videoList = document.getElementById('video-list');
let frmbuscar = document.getElementById('frmbusca');
let seacrh = document.getElementById('search');
let btnlimpar = document.getElementById('limpar');
let loading = document.getElementById('loading')


frmbuscar.addEventListener('submit', (e) => {
    e.preventDefault();
    limpar();
    let searchTerm;

    searchTerm = seacrh.value;

    if (searchTerm) {
        buscar(searchTerm);

    } else {
        alert('digite o titulo do video')
    }


});



function limpar() {
    videoList.innerHTML = '';
}


function buscar(searchTerm) {

    loading.classList.remove('hidden');
    // Requisição da API
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&type=video&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            // Reinderiza no html
            data.items.forEach(function (item) {
                var videoId = item.id.videoId;
                var title = item.snippet.title;
                var description = item.snippet.description;
                var thumbnail = item.snippet.thumbnails.default.url;
                var videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

                videoList.innerHTML += `

        <div class="card m-3" style="width: 15rem; heigth:30rem">
        <img src="${thumbnail}" class="card-img-top" alt="${title}">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
            <a href="${videoUrl}" class="btn btn-danger">Assistir</a>
        </div>

               `;
            });
        }).finally(() => {
            loading.classList.add('hidden');
        });

}



