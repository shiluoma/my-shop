import requestUrl from "../../constants/config/requestUrl";
import api from "../../constants/utils/api";
import axios from "axios";
import { SAVE_EDIT_USERINFO, SAVE_USER_INFO } from "../types";
import { getResumeDetails, getMajorData } from "../actions";
import cookie from "js-cookie";
import { Toast } from "antd-mobile";

export const saveEditUserInfo = function(data) {
	return {
		type: SAVE_EDIT_USERINFO,
		payload: data
	}
}

/**
 * @param {*} toekn 
 * 获取auth
 * 获取用户信息
 * 获取用户简历
 */
export const getAuthByToken = token => (dispatch, getState) => {
	api({
		method: 'GET',
		url: requestUrl.tokenGetAuth,
		headers: {
			Authorization: token
		}
	}).then(res => {
		console.log("换取海投auth", res);
		let auth = res.data.haitou_token[1];
		dispatch(getUserInfo(auth));
		dispatch(getResumeDetails(auth));
		dispatch(getMajorData());
		cookie.set("auth", auth);
	})
	.catch(err => {
		console.log("换取海投err", err);
	})
}

// 获取用户信息
export const getUserInfo = auth => dispatch => {
	auth = auth || cookie.get("auth");
	api.get(requestUrl.userInfo + `?auth=${auth}`)
		.then(res => {
			if(res.data.status === "success") {
				let data = res.data;
				let info = data.info || null;
				console.log("获取用户信息res", data)
				dispatch(saveUserInfo(data));
				if(info) {
					dispatch(initSetEditUserInfo(info))
				}
			}
		})
		.catch(err => {
			console.log("获取用户信息err", err);
		})
}

export const initSetEditUserInfo = (info = {}) => dispatch => {
	let editUserInfo = {
		college: { id: info.college, name: info.college_name },
		name: info.name,
		sex: { id: info.sex, data: info.sex == 2 ? "女" : "男" },
		birth_date: info.birth,
		degree: { id: info.degree, data: info.degreeName },
		graduateTime: info.graduation_date ? info.graduation_date.split(" ")[0] : "",
		major: { id: info.major, name: info.majorName },
		phone: info.phone,
		email: info.email,
		avatar: { src: info.faceLargeFullUrl },
		politics_status: {id: info.politics_status},
		origin: info.origin
	}
	dispatch(saveEditUserInfo({ data: editUserInfo, clear: true }))
}

// 提交用户信息
export const submitUserInfo = (params) => (dispatch, getState) => {
	let auth = cookie.get("auth");
	Toast.loading("请稍候", 0);
	return new Promise((resolve, reject) => {
		api({
			method: "post",
			url: requestUrl.resumeUpdate + "?auth=" + auth + "&section=newBasic",
			data: params
		})
			.then(res => {
				if(res.data.status === "success") {
					Toast.success("保存成功", 1);
					resolve(res.data)
					dispatch(getResumeDetails(auth));
				}else {
					reject(res.data);
					Toast.offline(res.data.message || "保存失败")
				}
			})
			.catch(err => {
				reject(err);
			})
	})
}

// 上传头像
export const uploadAvatar = (file) => (dispatch, getState) => {
	let auth = cookie.get("auth");
	return new Promise((resolve, reject) => {
		axios({
			method: "post",
			url: requestUrl.resumeUpdate + "?auth=" + auth + "&section=face",
			data: file
		})
			.then(res => {
				if(res.data.status === "success") {
					resolve(res.data);
				}else {
					reject(res.data)
				}
			})
			.catch(err => {
				reject(err)
			})
	})
}

// 保存用户信息
export const saveUserInfo = function(info) {
	return {
		type: SAVE_USER_INFO,
		payload: info
	}
}