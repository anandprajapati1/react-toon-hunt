import { ACTIONS_TYPE, SORT_ORDER } from "./actions";

let initialState = [];
let currentFilter = {};
const setInitialState = (s) => {
    initialState = [...s];
    currentFilter[ACTIONS_TYPE.UPDATE_FILTER] = [{ key: "", value: [""] }];
    currentFilter[ACTIONS_TYPE.SEARCH] = "";
    currentFilter[ACTIONS_TYPE.SORT_BY_KEY] = { key: "", order: "ASC" };
};

export const listReducer = (state = [], action) => {
    if (Object.keys(ACTIONS_TYPE).indexOf(action.type) > -1) {
        if (!initialState.length) {
            setInitialState(state);
        }

        //PREPARE FILTER STATE
        switch (action.type) {
            // log
            case ACTIONS_TYPE.UPDATE_FILTER:
                currentFilter[ACTIONS_TYPE.UPDATE_FILTER] = currentFilter[ACTIONS_TYPE.UPDATE_FILTER].concat(action.filterparam);
                break;
            case ACTIONS_TYPE.REMOVE_FILTER:
                // console.log('remove filter', currentFilter[ACTIONS_TYPE.UPDATE_FILTER], action.filterparam[0]);

                let test = currentFilter[ACTIONS_TYPE.UPDATE_FILTER].map(x => {
                    let i = x.value.indexOf(action.filterparam[0].value[0]);

                    // console.log(x.key, action.filterparam[0].key, x.value);
                    if (x.key === action.filterparam[0].key && i > -1) {
                        x.value.splice(i, 1);
                    }
                    return x;
                });
                break;
            case ACTIONS_TYPE.SEARCH:
                currentFilter[ACTIONS_TYPE.SEARCH] = action.searchKey;
                break;
            case ACTIONS_TYPE.SORT_BY_KEY:
                currentFilter[ACTIONS_TYPE.SORT_BY_KEY] = { key: action.key, order: action.order };
                break;
            default:
                //>>Reset filter
                setInitialState(initialState);
                break;
        }

        //>> INITIAL state of DATA
        let filteredData = Object.assign([], initialState);

        //PEROFRM FILTER here
        if (currentFilter[ACTIONS_TYPE.UPDATE_FILTER].length) {
            filteredData = Object.assign([], initialState);
            currentFilter[ACTIONS_TYPE.UPDATE_FILTER].forEach(p => {
                let reg = new RegExp(p.value.join("|"), 'i');
                filteredData = filteredData.filter(item => reg.test(item[p.key.toLowerCase()]));
            });
        }

        //PERFORM SEARCH here
        let reg = new RegExp(currentFilter[ACTIONS_TYPE.SEARCH], 'i');
        filteredData = filteredData.filter(item => reg.test(item.name));

        //Perform sort
        //>> Default sort ASCENDING
        switch (currentFilter[ACTIONS_TYPE.SORT_BY_KEY].key) {
            case "DATE":
                filteredData = filteredData.sort((a, b) => Date.parse(a.created) - Date.parse(b.created));
                break;
            case "name":
                filteredData = filteredData.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1);
                break;
            case "id":
                filteredData = filteredData.sort((a, b) => a.id - b.id);
                break;
            default:
                break;
        }

        if (currentFilter[ACTIONS_TYPE.SORT_BY_KEY].order === SORT_ORDER.DESC) {
            filteredData = filteredData.reverse();
        }
        // console.log("sort by", currentFilter);

        return filteredData;
    }
    return state;
};