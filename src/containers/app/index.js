import React, { Component } from 'react';
import './app.scss'
import InfiniteList from '../list'

export default class App extends Component {
    renderItem = (item,index) => {
        return <div id={index}>{item.value}</div>
    }
    render() {
        const data = [
            {value: 1},
            {value: 2},
            {value: 3},
            {value: 4},
            {value: 5},
            {value: 6},
            {value: 7},
            {value: 8},
            {value: 9},
            {value: 10},
            {value: 11},
            {value: 12},
            {value: 13},
            {value: 14},
            {value: 15},
            {value: 16},
            {value: 17},
            {value: 18},
            {value: 19},
            {value: 20},
            {value: 21},
            {value: 22},
            {value: 23},
            {value: 24},
            {value: 25},
            {value: 26},
            {value: 27},
            {value: 28},
            {value: 29},
            {value: 30},
            {value: 31},
            {value: 32},
            {value: 33},
            {value: 34},
            {value: 35},
            {value: 36},
            {value: 37},
            {value: 38},
            {value: 39},
            {value: 40},
            {value: 41},
            {value: 42},
            {value: 43},
            {value: 44},
            {value: 45},
            {value: 46},
            {value: 47},
            {value: 48},
            {value: 49},
            {value: 50},
            {value: 51},
            {value: 52},
            {value: 53},
            {value: 54},
            {value: 55},
            {value: 56},
            {value: 57},
            {value: 58},
            {value: 59},
            {value: 60},
            {value: 61},
        ]
        
        return (
            <div className="app"> 
                this is app index page
                <div style={{height: '60px'}}>
                    <InfiniteList
                        dataSource={data}
                        renderItem={this.renderItem}
                        height={100}
                        itemHeight={20} />
                </div>
            </div>
        )
    }
}