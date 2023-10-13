export class Battle {
    constructor(match_id, player_id, player_position, win_status = 0) {
        this.id = Battle.generateUniqueId();
        this.match_id = match_id;
        this.player_id = player_id;
        this.player_position = player_position;
        this.win_status = win_status;
    }

    static generateUniqueId() {
        const timestamp = Date.now().toString(36);
        const randomString = Math.random().toString(36).substr(2, 2);
        return randomString + timestamp;
    }
}
