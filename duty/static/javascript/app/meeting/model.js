import m from 'mithril';

const facilitatorEndpoint = '/meeting/api/meeting/facilitator';
const membersEndpoint = '/meeting/api/meeting/members';

const model = {
    facilitator: null,
    members: [],
    async fetch() {
        try {
            const response = await m.request({url: facilitatorEndpoint, method: 'GET'});
            model.facilitator = response.data;
            return response;
        } catch(e) {
            throw  e;
        }
    },
    async fetchMembers() {
        try {
            const response = await m.request({url: membersEndpoint, method: 'GET'});
            model.members = response.members;
            return response;
        } catch(e) {
            throw e;
        }
    },
    async select(member_id) {
        try {
            const response = await m.request({url: facilitatorEndpoint, method: 'POST', data: { member_id }})
            model.facilitator = response.facilitator;
            return response;
        } catch(e) {
            throw e;
        }
    },
    ids() {
        return model.members.map(x => x.id);
    },
    nextId(direction) {
        const idx = model.ids().findIndex(x => x === model.facilitator.id);
        const nextIndex = (idx + (direction === 1 ? direction : model.members.length - 1)) % model.members.length;
        return model.members[nextIndex].id;
    },
    async rotate(nextFacilitatorId, operationType) {
        try {
            const response = await m.request({
                url: facilitatorEndpoint,
                method: 'PUT',
                data: {
                  member_id: nextFacilitatorId,
                }
            });
            model.facilitator = response.facilitator;
            return response;
        } catch(e) {
            throw e;
        }
    },
};


export default model;
