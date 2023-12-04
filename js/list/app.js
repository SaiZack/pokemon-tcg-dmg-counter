import { playerRepo } from '../../class/PlayerRepo.js';
import { matchRepo } from '../../class/MatchRepo.js';
import { battleRepo } from '../../class/BattleRepo.js';


$(document).ready(function () {
    const hash = window.location.hash;
    if (hash) {
        $(`#listTab button[data-bs-target="${hash}-pane"]`).tab('show');
        initDataTable($(`${hash}.data-table`));
    } else {
        const tabs = ['#history', '#ongoing', '#player', '#pokemon']
        const idx = Math.floor(Math.random() * tabs.length);
        $(`#listTab button[data-bs-target="${tabs[idx]}-pane"]`).tab('show');
        initDataTable($(`${tabs[idx]}.data-table`));
    }
    function initDataTable(table) {
        const id = table.attr('id');
        let data, cols;
        let i = 1

        switch (id) {
            case "history":
                data = matchRepo.getCompletedMatches();
                cols = [
                    {
                        data: null,
                        title: '#',
                        render: () => { return i++ },
                    },
                    // {
                    //     data: null,
                    //     title: "Players",
                    //     render: function (data, type, row) {
                    //         var battles = battleRepo.getBattlesByMatch(data.id)
                    //         var scarlet = playerRepo.getPlayerById(battles[0].player_id)
                    //         var violet = playerRepo.getPlayerById(battles[1].player_id)

                    //         return scarlet.name + " vs " + violet.name
                    //     }
                    // },
                    { data: 'start_datetime', title: 'Start Date Time' },
                    { data: 'end_datetime', title: 'End Date Time' },
                    { 
                        data: 'complete_status', 
                        title: 'Complete Status',
                        render: function (data, type, row) {
                            return complete_conditions[data];
                        } 
                    },
                    {
                        data: null,
                        title: "Delete",
                        render: function (data, type, row) {
                            const deleteBtn = `<i class="fa fa-trash delete-match text-danger cursor-pointer" data-match-id="${row.id}" data-table="history"></i>`;
                            return deleteBtn;
                        }
                    }
                ];
                break;
            case "ongoing":
                data = matchRepo.getOngoingMatches();
                cols = [
                    {
                        data: null,
                        title: '#',
                        render: () => { return i++ },
                    },
                    // {
                    //     data: null,
                    //     title: "Players",
                    //     render: function (data, type, row) {
                    //         var battles = battleRepo.getBattlesByMatch(data.id)
                    //         var scarlet = playerRepo.getPlayerById(battles[0].player_id)
                    //         var violet = playerRepo.getPlayerById(battles[1].player_id)
                    //         return scarlet.name + " vs " + violet.name
                    //     }
                    // },
                    { data: 'start_datetime', title: 'Start Date Time' },
                    {
                        data: null,
                        title: "Delete",
                        render: function (data, type, row) {
                            const deleteBtn = `<i class="fa fa-trash delete-match text-danger cursor-pointer" data-match-id="${row.id}" data-table="ongoing"></i>`;
                            return deleteBtn;
                        }
                    }
                ];
                break;
            case "pokemon":
            case "player":
                data = playerRepo.getAllPlayers();
                cols = [
                    {
                        data: null,
                        title: '#',
                        render: () => { return i++ },
                    },
                    { data: 'name', title: 'Name' },
                    { data: 'winCount', title: 'Win Count' },
                    { data: 'totalPlay', title: 'Total Play' },
                    {
                        data: null,
                        title: 'Win Rate (%)',
                        render: function (data, type, row) {
                            const winRate = row.totalPlay === 0 ? 0 : (row.winCount / row.totalPlay) * 100;
                            return winRate.toFixed(2) + '%';
                        }
                    },
                    {
                        data: null,
                        title: "Delete",
                        render: function (data, type, row) {
                            const deleteBtn = `<i class="fa fa-trash delete-player text-danger cursor-pointer" data-player-id="${row.id}" data-player-name="${row.name}"></i>`;
                            return deleteBtn;
                        }
                    }
                ];
                break;
        }
        table.DataTable({
            responsive: true,
            rowReorder: {
                selector: 'td:nth-child(2)'
            },
            data: data,
            columns: cols,
        });
    }

    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        const pane = $(e.target).data('bs-target');
        const table = $(pane).find('.data-table');

        if (!table.hasClass('dataTable')) {
            initDataTable(table);
        }
    });

    $(document).on('click', '.delete-player', function () {
        const id = $(this).data('player-id')
        const name = $(this).data('player-name')
        Swal.fire({
            title: 'Delete Player',
            text: `Do you want to delete ${name}'s record? This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                playerRepo.deletePlayer(id)
                $('#player').DataTable().destroy();
                initDataTable($(`#player.data-table`));
            }
        });
    });
    $(document).on('click', '.delete-match', function () {
        const id = $(this).data('match-id')
        const table = $(this).data('table')
        Swal.fire({
            title: 'Delete Player',
            text: `Do you want to delete this match? This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                matchRepo.deleteMatch(id)
                $(`#${table}`).DataTable().destroy();
                initDataTable($(`#${table}`));
            }
        });
    });

    const container = $('#pokemon-pane');
    const pokedex = $('#pokedex');
    let offset = 0;
    const limit = 12;
    let isLoading = false;

    function loadMoreData() {
        if (isLoading) return;
        
        const containerHeight = container.height();
        const scrollTop = container.scrollTop();
        const scrollHeight = pokedex.height();
        const remainingHeight = scrollHeight - scrollTop - containerHeight;

        if (remainingHeight <= 100) {
            isLoading = true;
            $.ajax({
                url: `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
                method: "GET",
                dataType: "json",
                success: function (data) {
                    const promises = data.results.map(pokemon => pokemonInfo(pokemon.url));
                    Promise.all(promises)
                        .then(pokemonData => {
                            pokemonData.forEach(pokemon => {
                                $('#pokedex').append(createPokemonHTML(pokemon));
                            });

                            offset += limit;
                            isLoading = false;
                        })
                        .catch(error => {
                            console.error("Error fetching Pokemon data: " + error);
                            isLoading = false;
                        });
                },
                error: function (xhr, status, error) {
                    console.error(status + ": " + error);
                    isLoading = false;
                }
            });
        }
    }

    function pokemonInfo(url) {
        return $.ajax({
            url: url,
            method: "GET",
            dataType: "json"
        });
    }

    function createPokemonHTML(pokemon) {
        const types = pokemon.types.map(type => `
            <span class="pe-1 pb-1">
                <span class="badge rounded-pill px-sm-4 px-2" style="background : var(--${type.type.name}-type)">${type.type.name}</span>
            </span>
        `).join('');

        return `
            <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank" class="col-6 col-lg-3 p-1 p-sm-3 text-decoration-none">
                <div class="bg-light rounded pokedex-body h-100">
                    <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="" width="100%" class="pokedex-img">
                    <div class="pokedex-footer">
                        <div class="text-center fw-bold text-dark">${pokemon.name.toUpperCase()}</div>
                        <div class="d-flex flex-wrap mt-2">
                            ${types}
                        </div>
                    </div>
                </div>
            </a>
        `;
    }
    container.on('scroll', loadMoreData);
    loadMoreData();

})

