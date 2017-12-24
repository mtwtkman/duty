import m from 'mithril';
import state from './state.js';

const facilitatorEndpoint = '/meeting/api/meeting/facilitator';
const membersEndpoint = '/meeting/api/meeting/members';

const model = {
    facilitator: null,
    members: [],
    async fetch() {
        state.fetching = true;
        try {
            const response = await m.request({url: facilitatorEndpoint, method: 'GET'});
            model.facilitator = response.data;
        } catch(e) {
            return e;
        } finally {
            state.fetching = false;
        }
    },
    async fetchMembers() {
        state.fetchingMembers = true;
        try {
            const response = await m.request({url: membersEndpoint, method: 'GET'});
            model.members = response.members;
        } catch(e) {
            return e;
        } finally {
            state.fetchingMembers = false;
        }
    },
    async select(member_id) {
        state.selecting = true;
        try {
            const response = await m.request({url: facilitatorEndpoint, method: 'POST', data: { member_id }})
            model.facilitator = response.facilitator;
        } catch(e) {
            return e;
        } finally {
            state.selecting = false;
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
        state.rotating = true;
        try {
            const response = await m.request({
                url: facilitatorEndpoint,
                method: 'PUT',
                data: {
                  member_id: nextFacilitatorId,
                }
            });
            model.facilitator = response.facilitator;
        } catch(e) {
            return e;
        } finally {
            state.rotating = false;
        }
    },
};


export default model;
