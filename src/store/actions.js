import { UPDATE_TASK } from './constants';

export function updateTask(payload) {
    return { type: UPDATE_TASK, payload };
}
