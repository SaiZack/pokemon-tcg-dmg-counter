import { Battle } from './Battle.js';

export class BattleRepo {
    constructor() {
        this.battles = JSON.parse(localStorage.getItem('battles')) || [];
    }

    saveToLocalStorage() {
        localStorage.setItem('battles', JSON.stringify(this.battles));
    }

    createBattle(match_id, player_id, player_position) {
        const battle = new Battle(match_id, player_id, player_position);
        this.battles.push(battle);
        this.saveToLocalStorage();
        return battle;
    }

    winBattle(matchId, playerId) {
        const battle = this.battles.find(b => b.match_id === matchId && b.player_id === playerId);
        if (battle) {
            battle.win_status = 1;
            this.saveToLocalStorage();
        }
    }

    deleteBattle(battleId) {
        const index = this.battles.findIndex(m => m.id === battleId);
        if (index !== -1) {
            this.battles.splice(index, 1);
            this.saveToLocalStorage();
        }
    }

    getAllBattles() {
        return this.battles;
    }

    getBattlesByMatch(matchId) {
        return this.battles.filter(battle => battle.match_id === matchId);
    }
    deleteAll() {
        this.battles = []; 
        this.saveToLocalStorage();
    }
}

const battleRepo = new BattleRepo();
export { battleRepo }
