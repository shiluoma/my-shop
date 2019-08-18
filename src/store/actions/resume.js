import { SAVE_RESUME_LIST, SAVE_RESUME_CARD_INFO, SAVE_RESUME_DIRECT, SAVE_RESUME_TEMPLATES, SAVE_SELECTED_TEMPLATE, SAVE_RESUME_DETAIL, SAVE_DIRECTION, SAVE_SELECT_COURSE, SAVE_EDIT_DATA, SAVE_EDIT_STATUS, SAVE_RESUME_REFERENCE } from "../types";

import api from "../../constants/utils/api";
import axios from "axios";
import requestUrl from "../../constants/config/requestUrl";
import cookie from "js-cookie";
import { Toast } from "antd-mobile";

export const getResumeDetails = auth => (dispatch, getState) => {
	Toast.loading("请稍后", 0.5);
	auth = auth || cookie.get("auth");
	return new Promise((resolve, reject) => {
		api.get(requestUrl.getMyResume + `?auth=${auth}`)
			.then(res => {
				if (res.data.status === "success") {
					let resumeList = res.data.resumeList;
					let onlineResume = [], adjunctResume = [];
					if (resumeList.length > 0) {
						for (var i = 0; i < resumeList.length; i++) {
							if (resumeList[i].type === 1) {
								onlineResume.push(resumeList[i])
							} else {
								adjunctResume.push(resumeList[i])
							}
						}
					}
					adjunctResume = adjunctResume[0];
					onlineResume = onlineResume.slice(0, 3);
					dispatch(saveUserResumes({
						onlineResume,
						adjunctResume
					}));
					dispatch(saveResumeCardInfo(res.data.cardInfoData));
					resolve(res);
				}
			})
			.catch(err => {
				reject(err);
				console.log("请求简历err", err);
			})
	})
}

//设为默认
export const setDefaultResume = (params) => (dispatch, getState) => {
	let auth = cookie.get("auth");
	let { resumeId } = params;
	Toast.loading("请稍候", 0);
	api({
		method: "post",
		url: requestUrl.resumeUpdate + "?section=default_resume&auth=" + auth,
		data: { id: resumeId}
	})
		.then(res => {
			console.log("设为默认", res);
			if(res.data.status === "success") {
				// 重新请求简历
				dispatch(getResumeDetails(auth));
				Toast.success("设置成功", 1);
			}
			if (res.data.status === "error") {
				Toast.fail(res.data.message, 1);
			}
		})
		.catch(err => {
			console.log("设为默认err", err);
		})
}

// 简历重命名
export const renameResume = (params, callback) => (dispatch, getState) => {
	let { resumeId, name } = params;
	let auth = cookie.get("auth");
	Toast.loading("请稍候", 0);
	api({
		method: "post",
		url: requestUrl.resumeUpdate + "?section=resume&auth=" + auth,
		data: {
			id: resumeId,
			name: name,
			type: "rename"
		}
	})
		.then(async res => {
			console.log("重命名", res);
			if (res.data.status === "success") {
				// 重新请求简历
				await dispatch(getResumeDetails(auth));
				callback && callback();
				Toast.success("修改成功", 1);
			}
			if (res.data.status === "error") {
				Toast.fail(res.data.message, 1);
			}
		})
		.catch(err => {
			console.log("重命名", err);
		})
}

// 复制简历
export const copyResume = (params) => (dispatch, getState) => {
	let { resumeId } = params;
	let auth = cookie.get("auth");
	Toast.loading("请稍候", 0);
	return new Promise((resolve, reject) => {
		api({
			method: "post",
			url: requestUrl.resumeUpdate + "?section=resume&auth=" + auth,
			data: {
				id: resumeId,
				type: "copy"
			}
		})
			.then(async res => {
				console.log("重命名", res);
				if (res.data.status === "success") {
					await dispatch(getResumeDetails(auth));
					Toast.success("复制成功", 1);
					resolve(res.data);
				}
				if (res.data.status === "error") {
					Toast.fail(res.data.message, 1);
					reject(res.data);
				}
			})
			.catch(err => {
				console.log("重命名", err);
				reject(err);
			})
	})
}

