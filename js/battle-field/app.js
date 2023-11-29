import { playerRepo } from '../../class/PlayerRepo.js';
import { matchRepo } from '../../class/MatchRepo.js';
import { battleRepo } from '../../class/BattleRepo.js';
import { areaRepo } from '../../class/AreaRepo.js';

$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    const match_id = params.get("matchId");
    const title = $('#modal_title')
    const battles = battleRepo.getBattlesByMatch(match_id);
    var players = [];

    for (var battle of battles) {
        players[battle.player_position] = playerRepo.getPlayerById(battle.player_id)
    }
    hideModalComponents()

    $('.winner-select').hide()
    for (var position in players) {
        $('.winner-select div.row').append(`
            <div class="col-sm-6 col-md-4 p-2">
                <input type="radio" class="btn-check" name="winner" id="${position}-player" value="${players[position].id}">
                <label class="btn btn-outline-warning w-100 h-100" for="${position}-player">${players[position].name}</label>
            </div>
        `);
    }

    $('#coin_flip').click(function () {
        $('.coin-container').show()
        $('.head-count').html(0)
        $('.tail-count').html(0)
        title.html('Coin Flip')
        const coin = ['heads', 'tails']
        var idx = Math.floor(Math.random() * 2);
        $('#coin').removeClass();
        $('#coin').addClass(coin[idx]);
    })

    $('#end_menu').click(function () {
        title.html('End Battle')
        $('.end-container').show()
    })

    $('#setting_modal').on('hidden.bs.modal', hideModalComponents);

    $('.end-container .btn-check:not(.not-complete)').click(() => {
        $('.winner-select').show()
    })
    $('.end-container .btn-check.not-complete').click(() => {
        $('.winner-select').hide()
    })

    $('#confirm_exit').click(function () {
        const complete_status = $('input.btn-check[name="condition"]:checked').val()
        matchRepo.endMatch(match_id, complete_status)
        if (complete_status > 0) {
            const player_id = $("input[name='winner']:checked").val();
            battleRepo.winBattle(match_id, player_id)
            playerRepo.addWinCount(player_id)
        }
        window.location.href = "/lists.html#history"
    })

    // pokemon select
    const v = $('#v_modal');
    // const s = $('#s_modal');

    v.on('show.bs.modal', function (event) {
        // const btn = $(event.relatedTarget).find('.poke-name');
        const place = $(event.relatedTarget).attr('id')
        const status = $(event.relatedTarget).data('status')
        changeForm(status, place, v)

    });

    // $('.add-btn').click(function(){
    //     id = $(this).data('place');
    //     console.log(id)
    // })

    // s.on('show.bs.modal', function (event) {
    //     btn = $(event.relatedTarget).find('.poke-name');
    //     modal_title = s.find('.modal-title')
    //     modal_title.text(btn.text())
    // });

    // $('.modal').on('hide.bs.modal', function (e){
    //     select = $(this).find('.select2').val(null)
    //     select.trigger('change')
    //     $(this).find('input').val(null)
    // })

    var poke_select = $('.poke-select');

    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon?limit=2023&offset=0",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data.results, function (index, optionData) {
                poke_select.append($('<option>', {
                    value: optionData.name,
                    text: optionData.name
                }));
            });

            poke_select.select2({
                width: '100%',
                dropdownParent: poke_select.parent(),
                cache: true,
                allowClear: true,
            });
        },
        error: function (xhr, status, error) {
            console.error(status + ": " + error);
        }
    });

    poke_select.on('change', function () {
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/"+$(this).val(),
            method: "GET",
            dataType: "json",
            success: function (data) {
                $('#v_img').addClass('fa-bounce')
                $('#v_img').attr('src', data.sprites.front_default)
                setTimeout(function () {
                    $('#v_img').removeClass('fa-bounce')
                }, 1000);
            },
            error: function (xhr, status, error) {
                $('#v_img').attr('src', 'img/logo.png')
            }
        });
    })
})

function hideModalComponents() {
    $('.modal-body').hide()
    $('.modal-footer').hide()
}

function changeForm(status, place, model) {
    if (status == 'empty') {
        const form = model.find('form')
        const submit = model.find('.choose-btn')

        $('.modal-title').text('Choose Pokemon')
        $('.choose-form').show()

        submit.click(function(){
            const formData = form.serializeArray();

            const formObject = {};
            formData.forEach(function (input) {
                formObject[input.name] = input.value;
            });
        console.log(formObject);

        })

    } else {
        $('.choose-form').hide()
    }
}