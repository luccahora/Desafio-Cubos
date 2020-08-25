/* Chave api */
const API_key = '67afc18df6c5db74e2d72db26d2b8111'

const url = 'https://api.themoviedb.org/3/search/movie?language=pt-br&sort_by=popularity&include_video=1&api_key=67afc18df6c5db74e2d72db26d2b8111'

const campoPesquisa = document.querySelector('#inputValue');

$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let valorPesquisa = $(campoPesquisa).val();
        getMovies(url, valorPesquisa);
        e.preventDefault();
        /* window.location = 'filme-detalhes.html' */
    });
});

function getMovies(url, valorPesquisa) {
    let output = '';
    let posterFilme = `https://image.tmdb.org/t/p/w220_and_h330_face/`
    const novaUrl = `${url}&query="${valorPesquisa}`
    fetch(novaUrl)
        .then(res => res.json())
        .then(res => {

            filmes = res.results;

            $.each(filmes, (index, filme) => {
                output += `

                <div class="lista-filmes" onclick="movieSelected('${filme.id}')">
                <img src="${posterFilme}${filme.poster_path}" alt="">
                <div class="infomacoes-filme">
        
                    <div class="nome-filme">
                        <h2>${filme.title}</h2>
                    </div>
        
                    <div class="descricao-filme">
        
                        <div class="porcentagem-filme">
                            <p>${filme.vote_average * 10}%</p>
                        </div>
        
                        <div class="data-filme">
                            <p>${filme.release_date}</p>
                        </div>
        
                        <div class="sinopse-filme">
                            <p>${filme.overview}</p>
        
                            <div class="genero">
                                <span>${filme.genre_ids[0]}</span>
                                <span>${filme.genre_ids[1]}</span>
                                <span>${filme.genre_ids[2]}</span>
                            </div>
                        </div>
        
                    </div>
        
                </div>
            </div>

            `;
            });

            $('#movies').html(output);
            $('#movies').paginate({ 'perPage': 5 });
            $('#movies').paginate({ 'scope': $('div') });

        })
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id)
    window.location = 'filme-detalhes.html';
    return false
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    let output = '';

    let posterFilme = `https://image.tmdb.org/t/p/w220_and_h330_face/`
    const urlFilme = `https://api.themoviedb.org/3/movie/${movieId}?api_key=67afc18df6c5db74e2d72db26d2b8111&language=pt-br`


    fetch(urlFilme).then(response => {
        return response.json();
    })
        .then(filme => {
            
            output +=`
                <div class="container-filme">
                <div class="cabecalho-filme">
                    <h1>${filme.title}</h1>
                    <p>${filme.release_date}</p>
                </div>
                <div class="descricao-filme">
                    <div class="informacoes-filme">

                        <div class="sinopse">
                            <h3 class="titulo-descricao">Sinopse</h3>

                            <p>${filme.overview}</p>
                        </div>

                        <div class="informacao">
                            <h3 class="titulo-descricao">Informações</h3>

                            <div class="informacoes-adicionais">
                                <div>
                                    <h4>Situação</h4>
                                    <p>${filme.status}</p>
                                </div>

                                <div>
                                    <h4>Idioma</h4>
                                    <p>${filme.original_language}</p>
                                </div>

                                <div>
                                    <h4>Duração</h4>
                                    <p>${filme.runtime} min</p>
                                </div>
                               
                                <div>
                                    <h4>Orçamento</h4>
                                    <p>$${(filme.budget).toLocaleString('pt-BR')}</p>
                                </div>

                                <div>
                                    <h4>Receita</h4>
                                    <p>$${(filme.revenue).toLocaleString('pt-BR')}</p>
                                </div>

                                <div>
                                    <h4>Lucro</h4>
                                    <p>$673.977.000,00</p>
                                </div>
                            </div>
                        </div>

                        <div class="categoria-porcentagem">
                            <div class="genero-filme">
                                <div class="genero">
                                    <span>Ação</span>
                                    <span>Aventura</span>
                                    <span>Fantasia</span>
                                </div>
                            </div>
                            <div class="porcentagem-filme-detalhes">
                                <p>${filme.vote_average * 10}%</p>
                            </div>
                        </div>

                    </div>
                    <div class="poster-filme">
                        <img src="${posterFilme}${filme.poster_path}" alt="">
                    </div>
                </div>
            </div>
            `
            $('#detalhe-filme').html(output);

        })


}