// 删除简历
export const deleteResume = (params, callback) => (dispatch, getState) => {
	let { resumeId } = params;
	let auth = cookie.get("auth");
	Toast.loading("请稍候", 0);
	api({
		method: "post",
		url: requestUrl.resumeUpdate + "?section=resume&auth=" + auth,
		data: {
			id: resumeId,
			_delete: 1
		}
	})
		.then(async (res) => {
			console.log("删除", res);
			if(res.data.status === "success") {
				callback && callback();
				await dispatch(getResumeDetails(auth));
				Toast.success("删除成功", 1);
			}
			if (res.data.status === "error") {
				Toast.fail(res.data.message, 1);
			}
		})
		.catch(err => {
			console.log("删除", err);
		})
}

const obj2String = function (obj, arr = [], idx = 0) {
	for (let item in obj) {
		arr[idx++] = [item, obj[item]]
	}
	return new URLSearchParams(arr).toString()
}

// 导出简历
export const downLoadResume = (params) => (dispatch, getState) => {
	console.log("导出")
	let auth = cookie.get("auth");
	Toast.loading("请稍候", 0);
	return new Promise((resolve, reject) => {
		axios({
			method: "post",
			url: requestUrl.downloadResume + "?auth=" + auth,
			data: obj2String(params),
		})
			.then(async res => {
				console.log("下载简历结果", res);
				if (res.data.status === "error") {
					Toast.offline(res.data.message, 1);
				} else {
					let filePath = res.data.path;
					// let loadData = await dispatch(downLoadUrl(res.data.path));
					let extname = filePath.split(".")[1];
					resolve({ data: filePath, extname });
					Toast.hide();
				}
			})
			.catch(err => {
				console.log("下载简历结果", err);
				reject(err);
				Toast.hide();
			})
	})
}

// 下载资源转blob对象
export const downLoadUrl = (url) => dispatch => {
	return new Promise((resolve, reject) => {
		axios({
			method: "get",
			url: url,
			responseType: "blob"
		})
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {
				reject(err);
				console.log("下载资源路径", err)
			})
	})
}

// 上传简历
export const uploadResume = (file) => (dispatch) => {
	let auth = cookie.get("auth");
	Toast.loading("请稍候", 0);
	return new Promise((resolve, reject) => {
		axios({
			url: requestUrl.resumeUpdate + "?section=custom&auth=" + auth,
			method: "post",
			data: file
		})
			.then(res => {
				if(res.data.status === "success") {
					dispatch(getResumeDetails(auth))
					console.log("上传附件简历", res)
					resolve(res);
				}else {
					reject(res.data.message);
				}
			})
			.catch(err => {
				reject(err);
				console.log("上传附件简历err", err)
			})
	})
}

// 获取简历模板
export const getResumeTemplates = (callback) => (dispatch, getState) => {
	api(requestUrl.resumeTempImgs)
		.then(res => {
			console.log("简历模板", res)
			if(res.data.status === "success") {
				dispatch(saveResumeTemplates(res.data.data));
				callback && callback(res.data.data);
			}
		})
		.catch(err => {
			console.log("err", err)
		})
}

