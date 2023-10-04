export class Match {
    constructor(start_datetime = null, end_datetime = null, complete_status = 0) {
        this.id = Match.generateUniqueId();
        this.start_datetime = start_datetime;
        this.end_datetime = end_datetime;
        this.complete_status = complete_status;
    }

    static generateUniqueId() {
        const timestamp = Date.now().toString(36);
        const randomString = Math.random().toString(36).substr(2, 2);
        return timestamp + randomString;
    }
}
