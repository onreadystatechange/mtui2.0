'use strict';

import React,  { Component } from 'react';
import ReactDOM from 'react-dom';
import DropModal from './DropModal';
import {position} from '../utils/offset';
import { clickBlank,  offClickBlank } from '../utils/triggerBlank';

class DropDown extends Component {

    // 默认参数
    static defaultProps = {
        btn: <a>dropdown</a>, 
        style: {},  // modal的样式
        visible: false,  // 框默认隐藏
        showBack: null,  // 显示时候的回调
        closeBack: null,  // 关闭时候的回调
        trigger: 'hover' // 触发下拉的行为
    }
    
    // 构造函数
    constructor (props) {
        super(props);
        this.state = {
            show: props.visible
        };
        this.div = document.createElement('div');
        this.div.setAttribute('class', 'mt-div');
        this.handler = null;
        this.mid = null;

        this.refBtn = null;
    }

    // 设置 mid
    setMid() {
        if(this.mid === null){
            this.mid = 'mt_dropdown_' + +new Date();
        }
    }

    getPlace(){
        return position(this.refBtn);
    }

    // 渲染div
    renderDiv( mark ){
        this.setMid();
        var _this = this;
        var dom = document.getElementById(this.mid);
        // 首次渲染即可
        if(!dom || mark){
            if( !mark ){
                document.body.appendChild(this.div);
            }
            ReactDOM.render(<DropModal mid={this.mid}  getPlace={this.getPlace.bind(this)} show={this.state.show} {...this.props}/>, this.div);
        }
    }

    // 隐藏显示
    showOrHide(show, callback){
        var self = this;
        this.renderDiv();
        this.setState({
            show: !show
        }, function(){
            if(self.state.show && self.props.showBack){
                self.props.showBack();
            }else if(self.props.closeBack){
                self.props.closeBack();
            }
            if(callback){
                callback();
            }
        });
        this.hoverHandler = null;
    }

    // 点击事件
    handleClick(){
        const self = this;
        const show = this.state.show;
        if(this.props.trigger === 'click'){
            this.showOrHide(show,  function(){
                if(self.handler){
                    offClickBlank(self.handler);
                }
                self.handler = clickBlank(document.getElementById(self.mid), function(mark){
                    if(!mark){
                        self.showOrHide(true);
                        offClickBlank(self.handler);
                    }
                });
            });
        }else{
            return;
        }
    }

    // 更新弹窗里面的数据
    componentDidUpdate(prevProps){
        if(document.getElementById(this.mid)){
            this.renderDiv(true);
        }
    }

    // 初始化状态
    componentDidMount() {

        // 如果默认是显示，直接显示DIV
        if(this.props.visible){
            this.renderDiv();
        }

        // hover事件
        if(this.props.trigger === 'hover'){
            const self = this;

            this.hoverHandler = function(e){
                self.showOrHide(false, function(){
                    if(self.handler){
                        offClickBlank(self.handler, 'mousemove');
                    }
                    self.handler = clickBlank(document.getElementById(self.mid), function(mark){
                        if(!mark){
                            self.showOrHide(true, null);
                            offClickBlank(self.handler, 'mousemove');
                        }
                    }, 'mousemove', self.refBtn);
                });
            };
            this.refBtn.addEventListener('mouseover', this.hoverHandler);
        }
    }

    // 卸载组件
    componentWillUnmount() {
        if(this.props.trigger === 'hover'){
            offClickBlank(this.handler, 'mousemove');
        }else{
            offClickBlank(this.handler);
        }
        this.refBtn.removeEventListener('mouseover', this.hoverHandler);
        if(MT_MS === 'IE') {
            this.div.removeNode(true);
        }else{
            this.div.remove();
        }
        ReactDOM.unmountComponentAtNode(this.div);
    }

    render(){
        var Component = this.props.btn.type;
        var {children, className,  ...other} = this.props.btn.props;
        var cName = ['mt-dropdown-btn'];
        if(className){
            cName.push(className);
        }
        return <Component ref={ (c) => { this.refBtn = c; }} className={cName.join(' ')} onClick={this.handleClick.bind(this)} {...other}>{children}</Component>;
    }
}

// 主页
export default DropDown;