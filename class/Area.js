export class Area {
    constructor(pokemon = null, hp = 0, dmg = 0, battle_id, place, psy = 0, phy = 0) {
        this.id = Area.generateUniqueId();
        this.pokemon = pokemon;
        this.hp = hp;
        this.dmg = dmg;
        this.battle_id = battle_id;
        this.place = place;
        this.psy = psy; 
        /* special conditions (psychologically)
            1. asleep
            2. paralyzed
            3. confused 
        */

        this.phy = phy; 
        /* special conditions (physically)
            1. burn
            2. poison
        */
    }

    static generateUniqueId() {
        const timestamp = Date.now().toString(36);
        const randomString = Math.random().toString(36).substr(2, 2);
        return timestamp + randomString;
    }
}
