import { SAVE_POSITION_DATA, SAVE_MAJOR, SAVE_COLLEGES, SAVE_COMPANYS, SAVE_LANGUAGE } from "../types";

const initState = {
	positionList: [],
	majorData: [],
	colleges: [],
	companys: [],
	languageData: {}
}

export default function common(state = initState, action) {
	switch(action.type) {
		case SAVE_POSITION_DATA:
			return { ...state, positionList: action.payload};
		case SAVE_MAJOR:
			return { ...state, majorData: action.payload };
		case SAVE_COLLEGES:
			return {...state, colleges: action.payload};
		case SAVE_COMPANYS:
			return {...state, companys: action.payload};
		case SAVE_LANGUAGE:
			return {...state, languageData: action.payload}
		default: 
			return state;
	}
}