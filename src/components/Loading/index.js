import React from 'react';
import './loading.styl'

const loading = 'https://web-data.zmlearn.com/image/4PTDHzF6w8cUrMek75YhNF/loading.gif';

export default function Loading () {
    return (
        <div className="global-loading-container">
            <div className="loading-panel">
                <img src={loading} />
                <p>正在加载中...</p>
            </div>
        </div>
    );
}