import { SAVE_EDIT_USERINFO, SAVE_USER_INFO } from "../types";

const initState = {
  	userInfo: {},
	editUserInfo: {
		name: "",
		sex: "",
		bornTime: "", 
		degree: "", 
		graduateTime: "",
		college: "",
		major: {}, 
		phone: "", 
		email: "",
		avatar: {},
		politics_status: "",
		origin: ""
	}
}

export default function user(state = initState, action) {
	switch(action.type) {
		case SAVE_EDIT_USERINFO:
			if(action.payload.clear) {
				return { ...state, editUserInfo: action.payload.data };
			}else {
				let type = action.payload.type;
				let editUserInfo = state.editUserInfo;
				editUserInfo[type] = action.payload.data;
				return { ...state, editUserInfo: {...editUserInfo} };
			}
		case SAVE_USER_INFO:
			return  {...state, userInfo: action.payload};
		default:
			return state;
	}
}
