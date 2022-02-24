import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './images.css'
import './fonts.css'

export function Header() {
    return (
        <div className='container-fluid text-warning pt-3 heading'>
            <h1 className='text-right'>YGO5 Draw</h1>
        </div>
    );
}

// Component that allows us to place other components next to each other using bootstrap grid
export function OptionContainer() {
    return (
        <div className='row align-items-center p-3'>
            <Option data={{component: <UploadButton />,className: 'text-center col-md-4 container'}}/>
            <Option data={{component: <FillerText text={'OR'}/>,className: 'col-md-1'}} />
            <Option data={{component: <DeckForm />,className: 'col-md-4 container'}}/>
        </div>
    );
}

// Component that represents text
export function FillerText(props) {
    return (
        <h4 className='text-warning text-center'>{props.text}</h4>
    )
}

// Component that can be placed next to each other. Also wraps around other components such as text and buttons
export function Option(props) {
    return (
        <div className={props.data.className}>
            {props.data.component}
        </div>
    );
}

export class UploadButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <button className='btn-lg btn-warning'>
                <span className='glyphicon glyphicon-upload'></span>
                Upload YDK Decklist
            </button>
        );
    }
}

export class DeckForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className='was-validated'>
                <this.DeckName />
                <this.DeckList />
                <button type='submit' className='btn-lg btn-warning mt-3'>Create</button>
            </form>                       
        );
    }

    DeckName() {
        return (
            <div className='form-group mb-3'>
                <input type='text' placeholder='Deck name' className='form-control' required/>
            </div>
        );
    }

    DeckList() {
        let format = 'EXACT CARD NAME 1\nPot of Greed 3\nChange of Heart 3\nGraceful Charity 3'
        return (
            <div className='form-group'>
                <textarea className='form-control' rows='15' required>{format}</textarea>
            </div>
        );
    }
}

export function Index() {
    return (
        <Fragment>
            <Header />
            <OptionContainer />
        </Fragment>
    );
}

ReactDOM.render(
    <Index />,
    document.getElementById('root')
)