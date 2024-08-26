import {MAIN_FIELDS} from "../views/Promeses";
import {CCell} from "../../../../declarations/backend/backend.did";

function rowToCells(row): Array<CCell> {
    let rowKeys = Object.keys(row);
    let cellsKeys = rowKeys.filter(key => !MAIN_FIELDS.includes(key))
    let cells = []
    cellsKeys.forEach(key => {
        if (key != 'id') {
            cells.push({field: key, value: row[key]})
        }

    })
    return cells
}

export default rowToCells
