import { playerRepo } from '../../class/PlayerRepo.js';
import { matchRepo } from '../../class/MatchRepo.js';
import { battleRepo } from '../../class/BattleRepo.js';

$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    const match_id = params.get("matchId");
    const title = $('#modal_title')
    const battles = battleRepo.getBattlesByMatch(match_id);
    var players = [];
    console.log(matchRepo.getMatchById(match_id))
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

    $('#confirm_exit').click(function(){
        const complete_status = $('input.btn-check[name="condition"]:checked').val()
        matchRepo.endMatch(match_id, complete_status)
        if(complete_status > 0){
            
        }
        console.log(matchRepo.getMatchById(match_id))

    })

})

function hideModalComponents() {
    $('.modal-body').hide()
    $('.modal-footer').hide()
}