import m from 'mithril';

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

const NoAssigneeComponent = {
    view(vnode) {
        if (state.connecting()) return;
        if (vnode.attrs.model.members.length === 0) {
            return m('div',
                m('h1', `${vnode.attrs.assigneeType}を決めましょう`),
                m('span', 'おや、メンバーがまだ登録されてないみたいですね。'),
                m('br'),
                m('a[href=/members/]', 'ここ'),
                m('span', 'からメンバーの登録をしましょう')
            );
        }
        return m('div.members',
            m('h1', `${vnode.attrs.assigneeType}を決めましょう`),
            vnode.attrs.model.members.map(member => {
                return m('div.alert.alert-secondary',
                    m('div.member', `${member.order}番目: ${member.name}`),
                    m('button.btn.btn-info', {
                        onclick() {
                            if (confirm(`${member.name}さんでいいですか`)) {
                                state.selecting = true;
                                vnode.attrs.model.select(member.id).then(() => {
                                    state.selecting = false;
                                });
                            }
                        }
                    }, 'Select'),
                );
            })
        );
    },
};
const DONE = 1;
const REDO = 2;
const OrdinaryComponent = {
    view(vnode) {
        return m('div',
            m('div.assignee',
                m('div', `今日の${vnode.attrs.assigneeType}は`),
                m('h3', `${vnode.attrs.model.assignee.name}さん`),
                m('div.btn-group[role=group]',
                    m('button.btn.btn-info[type=button]', {
                        disabled: state.connecting(),
                        onclick() {
                            if (confirm('次の人に回しますよ')) {
                                state.rotating = true;
                                vnode.attrs.model.rotate(vnode.attrs.model.nextId(1), DONE).then(() => {
                                    state.rotating = false;
                                });
                            }
                        },
                    }, 'Done!'),
                    m('button.btn.btn-warning[type=button]', {
                        disabled: state.connecting(),
                        onclick() {
                            if (confirm('操作を戻しますよ')) {
                                state.rotating = true;
                                vnode.attrs.model.rotate(vnode.attrs.model.nextId(-1), REDO).then(() => {
                                    state.rotating = false;
                                });
                            }
                        },
                    }, 'Redo'),
                ),
            ),
            m('div.candidates', vnode.attrs.model.members.map(member => {
                return m('div.box.alert.alert-secondary',
                    m('div.member',
                        (() => {
                            if (member.id === vnode.attrs.model.assignee.id) {
                                return m('i.fa.fa-gavel[aria-hidden=true');
                            }
                        })(),
                        m('span', `${member.order}番目: ${member.name}`),
                    ),
                );
            })),
        );
    },
};
const Component = {
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
                        model: vnode.attrs.model,
                        assigneeType: vnode.attrs.assigneeType,
                    });
                }
                return m(OrdinaryComponent, {
                    model: vnode.attrs.model,
                    assigneeType: vnode.attrs.assigneeType,
                });
            })(),
        );
    }
};

export default Component;
