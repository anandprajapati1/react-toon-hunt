import { ACTIONS_TYPE, FETCH_ACTIONS_TYPE, SORT_ORDER } from "./actions";
import { filterType } from "../lib/constants";

const initialState = {
    pending: false,
    results: [],
    error: null,
    filters: [],
    currentFilter: {}
};
// let currentFilter = {};
const setInitialState = (s) => {
    initialState.results = [...s];
    initialState.currentFilter[ACTIONS_TYPE.UPDATE_FILTER] = [{ key: "", value: [""] }];
    initialState.currentFilter[ACTIONS_TYPE.SEARCH] = "";
    initialState.currentFilter[ACTIONS_TYPE.SORT_BY_KEY] = { key: "", order: "ASC" };
};


export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACTIONS_TYPE.FETCH_PRODUCTS_PENDING:
            return {
                ...state,
                pending: true
            };
        case FETCH_ACTIONS_TYPE.FETCH_PRODUCTS_SUCCESS:
            setInitialState(action.results);
            return {
                ...state,
                pending: false,
                results: action.results
            };
        case FETCH_ACTIONS_TYPE.FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            };
        case ACTIONS_TYPE.UPDATE_FILTER: {
            let _f = initialState.currentFilter[ACTIONS_TYPE.UPDATE_FILTER].filter(x => x.key === action.filterparam[0].key);
            if (_f.length) {
                if (_f[0].value.indexOf(action.filterparam[0].value[0]) === -1) {
                    _f[0].value = [..._f[0].value, action.filterparam[0].value[0]];
                }
            } else {
                initialState.currentFilter[ACTIONS_TYPE.UPDATE_FILTER] = initialState.currentFilter[ACTIONS_TYPE.UPDATE_FILTER].concat(action.filterparam);
            }
            break;
        }
        case ACTIONS_TYPE.REMOVE_FILTER:
            initialState.currentFilter[ACTIONS_TYPE.UPDATE_FILTER].map(x => {
                let i = x.value.indexOf(action.filterparam[0].value[0]);

                if (x.key === action.filterparam[0].key && i > -1) {
                    x.value.splice(i, 1);
                }
                return x;
            });
            break;
        case ACTIONS_TYPE.SEARCH:
            initialState.currentFilter[ACTIONS_TYPE.SEARCH] = action.searchKey;
            break;
        case ACTIONS_TYPE.SORT_BY_KEY:
            initialState.currentFilter[ACTIONS_TYPE.SORT_BY_KEY] = { key: action.key, order: action.order };
            break;
        default:
            return state;
    }

    //>> INITIAL state of DATA
    let filteredData = Object.assign([], initialState.results);

    //PEROFRM FILTER here
    if (initialState.currentFilter[ACTIONS_TYPE.UPDATE_FILTER].length) {
        // filteredData = Object.assign([], initialState.results);
        initialState.currentFilter[ACTIONS_TYPE.UPDATE_FILTER].forEach(p => {
            let reg = new RegExp(p.value.join("|"), 'i');
            filteredData = filteredData.filter(item => reg.test(item[p.key.toLowerCase()]));
        });
    }

    //PERFORM SEARCH here
    let reg = new RegExp(initialState.currentFilter[ACTIONS_TYPE.SEARCH], 'i');
    filteredData = filteredData.filter(item => reg.test(item.name));

    //Perform sort
    //>> Default sort ASCENDING
    console.log(initialState.currentFilter[ACTIONS_TYPE.SORT_BY_KEY].key);
    switch (initialState.currentFilter[ACTIONS_TYPE.SORT_BY_KEY].key) {
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

    if (initialState.currentFilter[ACTIONS_TYPE.SORT_BY_KEY].order === SORT_ORDER.DESC) {
        filteredData = filteredData.reverse();
    }

    state.results = Object.assign([], filteredData);
    return {
        ...state,
        pending: false
    };
};

export const getProducts = state => state.productsReducer.results;
export const getProductsPending = state => state.productsReducer.pending;
export const getProductsError = state => state.productsReducer.error;
export const getFilters = () => {
    return [
        {
            filterType: filterType.SPECIES,
            list: [...new Set(initialState.results.map(x => x.species))]
        },
        {
            filterType: filterType.GENDER,
            list: [...new Set(initialState.results.map(x => x.gender))]
        },
        {
            filterType: filterType.ORIGIN,
            list: [...new Set(initialState.results.map(x => x.origin.name))]
        }
    ];
}
export const getCurrentFilters = () => initialState.currentFilter;