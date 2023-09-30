import { playerRepo } from '../../class/PlayerRepo.js';


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
        let i =  1

        switch (id) {
            // case "history":
            // case "ongoing":
            // case "pokemon":
            case "player":
                data = playerRepo.getAllPlayers();
                cols = [
                    {
                        data: null,
                        title: '#',
                        render: ()=>{return i++},
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
                $('#player').clear().draw();
                data = playerRepo.getAllPlayers();
                $('#player').rows.add(data).draw();
            }
        });
    });
})

