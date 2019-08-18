import { SAVE_RESUME_LIST, SAVE_RESUME_DIRECT, SAVE_RESUME_CARD_INFO, SAVE_RESUME_TEMPLATES, SAVE_SELECTED_TEMPLATE, SAVE_RESUME_DETAIL, SAVE_DIRECTION, SAVE_SELECT_COURSE, SAVE_EDIT_DATA, SAVE_EDIT_STATUS, SAVE_RESUME_REFERENCE } from "../types";
const initState = {
	onlineResume: [],
	adjunctResume: {},
	cardInfo: {},
	resumeDirection: null,
	templates: [],
	selectedTemplate: {},
	selectedDirection: {},
	resumeCourse: {},
	resumeReference: [],
	resumeDetail: {},
	editData: {},
	resumeEditStatus: false
}

export default function resume(state = initState, action) {
	switch(action.type) {
		case SAVE_RESUME_LIST:
			return { ...state, onlineResume: action.payload.onlineResume, adjunctResume: action.payload.adjunctResume };
		case SAVE_RESUME_CARD_INFO:
			return {...state, cardInfo: Object.assign({}, action.payload)};
		case SAVE_RESUME_DIRECT:
			return {...state, resumeDirection: action.payload};
		case SAVE_RESUME_TEMPLATES:
			return {...state, templates: action.payload};
		case SAVE_SELECTED_TEMPLATE:
			return {...state, selectedTemplate: Object.assign({}, action.payload)};
		case SAVE_RESUME_DETAIL:
			return {...state, resumeDetail: Object.assign({}, action.payload)};
		case SAVE_DIRECTION:
			return { ...state, selectedDirection: Object.assign({}, action.payload) };
		case SAVE_SELECT_COURSE:
			return { ...state, resumeCourse: Object.assign({}, action.payload)};
		case SAVE_EDIT_DATA:
			return {...state, editData: action.payload};
		case SAVE_EDIT_STATUS:
			return { ...state, resumeEditStatus: action.payload};
		case SAVE_RESUME_REFERENCE:
			return {...state, resumeReference: action.payload};
		default:
			return state;
	}
}
