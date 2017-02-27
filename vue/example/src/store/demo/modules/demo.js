import Vue								from 'vue';
import { saveCookie } 					from 'tools/client'; 
import { httpResponse, getAttribute } 	from 'tools/utils'; 

import api								from '../api';
import * as types 						from './types';

const state = {
    stateShow: {},
};
/** state 操作说明
 *  @param String method get/add/del/put 请求首次获取 / 增 / 删 / 改 
 */
const mutations = {
	
    [types.SAVE_STATE_SHOW]( state, payload ){
        alert('执行 mutations')
        switch( payload.method ){
			case 'put':
				state.stateShow = payload.data;
				break;
		}
    }
};

const actions = {
	
    saveStateShow:({ commit }, param) => {
        alert('执行 actions')
        commit(types.SAVE_STATE_SHOW, param);
    }
};

export default {
    state, mutations, actions
};