// 获取简历详情
export const getResumeDetail = (resumeId) => (dispatch, getState) => {
	const auth = cookie.get("auth");
	// Toast.loading("请稍候", 0);
	return new Promise((resolve, reject) => {
		api.get(requestUrl.editResume + "?auth=" + auth + "&resume_id=" + resumeId + "&client=m")
			.then(res => {
				if (res.data.status === "success") {
					// 简历默认模板
					let resumeDetail = res.data;
					let resumeTemplates = getState().resume.templates;
					console.log(resumeTemplates);
					let defaultTemplate = resumeTemplates.filter(template => resumeDetail.template_number === template.template_number)[0];
					dispatch(saveSelectedResume(defaultTemplate));
					dispatch(saveResumeDetail(resumeDetail));
					// 简历方向
					let intention_id = resumeDetail.intention_id;
					let positionList = getState().common.positionList;
					let hasIntention = intention_id;
					outter:
					for (var i = 0; i < positionList.length; i++) {
						inner:
						for (var j = 0; j < positionList[i].children.length; j++) {
							if (intention_id == positionList[i].children[j].id) {
								let direction = { position_id: positionList[i].children[j].id, section_id: positionList[i].children[j].pid, name: positionList[i].children[j].name };
								dispatch(saveResumeDirect(positionList[i].children[j]));
								dispatch(saveSelectDirection(direction));
								// dispatch(getCourseContent({ position_id: direction.position_id, section_id: direction.section_id}))
								break outter;
							}
						}
					}
					if (!hasIntention) {
						let direction = { position_id: positionList[0].children[0].id, section_id: positionList[0].children[0].pid, name: positionList[0].children[0].name };
						dispatch(saveResumeDirect(null));
						dispatch(saveSelectDirection(direction));
						dispatch(getCourseContent({ position_id: direction.position_id, section_id: direction.section_id }));
					}
					resolve(resumeDetail);
				}else {
					reject(res.data);
				}
				// setTimeout(() => {
				// 	Toast.hide();
				// }, 600)
			})
			.catch(err => {
				console.log("简历详情获取err", err);
				reject(err);
			})
	})
}

// 提交简历编辑内容
export const submitResumeEdit = (data) => (dispatch, getState) => {
	const auth = cookie.get("auth");
	const { params, section } = data;
	// Toast.loading("请稍候", 0);
	return new Promise((resolve, reject) => {
		api({
			method: "post",
			url: requestUrl.resumeUpdate + "?auth=" + auth + "&section=" + section,
			data: params.data
		})
			.then(res => {
				console.log("简历编辑提交结果", res);
				if (res.data.status === "success") {
					resolve(res);
					// dispatch(getResumeDetail(params.resume_id))
				}else {
					Toast.fail(res.data.message || "提交失败", 1);
					reject(res);
				}
			})
			.catch(err => {
				reject(err);
				console.log("简历编辑提交结果err", err);
			})
	})
}

// 生成新的简历
export const createNewResume = ({template_number, intention_id}) => dispatch => {
	const auth = cookie.get("auth");
	Toast.loading("请稍候", 0);
	return new Promise((resolve, reject) => {
		api({
			method: "post",
			url: requestUrl.createNewResume + "?auth=" + auth,
			headers: {"Content-Type": "application/json"},
			data: {
				template_number,
				intention_id
			}
		})
			.then(res => {
				if(res.data.status === "success") {
					resolve(res.data.data.id);
					dispatch(getResumeDetails(auth));
				}else {
					console.log("创建简历失败", res.data);
					setTimeout(() => {
						Toast.offline(res.data.message, 1);
					}, 150)
					reject(res.data);
				}
			})
			.catch(err => {
				reject(err)
			})
	})
}

// 更新简历方向
export const updateResumeDirect = (params) => dispatch => {
	const auth = cookie.get("auth");
	api({
		method: "post",
		url: requestUrl.updateResumeDirect + "?auth=" + auth,
		headers: { "Content-Type": "application/json" },
		data: params
	})
		.then(res => {
			console.log("更新简历方向", res);
			if(res.data.status === "success") {
				dispatch(getResumeDetail(params.resume_id))
			}
		})
		.catch(err => {
			console.log("更新简历方向", err);
		})
}

