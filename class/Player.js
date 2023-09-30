export class Player {
    constructor(name, winCount = 0, totalPlay = 0) {
        this.id = Player.generateUniqueId();
        this.name = name;
        this.winCount = winCount;
        this.totalPlay = totalPlay;
    }

    static generateUniqueId() {
        if (!Player.counter) {
            Player.counter = 1;
        } else {
            Player.counter++;
        }
        return Player.counter;
    }
}
