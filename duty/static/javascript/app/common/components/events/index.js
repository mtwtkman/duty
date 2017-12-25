import m from 'mithril';

import NoAssigneeComponent from './NoAssigneeComponent.js';
import AssigneeComponent from './AssigneeComponent.js';

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

export default {
    async oninit(vnode) {
        state.fetching = true;
        state.fetchingMembers = true;
        try {
            vnode.attrs.model.fetch()
        } catch(e) {
            console.log(e);
        } finally {
            state.fetching = false;
        }
        vnode.attrs.model.fetchMembers().then(() => {
            state.fetchingMembers = false;
        });
    },
    view(vnode) {
        return m('div',
            (() => {
                if (!vnode.attrs.model.assignee) {
                    return m(NoAssigneeComponent, {
                        state,
                        model: vnode.attrs.model,
                        assigneeType: vnode.attrs.assigneeType,
                    });
                }
                return m(AssigneeComponent, {
                    state,
                    model: vnode.attrs.model,
                    assigneeType: vnode.attrs.assigneeType,
                });
            })(),
        );
    }
};
