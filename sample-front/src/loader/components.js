import React from "react";

export class Spinner extends React.Component {
    render() {
        return (
            <div 
                className='spinner-border spinner-border-lg text-warning'
            ></div>
        );
    }
}

export class DownloadIndicator extends React.Component {
    render() {
        return (
            <div className='col-md-12 text-center'>
                <Spinner /><br/>
                <h2>Dowloading deck information</h2>
            </div>
        );
    }
}