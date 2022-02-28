import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { DeckListForm } from './form/form.js';
import { TextJumbotron } from './jumbotron/components.js';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/manual.css';
import { DownloadIndicator } from './loader/components.js';
import { downloadDeck } from './request/requests.js';
import { ButtonOptionSection, MissingCardsAlert } from './options/components.js';
import { CreateDeck } from './main-content/components.js';
import { DeckListViewerPage } from './deck/viewer.js';
import { SampleViewerPage } from './sample/viewer.js';

// Once the deck has been created we want the content of the page to change so we can display
// other options
export class PageContentRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            deckCreated: false,
            deckDownloaded: false,
            deckName: null,
            deck: null,
            errors: null,
            currentView: null
        };
        this.handleDeckCreated = this.handleDeckCreated.bind(this);
        this.handleDeckDownloaded = this.handleDeckDownloaded.bind(this);
        this.handleViewDeck = this.handleViewDeck.bind(this);
        this.handleSampleHands = this.handleSampleHands.bind(this);
        this.handleAlterDeckList = this.handleAlterDeckList.bind(this);
    }

    handleDeckCreated() {
        this.setState({ deckCreated: true,currentView: 'options' });
    }

    handleDeckDownloaded(deckName,deck,errors) {
        this.setState({ deckDownloaded: true,deckName: deckName,deck: deck,errors: errors });
    }

    handleViewDeck() {
        this.setState({ currentView: 'decklist' });
    }

    handleSampleHands() {
        this.setState({ currentView: 'samples' });
    }

    handleAlterDeckList() {
        this.setState({ currentView: 'alter' });
    }
    
    download() {
        if (!this.state.deckDownloaded) {
            // If the deck has been created, but not yet downloaded we attempt to download deck info
            // Only start a deck download if the deck is not downloaded!
            downloadDeck(this.handleDeckDownloaded);
        }
    }

    indicateDownloading() {
        return (
            <div className='row align-items-center p-5'>
                <DownloadIndicator />
            </div>
        )
    }

    displayOptions() {
        return (
            <div className='row p-3'>
                <ButtonOptionSection handlers=
                    {
                        {
                            decklistHandler: this.handleViewDeck,
                            sampleHandler: this.handleSampleHands,
                            alterHandler: this.handleAlterDeckList       
                        }
                    }
                />
            </div>
        );
    }

    displayOptionsWithErrors() {
        return (
            <div className='row p-3'>
                <ButtonOptionSection handlers=
                    {
                        {
                            decklistHandler: this.handleViewDeck,
                            sampleHandler: this.handleSampleHands,
                            alterHandler: this.handleAlterDeckList       
                        }
                    }
                />
                <MissingCardsAlert errors={this.state.errors} /> 
            </div>
        );
    }

    // We pass the handleDeckCreated method down as props to be called as soon as a deck has been
    // created so we can update the page content's state
    render() {
        switch (this.state.deckCreated) {
            case false:
                return (
                    <CreateDeck handler={this.handleDeckCreated} />
                );
            case true:
                this.download();
                while (!this.state.deckDownloaded) {
                    return this.indicateDownloading();
                }
                switch (this.state.currentView) {
                    case 'options':
                        if (this.state.errors === null) {
                            return this.displayOptions();
                        } else {
                            return this.displayOptionsWithErrors();
                        }
                    case 'decklist':
                        return (
                            <DeckListViewerPage 
                                deck={
                                    {
                                        deckName: this.state.deckName,
                                        deck: this.state.deck,
                                        handler: this.handleDeckCreated
                                    }
                                }
                            />
                        );
                    case 'samples':
                        return (
                            <SampleViewerPage 
                                deck={
                                    {
                                        deck: this.state.deck,
                                        createdHandler: this.handleDeckCreated,
                                        sampleHandler: this.handleSampleHands
                                    }
                                }
                            />
                        );
                    case 'alter':
                        this.setState({ deckCreated: false,deckDownloaded: false });
                        return (
                            <CreateDeck handler={this.handleDeckCreated} />
                        );
                    default:
                        break;
                }

            default:
                break;
        }
    }
}

// Stops the page from being horizontally scrollable: container -> row -> columns (bootstrap)
export class PageContentContainer extends React.Component {
    render() {
        return (
            <div className='container-fluid ps-5 pe-5 pt-0'>
                <PageContentRow />
            </div>
        );
    }
}

export class PageHeader extends React.Component {
    render() {
        return (
            <div className='logo-font p-3 m-0'>
                <h1 className='red logo-size black-stroke-logo'><b>YGO5 DRAW</b></h1>
            </div>
        );
    }
}

export class Page extends React.Component {
    render() {
        return (
            <Fragment>
                <PageHeader />
                <PageContentContainer />
            </Fragment>
        );
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('root')
);