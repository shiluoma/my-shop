import React, { Component } from "react";
import "../styles/pages/notfound.less";
const staticPath = process.env.STATIC_PATH;

class NotFound extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<div className="errorWrap">
				<div className="errorContent">
					<div>
						<img src={staticPath + "/404.png"} alt="简历超人" />
						<p>啊哦，页面暂时无法访问~</p>
						<p>请检查网址是否正确</p>
					</div>
				</div>
			</div>
		);
	}
}

export default NotFound;