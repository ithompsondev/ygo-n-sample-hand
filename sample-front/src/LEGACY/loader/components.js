import React from "react";

export class Spinner extends React.Component {
    render() {
        return (
            <div 
                className='spinner-border spinner-border-lg red'
            ></div>
        );
    }
}

export class DownloadIndicator extends React.Component {
    render() {
        return (
            <div className='col-md-12 text-center site-text'>
                <Spinner /><br/>
                <h1>Fetching deck information</h1>
                <h2>This may take a while</h2>
            </div>
        );
    }
}