import m from 'mithril';

export default function modelFactory(apiBase) {
    const endpoint = `${apiBase}assignee`;
    const membersEndpoint = `${apiBase}members`;
    const model = {
        assignee: null,
        members: [],
        async fetch() {
            try {
                const response = await m.request({url: endpoint, method: 'GET'});
                model.assignee = response.data;
                return response;
            } catch(e) {
                throw  e;
            }
        },
        async fetchMembers() {
            try {
                const response = await m.request({url: membersEndpoint, method: 'GET'});
                model.members = response.data;
                return response;
            } catch(e) {
                throw e;
            }
        },
        async select(member_id) {
            try {
                const response = await m.request({url: endpoint, method: 'POST', data: { member_id }})
                model.assignee = response.data;
                return response;
            } catch(e) {
                throw e;
            }
        },
        ids() {
            return model.members.map(x => x.id);
        },
        nextId(direction) {
            const idx = model.ids().findIndex(x => x === model.assignee.id);
            const nextIndex = (idx + (direction === 1 ? direction : model.members.length - 1)) % model.members.length;
            return model.members[nextIndex].id;
        },
        async rotate(nextId, operationType) {
            try {
                const response = await m.request({
                    url: endpoint,
                    method: 'POST',
                    data: {
                      member_id: nextId,
                    }
                });
                model.assignee = response.data;
                return response;
            } catch(e) {
                throw e;
            }
        },
    };
    return model;
}
