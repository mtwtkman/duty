import m from 'mithril';

import model from './model.js';


const Component = {
    connecting: false,
    errorMessage: '',
    async oninit(vnode) {
        vnode.send = () => {
            vnode.state.connecting = true;
            try {
                model.create();
            } catch(e) {
                vnode.state.errorMessage = e.message;
            } finally {
                vnode.state.connecting = false;
                model.value = '';
            }
        };
        vnode.state.connecting = true;
        model.fetch().then(() => {
            vnode.state.connecting = false;
        });

    },
    view(vnode) {
        const state = vnode.state;
        return m('div',
            (() => {
                if (!!state.errorMessage) {
                    return m('div.alert.alert-danger[role=alert]', state.errorMessage);
                }
            })(),
            m('div.input-group',
                m('input.form-control', {
                    oninput: m.withAttr('value', model.updateValue),
                    placeholder: 'input name',
                    'aria-label': 'input name',
                    value: model.value,
                    maxlength: '20',
                    disabled: state.connecting,
                }),
                m('span.input-group-btn',
                    m('button.btn.btn-primary[type=button]', {
                        onclick: vnode.send,
                        disabled: !model.value || state.connecting,
                    }, 'Add'),
                ),
            ),
            m('div.members', model.data.map(x => m(`div#${x.id}`,
                m('div.name',
                    m('span', x.name),
                    (() => {
                        if (x.is_facilitator) {
                            return m('span.facilitator.badge.badge-warning', 'ファ');
                        }
                    })(),
                ),
                m('div.delete',
                    m('button.btn.btn-danger[type=button]', {
                        onclick() {
                            if (confirm(`${x.name}さんを消しますよ`)) {
                                state.connecting = true;
                                try {
                                    model.delete(x.id)
                                } catch(e) {
                                    state.errorMessage = e.message;
                                } finally {
                                    state.connecting = false;
                                }
                            }
                        },
                    }, m('i.fa.fa-trash-o[aria-hidden=true]')),
                ),
            ))),
        );
    }
};
m.mount(document.getElementById('app'), Component);
