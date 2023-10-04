// import { playerRepo } from '../../class/PlayerRepo.js';
import { matchRepo } from '../../class/MatchRepo.js';
// import { battleRepo } from '../../class/BattleRepo.js';

$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    const receivedData = params.get("matchId");
    console.log(matchRepo.getAllMatches()); 
})

