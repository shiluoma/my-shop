import api from "../../constants/utils/api";
import requestUrl from "../../constants/config/requestUrl";
import { Toast } from "antd-mobile";
import { SAVE_MAJOR, SAVE_POSITION_DATA, SAVE_COLLEGES, SAVE_COMPANYS, SAVE_LANGUAGE } from "../types";
import { saveSelectDirection } from "../actions";

// 获取专业常量
export const getMajorData = () => (dispatch, getState) => {
	api.get(requestUrl.getMajorData)
		.then(res => {
			console.log("获取专业err", res)
			let majorData = res.data;
			let degrees = majorData.list;
			let majors = majorData.major;
			for (var i = 0; i < degrees.length; i++) {
				var categoryMajor = [];
				degrees[i].label = degrees[i].name;
				degrees[i].value = i;
				for (var j = 0; j < majors.length; j++) {
					if (degrees[i].id === majors[j].degree) {
						majors[j].label = majors[j].name;
						categoryMajor.push(majors[j]);
					}
				}
				for (var k = 0; k < categoryMajor.length; k++) {
					categoryMajor[k].value = k;
				}
				degrees[i].children = categoryMajor;
			}
			dispatch(saveMajor({ degrees }))
			console.log("专业处理", degrees);
		})
		.catch(err => {
			console.log("获取专业err", err)
		})
}

// 获取职位常量
export const getPositionList = () => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		api.get(requestUrl.positionList)
			.then(res => {
				console.log("11111职位数据", res)
				if (res.data.status === "success") {
					let positionList = res.data.position_list;
					for (var i = 0; i < positionList.length; i++) {
						positionList[i].label = positionList[i].name;
						positionList[i].value = i;
						positionList[i].children = positionList[i].items;
						delete positionList[i].items;
						for (var j = 0; j < positionList[i].children.length; j++) {
							positionList[i].children[j].label = positionList[i].children[j].name;
							positionList[i].children[j].value = j;
						}
					}
					dispatch(savePositionList(positionList));
					let direction = { position_id: positionList[0].children[0].id, section_id: positionList[0].id, name: positionList[0].children[0].name };
					dispatch(saveSelectDirection(direction));
					resolve(positionList)
				}
			})
			.catch(err => {
				console.log("11111职位数据err", err);
				reject(err);
			})
	}) 
}

// 获取大学常量
export const getColleges = () => (dispatch) => {
	api.get(requestUrl.getColleges)
		.then(res => {
			console.log("大学常量", res.data);
			if(res.data.status === "success") {
				dispatch(saveColleges(res.data.university))
			}
		})
		.catch(err => {
			console.log("学校常量请求失败", err)
		})
}

// 联想搜索公司名称
export const getCompanys = (keyword) => (dispatch, getState) => {
	console.log("公司列表请求参数", keyword, requestUrl.getCompanys + "?search=" + keyword + "&limit=20");
	Toast.loading("请稍后", 0);
	return new Promise((resolve, reject) => {
		api.get(requestUrl.getCompanys + "?search=" + keyword + "&limit=20")
			.then(res => {
				console.log("请求公司列表", res);
				if (res.status == "200") {
					dispatch(saveCompanys(res.data));
					resolve(res.data);
				}
				setTimeout(() => {
					Toast.hide()
				}, 300)
			})
			.catch(err => {
				console.log("请求公司列表err", err);
				reject(err);
			})
	})
}

// 获取语言常量数据
export const getLanguageData = () => dispatch => {
	api(requestUrl.languageData)
		.then(res => {
			console.log("获取到的语言数据", res);
			if(res.status == 200) {
				let languageData = res.data;
				let languageCategory = [];
				for (var k in languageData) {
					languageCategory.push(k);
				}
				languageData.category = languageCategory;
				dispatch(saveLanguageData(languageData))
			}
		})
		.catch(err => {
			console.log("获取到的语言数据", err);
		})
}

// 保存语言数据
export const saveLanguageData = function(language) {
	return {
		type: SAVE_LANGUAGE,
		payload: language
	}
}

export const saveMajor = function (data) {
	return {
		type: SAVE_MAJOR,
		payload: data
	}
}

export const savePositionList = function(data) {
	return {
		type: SAVE_POSITION_DATA,
		payload: data
	}
}

export const saveColleges = function(colleges) {
	return {
		type: SAVE_COLLEGES,
		payload: colleges
	}	
}

export const saveCompanys = function(companys) {
	return {
		type: SAVE_COMPANYS,
		payload: companys
	}
}