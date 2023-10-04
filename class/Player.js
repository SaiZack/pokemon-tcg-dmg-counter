export class Player {
    constructor(name, winCount = 0, totalPlay = 0) {
        this.id = Player.generateUniqueId();
        this.name = name;
        this.winCount = winCount;
        this.totalPlay = totalPlay;
    }

    static generateUniqueId() {
        const timestamp = Date.now().toString(36);
        return timestamp;
    }
}
