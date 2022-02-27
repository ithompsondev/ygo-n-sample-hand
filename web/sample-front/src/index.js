import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { DeckListForm } from './form/form.js';
import { TextJumbotron } from './jumbotron/components.js';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/manual.css';
import { DownloadIndicator } from './loader/components.js';
import { downloadDeck } from './request/requests.js';
import { ButtonOptionSection, MissingCardsAlert } from './options/components.js';
import { DeckListViewer,ReturnOption } from './deck/components.js';
import { ResampleButton, SampleSection } from './sample/components.js';

export class DeckListFormSection extends React.Component {
    render() {
        return (
            <div className='col-md-5'>
                <DeckListForm handler={this.props.handler}/>
            </div>
        );
    }
}

export class InstructionJumbotronSection extends React.Component {
    render() {
        const deckName = 'Enter a deckname';
        const cardList = 'Enter card name and number';
        return (
            <div className='col-md-7 text-left'>
                <TextJumbotron instruction={deckName} />
                <TextJumbotron instruction={cardList} />
            </div>
        );
    }
}

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
        console.log('I clicked to view deck')
        this.setState({ currentView: 'decklist' });
    }

    handleSampleHands() {
        console.log('I clicked to sample hands');
        this.setState({ currentView: 'samples' });
    }

    handleAlterDeckList() {
        console.log('I clicked to alter deck list')
        this.setState({ currentView: 'alter' });
    }
    
    // We pass the handleDeckCreated method down as props to be called as soon as a deck has been
    // created so we can update the page content's state
    render() {
        // If the deck has not been created, we render our form
        if (!this.state.deckCreated) {
            return (
                <div className='row align-items-center p-5'>
                    <InstructionJumbotronSection />
                    <DeckListFormSection handler={this.handleDeckCreated}/>
                </div>
            );
        } else {
            // Asynchronously download deck data while we continue to do other things here
            if (!this.state.deckDownloaded) {
                // If the deck has been created, but not yet downloaded we attempt to download deck info
                // Only start a deck download if the deck is not downloaded!
                downloadDeck(this.handleDeckDownloaded);
            }
            // While the deck has not downloaded, we display a loading spinner
            while (!this.state.deckDownloaded) {
                return (
                    <div className='row align-items-center p-5'>
                        <DownloadIndicator />
                    </div>
                )
            }
            if (this.state.currentView === 'options') {
                if (this.state.errors === null) {
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
                } else {
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
            } else if (this.state.currentView === 'decklist') {
                return (
                    <div className='row text-center border border-primary'>
                        <DeckListViewer deck={this.state.deck} />
                        <ReturnOption handler={this.handleDeckCreated}/>
                    </div>
                );
            } else if (this.state.currentView === 'samples') {
                return (
                    <div className='row align-items-center'>
                        <ReturnOption handler={this.handleDeckCreated} />
                        <div className='col-md-4'></div>
                        <ResampleButton handler={this.handleSampleHands}/>
                        <SampleSection deck={this.state.deck} />
                        <ReturnOption handler={this.handleDeckCreated} />
                        <div className='col-md-4'></div>
                        <ResampleButton handler={this.handleSampleHands}/>
                    </div>
                );
            } else if (this.state.currentView === 'alter') {
                this.setState({ deckCreated: false,deckDownloaded: false });
                return (
                    <div className='row align-items-center p-5'>
                        <InstructionJumbotronSection />
                        <DeckListFormSection handler={this.handleDeckCreated}/>
                    </div>
                );
            }
        }
    }
}

// Stops the page from being horizontally scrollable: container -> row -> columns (bootstrap)
export class PageContentContainer extends React.Component {
    render() {
        return (
            <div className='container-fluid'>
                <PageContentRow />
            </div>
        );
    }
}

export class PageHeader extends React.Component {
    render() {
        return (
            <div className='container-fluid bg-warning p-2'>
                <h1 className='text-dark'>YGO5 DRAW</h1>
            </div>
        );
    }
}

export class Page extends React.Component {
    render() {
        // Initial get request to start
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