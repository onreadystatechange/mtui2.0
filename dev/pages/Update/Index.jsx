'use strict';

import './style.scss';
import React, { Component } from 'react';
import { Link } from 'react-router';
import IndexHeader from '../Common/IndexHeader';

class Update extends Component {
	//构造函数
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="index update clearfix">
				<IndexHeader />
				<div className="list">
					<ul>
						<li><i>2017-05-18</i> 修改了Button为 button属性的时候，宽度不能设置的bug, 给pagelist添加了 refresh 方法。用来刷新组件</li>
						<li><i>2017-05-11</i> 修改了日历弹窗的超出window的定位，添加了日期插件range参数（格式：xxxx-xx-xx,xxxx-xx-xx）设置日期范围；修改了一些弹窗定位的BUG。修改了tabs设置activeIndex 不能自动刷新的BUG</li>
						<li><i>2017-05-10</i> 所有弹窗的样式统一使用modalStyle，与之直接关联的样式依然使用style</li>
						<li><i>2017-05-06</i> 修改一些BUG，添加了limit组件，限制尺寸</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default Update;