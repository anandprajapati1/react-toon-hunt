//>>ACTIONS
export const ACTIONS_TYPE = {
    SORT_BY_KEY: "SORT_BY_KEY",
    UPDATE_FILTER: "UPDATE_FILTER",
    REMOVE_FILTER: "REMOVE_FILTER",
    SEARCH: "SEARCH"
};
export const FETCH_ACTIONS_TYPE = {
    FETCH_PRODUCTS_PENDING: 'FETCH_PRODUCTS_PENDING',
    FETCH_PRODUCTS_SUCCESS: 'FETCH_PRODUCTS_SUCCESS',
    FETCH_PRODUCTS_ERROR: 'FETCH_PRODUCTS_ERROR'
};
export const SORT_ORDER = {
    ASC: "ASC",
    DESC: "DESC"
};


//>> ACTION CREATOR
export const sortDataAction = (t = { key: "", order: SORT_ORDER.ASC }) => ({
    type: ACTIONS_TYPE.SORT_BY_KEY,
    key: t.key,
    order: t.order
});
export const changeFilter = (f = [{ key: "", value: [""] }]) => ({
    type: ACTIONS_TYPE.UPDATE_FILTER,
    filterparam: f
});
export const removeFilter = (f = [{ key: "", value: [""] }]) => ({
    type: ACTIONS_TYPE.REMOVE_FILTER,
    filterparam: f
});
export const searchQuery = q => ({
    type: ACTIONS_TYPE.SEARCH,
    searchKey: q
});


/*
{
    type: 'UPDATE_FILTER',
    filterparam: [{key: 'species', value: ["human"]}]
}
{
    type: 'UPDATE_FILTER',
    filterparam: [{key: 'gender', value: ["female"]}]
}
{
    type: 'REMOVE_FILTER',
    filterparam: [{key: 'gender', value: ["female"]}]
}
{
    type: 'SEARCH',
    searchKey: 'rick'
}
{
    type: 'SORT_BY_KEY',
    key: 'name',
    order: 'DESC'
}
*/

export const fetchProductsPending = () => ({
    type: FETCH_ACTIONS_TYPE.FETCH_PRODUCTS_PENDING
});

export const fetchProductsSuccess = (results) => ({
    type: FETCH_ACTIONS_TYPE.FETCH_PRODUCTS_SUCCESS,
    results: results
});

export const fetchProductsError = (error) => ({
    type: FETCH_ACTIONS_TYPE.FETCH_PRODUCTS_ERROR,
    error: error
});