import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export function Header() {
    return (
        <div className='header'>
            <h1>YGO Deck Sampler</h1>
        </div>
    );
}

// Component for a div that contains a button (flex floated)
export function OptionButtonContainer(props) {
    return (
        <div className='option-button-container'>
            <OptionButton name={ props.buttonName } />
        </div>
    );
}

// Component for a button
export function OptionButton(props) {
    return (
        <button className='option-button' type='submit'>
            { props.name }
        </button>
    )
}

// Component for a div that contains text (flex floated)
export function OptionDescription(props) {
    return (
        <div className='option-description'>
            { props.description }
        </div>
    );
}

// Component for a div that contains flex floated elements
export function CreateDeckContainer() {
    return (
        <div className='option-container create-deck-bg'>
            <OptionButtonContainer buttonName={'Create Deck'} />
            <OptionDescription description={
                'Manually enter card names and proposed frequencies'
            }
        />
        </div>
    );
}

// Component for a div that contains flex floated elements
export function UploadDeckContainer() {
    return (
        <div className='option-container upload-deck-bg'>
            <OptionDescription description={
                    'Uploade a .ydk compatible deck file'
                } 
            />
            <OptionButtonContainer buttonName={'Upload Deck'} />
        </div>
    )
}

export function Index() {
    return (
        <Fragment>
            <Header />
            <CreateDeckContainer />
            <UploadDeckContainer />
        </Fragment>
    );
}

ReactDOM.render(
    <Index />,
    document.getElementById('root')
)