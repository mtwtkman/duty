import m from 'mithril';

export default {
    view(vnode) {
        const state = vnode.attrs.state;
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
                    m('div.member', member.name),
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
