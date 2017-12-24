const state = {
    fetching: false,
    fetchingMembers: false,
    selecting: false,
    rotating: false,
    connecting() {
        return state.fetching ||
            state.fetchingMembers ||
            state.selecting ||
            state.rotating
        ;
    },
};

export default state;
