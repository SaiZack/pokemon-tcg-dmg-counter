import { Area } from './Area.js';

export class AreaRepo {
    constructor() {
        this.areas = JSON.parse(localStorage.getItem('areas')) || [];
    }

    saveToLocalStorage() {
        localStorage.setItem('areas', JSON.stringify(this.areas));
    }

    createArea(pokemon, hp, battle_id, place) {
        const area = new Area(pokemon, hp, battle_id, place);
        this.areas.push(area);
        this.saveToLocalStorage();
        return area;
    }

    putDmgCounter(dmg, battle_id, place) {
        const area = this.areas.find(a => a.battle_id === battle_id && a.place === place);
        if (area) {
            area.dmg += dmg;
            this.saveToLocalStorage();
        }
    }

    removeDmgCounter(dmg, battle_id, place) {
        const area = this.areas.find(a => a.battle_id === battle_id && a.place === place);
        if (area) {
            area.dmg -= dmg;
            this.saveToLocalStorage();
        }
    }

    // specialCondition(){

    // }

    switchArea(battle_id, place_1, place_2) {
        const area1 = this.areas.find(a => a.battle_id === battle_id && a.place === place_1);
        const area2 = this.areas.find(a => a.battle_id === battle_id && a.place === place_2);
        if (area1 && area2) {
            [area1.place, area2.place] = [area2.place, area1.place];
            this.saveToLocalStorage();
        }
    }

    addHp(dmg, battle_id, place) {
        const area = this.areas.find(a => a.battle_id === battle_id && a.place === place);
        if (area) {
            area.hp += hp;
            this.saveToLocalStorage();
        }
    }

    getAreasByBattle(battle_id) {
        return this.areas.filter(area => area.battle_id === battle_id);
    }

    deleteAreasByBattle(battle_id) {
        this.areas = this.areas.filter(area => area.battle_id !== battle_id);
        this.saveToLocalStorage();
    }
}

const areaRepo = new AreaRepo();
export { areaRepo }
