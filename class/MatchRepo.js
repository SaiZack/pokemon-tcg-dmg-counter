import { Match } from './Match.js';

export class MatchRepo {
    constructor() {
        this.matches = JSON.parse(localStorage.getItem('matches')) || [];
    }

    saveToLocalStorage() {
        localStorage.setItem('matches', JSON.stringify(this.matches));
    }

    currentDatetime(){
        const date = new Date()
        const options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const current = date.toLocaleString("en-UK", { timeZone: "Asia/Yangon", ...options })
        return current;
    }

    createMatch() {
        const start_datetime = this.currentDatetime();
        const match = new Match(start_datetime);
        this.matches.push(match);
        this.saveToLocalStorage();
        return match;
    }

    endMatch(matchId, complete_status) {
        const match = this.matches.find(m => m.id === matchId);
        if (match) {
            match.end_datetime = this.currentDatetime();
            match.complete_status = complete_status;
            this.saveToLocalStorage();
        }
    }

    deleteMatch(matchId) {
        const index = this.matches.findIndex(m => m.id === matchId);
        if (index !== -1) {
            this.matches.splice(index, 1);
            this.saveToLocalStorage();
        }
    }

    getAllMatches() {
        return this.matches;
    }
    getOngoingMatches() {
        return this.matches.filter(match => match.end_datetime === null || match.complete_status == 0);
    }

    getCompletedMatches() {
        return this.matches.filter(match => match.end_datetime !== null && match.complete_status != 0);
    }

    getMatchById(matchId) {
        return this.matches.find(match => match.id === matchId);
    }
    deleteAll() {
        this.matches = []; 
        this.saveToLocalStorage();
    }
}

const matchRepo = new MatchRepo();
export { matchRepo }
