import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle.js';

export default  class InfiniteList extends Component{
   static propTypes={
       height:PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired,//列表容器的高度
       itemHeight:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),//每一行的高度
       renderItem:PropTypes.func.isRequired,//渲染item的方法
       dataSource:PropTypes.array.isRequired//列表数据源
   }
   
   constructor(props){
        super(props);
        this.state={
            needCalcItemHeight:!props.itemHeight,//是否需要计算每一行的高度。当父级不传itemHeight的时候，需要计算
            cur:0,//记录在容器最顶部的元素的index
            itemHeight:props.itemHeight,
            size:props.itemHeight?Math.ceil(props.height/props.itemHeight):1
        }
        this.scroll = throttle(this.scroll,60)//节流处理
   }
   componentDidMount(){
        //计算item的高度
        this.calcItemHeight()
        //注册容器滚动监听事件
        this.list.addEventListener('scroll',this.scroll,false)
   }
   componentWillUnmount() {
       this.list.removeEventListener('scroll',this.scroll,false)
   }
   
   calcItemHeight=()=>{
        const { needCalcItemHeight } =this.state
        if(needCalcItemHeight&&this.firstDom){
            const itemHeight = this.firstDom.offsetHeight;//获取当前div的高度
            this.setState({
                itemHeight,
                needCalcItemHeight:false,
                size:Math.ceil(this.props.height/itemHeight)
            })
        }
   }
   
   scroll = (e) => {
        const { cur, size } = this.state
        //这个监听事件干嘛呢  计算当前滑动到容器顶部的元素是第几个
        const index = Math.ceil(e.target.scrollTop/this.state.itemHeight);
        if(Math.abs(index-cur)>size){
            this.setState({ cur:index })  
        }
        //注意：这里没必要index一变就更新state，会造成很多不必要的render。所以加上个条件，只有当前index-上一次记录的cur>一屏size的时候 再更新cur
   }
   renderFirstDom=()=>{
        const { dataSource,renderItem } = this.props
        return (
            <div ref={ref => this.firstDome = ref}>
                {renderItem(dataSource[0],0)}
            </div> 
        )
   }
   
    handleData= data => {
        const { size,cur } = this.state
        const newData = [...data] //浅拷贝一份数据
        
        if(data.length<size){
            return newData
        }
        let startIndex =0
        if(cur - size > 0){
            startIndex = cur - size;
        }
        return newData.splice(startIndex,size*3)
    }
   
    renderList=()=>{
        //渲染list的时候，要将数据源处理一下，截取出来我们需要渲染的数据
        const { cur } =this.state
        const data = this.handleData(this.props.dataSource)
        const {itemHeight,renderItem} = this.props
        return data.map((item, index) => {
            return (
                <div 
                    key={`key_${cur}_${index}`} 
                    style={{ height: itemHeight }} 
                    id={item.value}>{item.value}
                </div>
            )
        })
    }
   
    getMargin=()=>{
        const { cur, size } = this.state
        const itemH = this.state.itemHeight
        const data = this.props.dataSource || []
        let style = {};

        if (cur - size < 0) {
            style = {
                marginTop: 0,
                marginBottom: (data.length - (size * 3)) * itemH,
            }
        } else {
            style = {
                marginTop: (cur - size) * itemH,
                marginBottom: (data.length - (cur - size) - (size * 3)) * itemH,
            }
        }
        return style
    }

    getContent = () => {
        let content;
        // 当父组件没传itemHeight的时候，先渲染一条数据，计算一行的高度
        const { needCalcItemHeight, size } = this.state;
        if (needCalcItemHeight) {
            content = this.renderFirstDom()
        } else {
            const { dataSource } = this.props
            if (dataSource.length > size) {
                content = (<div style={this.getMargin()}>
                {this.renderList()}</div>);// 数据多的需要设置margin了
            } else {
                content = <div>{this.renderList()}</div>;// 像原来一样
            }
        }
        return content;
    }

    render(){
        const { height } = this.props

        return(
            <div 
                ref={ref => this.list = ref}
                style={{ height, overflow:'auto'}}
            >
                {this.getContent()}
            </div>
        )
    }
}
