/* Chave api */
const API_key = '67afc18df6c5db74e2d72db26d2b8111'

const url = 'https://api.themoviedb.org/3/search/movie?language=pt-br&sort_by=popularity&include_video=1&api_key=67afc18df6c5db74e2d72db26d2b8111'

const campoPesquisa = document.querySelector('#inputValue');

$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let valorPesquisa = $(campoPesquisa).val();
        getMovies(url, valorPesquisa);
        e.preventDefault();
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
                <div class="lista-filmes">
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
                    </div>

                    <div class="genero-filme">

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
            paginacao()
        })


}

function paginacao() {
    const quantidadeFilme = document.querySelectorAll('.lista-filmes');

    let perPage = 3;
    const state = {
        page: 1,
        perPage,
        totalPage: Math.ceil(quantidadeFilme.length / perPage)
    }

    console.log(state.totalPage);

    const controls = {
        next() {
            state.page++

            /* const lastPage = state.page > state.totalPage */
            if (state.page > state.totalPage) {
                state.page--
            }
        },
        prev() {
            state.page--

            if (state.page < 1) {
                state.page++
            }
        },
        goTo() { }
    }

    console.log(state.page);
    controls.next()
    console.log(state.page);
    console.prev()
    console.log(state.page);

}