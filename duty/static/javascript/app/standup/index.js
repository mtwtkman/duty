import m from 'mithril';

import model from './model.js';

const d = new Date();
const state = {
    fetching: false,
    fetchingMembers: false,
    today: `${d.getFullYear()}/${d.getDate()}/${d.getMonth() + 1}`,
    connecting() {
        return state.fetching ||
            state.fetchingMembers
        ;
    },
};

const Component = {
    oninit(vnode) {
        state.fetching = true;
        state.fetchingMembers = true;
        model.fetch().then(() => {
            state.fetching = false;
        });
        model.fetchMembers().then(() => {
            state.fetchingMembers = false;
        });
    },
    view(vnode) {
        return m('div.wrapper',
            m('div', `${state.today}の司会は`),
        );
    },
};
m.mount(document.getElementById('app'), Component);
