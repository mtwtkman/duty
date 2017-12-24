const state = {
    fetching: false,
    fetchingMembers: false,
    selecting: false,
    rotating: false,
    fetchingActiveLogs: false,
    connecting() {
        return state.fetching ||
            state.fetchingMembers ||
            state.selecting ||
            state.rotating ||
            state.fetchingActiveLogs
          ;
        },
};

export default state;
