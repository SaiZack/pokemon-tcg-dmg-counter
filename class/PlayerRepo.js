import { Player } from './Player.js';

export class PlayerRepo {
    constructor() {
        this.players = JSON.parse(localStorage.getItem('players')) || [];
    }

    saveToLocalStorage() {
        localStorage.setItem('players', JSON.stringify(this.players));
    }

    createPlayer(name) {
        const old = this.getPlayerByName(name)
        if(old){
            return old;
        } else {
            const player = new Player(name);
            this.players.push(player);
            this.saveToLocalStorage();
            return player;
        }
        
    }

    updatePlayer(playerId, newName) {
        const player = this.players.find(p => p.id === playerId);
        if (player) {
            player.name = newName;
            this.saveToLocalStorage();
        }
    }

    deletePlayer(playerId) {
        const index = this.players.findIndex(p => p.id === playerId);
        if (index !== -1) {
            this.players.splice(index, 1);
            this.saveToLocalStorage();
        }
    }

    getAllPlayers() {
        return this.players;
    }

    getPlayerById(playerId) {
        return this.players.find(player => player.id === playerId);
    }
    getPlayerByName(playerName) {
        return this.players.find(player => player.name === playerName);
    }
}

const playerRepo = new PlayerRepo();
export { playerRepo }