// 获取教程内容
export const getCourseContent = (params) => (dispatch) => {
	console.log("获取简历教程", params);
	let { position_id, section_id } = params;
	let url = position_id ? requestUrl.getResumeCourse + "?position_id=" + position_id + "&section_id=" + section_id : requestUrl.getResumeCourse + "?section_id=" + section_id;
	api.get(url)
		.then(res => {
			console.log("简历教程", res)
			if(res.data.status === "success") {
				dispatch(saveSelecCourse(res.data))
			}
		})
		.catch(err => {
			console.log("简历教程err", err)
		})
}

/**
 * 发送简历下载邮件
 * @param params 
 * resume_id
 * email
 * */
export const sendDownLoadEmail = (params) => dispatch => {
	const auth = cookie.get("auth");
	return new Promise((resolve, reject) => {
		api({
			method: "post",
			url: requestUrl.downloadResume + "?auth=" + auth + "&client=m",
			headers: {"Content-Type": "application/json"},
			data: params
		})
			.then(res => {
				if (res.data.status === "success") {
					resolve(res.data);
					setTimeout(() => {
						Toast.success("发送成功", 2);
					}, 100)
				} else {
					reject(res.data)
				}
			})
			.catch(err => {
				reject(err);
			})
	})
}

/**
 * 获取简历参考示例
 * @param {Object} params 
 * {position_id, section_id}
 */
export const getResumeReference = (params) => dispatch => {
	const auth = cookie.get("auth");
	const { position_id, section_id } = params;
	const url = position_id ? `${requestUrl.resumeReference}?auth=${auth}&position_id=${position_id}&section_id=${section_id}` : `${requestUrl.resumeReference}?auth=${auth}&section_id=${section_id}`
	api({
		method: "get",
		url,
	})
		.then(res => {
			console.log("简历参考示例", res);
			if(res.data.status === "success") {
				dispatch(saveResumeReference(res.data.data));
			}
		})
		.catch(err => {
			console.log("简历参考示例", err);
		})
}

// 获取微信分享参数
export const getWxShareData = (url, origin) => dispatch => {
	let reqPath = requestUrl.getHtWechatShare;
	return new Promise((resolve, reject) => {
		api(reqPath + '?url=' + encodeURIComponent(url),)
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {
				reject({ errmsg: '获取分享数据失败' });
			})
	})
}

// 保存简历参考示例
export const saveResumeReference = function(data) {
	return {
		type: SAVE_RESUME_REFERENCE,
		payload: data
	}
}

// 保存简历方向
export const saveResumeDirect = function(data) {
	return {
		type: SAVE_RESUME_DIRECT,
		payload: data
	}
}

// 保存用户简历列表
export const saveUserResumes = function(resumes) {
	return {
		type: SAVE_RESUME_LIST,
		payload: resumes
	}
}

// 保存简历cardInfo
export const saveResumeCardInfo = function(info) {
	return {
		type: SAVE_RESUME_CARD_INFO,
		payload: info
	}
}

// 保存简历模板
export const saveResumeTemplates = function (templates) {
	return {
		type: SAVE_RESUME_TEMPLATES,
		payload: templates
	}
}

// 保存选择的简历模板
export const saveSelectedResume = function(template) {
	return {
		type: SAVE_SELECTED_TEMPLATE,
		payload: template
	}
}

// 保存简历详情
export const saveResumeDetail = function (detail) {
	return {
		type: SAVE_RESUME_DETAIL,
		payload: detail
	}
}

// 保存选择的简历方向
export const saveSelectDirection = function (direction) {
	return {
		type: SAVE_DIRECTION,
		payload: direction
	}
}

// 保存选择的简历教程
export const saveSelecCourse = function(course) {
	return {
		type: SAVE_SELECT_COURSE,
		payload: course
	}
}

// 保存简历编辑内容
export const saveResumeEditData = function(data) {
	return {
		type: SAVE_EDIT_DATA,
		payload: data
	}
}

// 保存简历编辑状态
export const saveResumeEditStatus = (status) => {
	return {
		type: SAVE_EDIT_STATUS,
		payload: status
	}
}