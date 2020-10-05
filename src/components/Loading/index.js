import React from 'react';
import './loading.styl'


export default function Loading () {
    return (
        <div className="global-loading-container">
            <div className="loading-panel">
                <p>正在加载中...</p>
            </div>
        </div>
    );
}