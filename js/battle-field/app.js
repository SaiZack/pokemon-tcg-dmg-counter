import { playerRepo } from '../../class/PlayerRepo.js';
import { matchRepo } from '../../class/MatchRepo.js';
import { battleRepo } from '../../class/BattleRepo.js';

$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    const match_id = params.get("matchId");
    const title = $('#modal_title')
    // console.log(matchRepo.getAllMatches(), match_id); 

    $('#coin_flip').click(function(){
        title.html('Coin Flip')
        const coin = ['heads', 'tails']
        var idx = Math.floor(Math.random() * 2);
        $('#coin').removeClass();
        $('#coin').addClass(coin[idx]);
    })
    $('#pause_menu').click(function(){
        title.html('Pause Game')
    })
})

