import m from 'mithril';

const DONE = 1;
const REDO = 2;


const CandidateComponent = {
    view(vnode) {
        const { member, isAssigned, dragstart, dragenter, dragend } = vnode.attrs;
        return m(`div.box.alert.alert-${isAssigned ? 'warning' : 'secondary'}`,
            {
                draggable: true,
                ondragstart: dragstart,
                ondragenter: dragenter,
                ondragend: dragend,
            },
            m('div.member',
                (() => {
                    if (isAssigned) {
                        return m('i.fa.fa-gavel[aria-hidden=true');
                    }
                })(),
                m('span', `${member.order}: ${member.name}`),
            ),
        );
    },
};

const CandidatesComponent = {
    oninit(vnode) {
        let draggingItem = null;
        vnode.state.dragstart = member => {
            draggingItem = member;
        };
        vnode.state.dragenter = (member, ev) => {
            [draggingItem.order, member.order] = [member.order, draggingItem.order];
            vnode.attrs.model.reorder();
        };
        vnode.state.dragend = () => {
            draggingItem = null;
            vnode.attrs.model.update();
        };
    },
    view(vnode) {
        return m('div.candidates',
            vnode.attrs.model.members.map(
                member => m(CandidateComponent, {
                    member,
                    dragstart() { vnode.state.dragstart(member) },
                    dragenter(ev) { vnode.state.dragenter(member, ev) },
                    dragend() { vnode.state.dragend() },
                    isAssigned: member.id === vnode.attrs.model.assignee.id,
                })
            ),
        );
    },
};

export default {
    view(vnode) {
        const state = vnode.attrs.state;
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
            m(CandidatesComponent, { model: vnode.attrs.model }),
        );
    },
};
