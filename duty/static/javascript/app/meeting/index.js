import m from 'mithril';

import model from './model.js';
import state from './state.js';


const NoFacilitatorComponent = {
    view(vnode) {
        if (state.connecting()) return;
        if (model.members.length === 0) {
            return m('div',
                m('h1', 'ファシリテーターを決めましょう'),
                m('span', 'おや、メンバーがまだ登録されてないみたいですね。'),
                m('br'),
                m('a[href=/members/]', 'ここ'),
                m('span', 'からメンバーの登録をしましょう')
            );
        }
        return m('div.members',
            m('h1', 'ファシリテーターを決めましょう'),
            model.members.map(member => {
                return m('div.alert.alert-secondary',
                    m('div.member', `${member.order}番目: ${member.name}`),
                    m('button.btn.btn-info', {
                        onclick() {
                            if (confirm(`${member.name}さんでいいですか`)) {
                                state.selecting = true;
                                model.select(member.id).then(() => {
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
            m('div.facilitator',
                m('div', '今日のファシリテーターは'),
                m('h3', `${model.facilitator.name}さん`),
                m('div.btn-group[role=group]',
                    m('button.btn.btn-info[type=button]', {
                        disabled: state.connecting(),
                        onclick() {
                            if (confirm('次の人に回しますよ')) {
                                state.rotating = true;
                                model.rotate(model.nextId(1), DONE).then(() => {
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
                                model.rotate(model.nextId(-1), REDO).then(() => {
                                    state.rotating = false;
                                });
                            }
                        },
                    }, 'Redo'),
                ),
            ),
            m('div.candidates', model.members.map(member => {
                return m('div.box.alert.alert-secondary',
                    m('div.member',
                        (() => {
                            if (member.id === model.facilitator.id) {
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
            model.fetch()
        } catch(e) {
            console.log(e);
        } finally {
            state.fetching = false;
        }
        model.fetchMembers().then(() => {
            state.fetchingMembers = false;
        });
    },
    view(vnode) {
        return m('div',
            (() => {
                if (!model.facilitator) {
                    return m(NoFacilitatorComponent);
                }
                return m(OrdinaryComponent);
            })(),
        );
    }
};
m.mount(document.getElementById('app'), Component);
