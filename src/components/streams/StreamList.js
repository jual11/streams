import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import {fetchStreams} from '../../actions';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderCreateStreamButton() {
        if(this.props.isSignedIn) {
            return (
                <div style={{textAlign: 'right'}}>
                    <Link className='ui button primary' to='/streams/new'>Create Stream</Link>
                </div>
            );
        }
    }

    renderAdmin(stream) {
        if(this.props.currentUserId === stream.userId) {
            return(
                <div className='right floated content'>
                    <Link to={`/streams/edit/${stream.id}`} className='ui button primary'>Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className='ui button negative'>Delete</Link>
                </div>
            );
        }
    }

    renderList()  {
        return this.props.streams.map(stream => {
            return (
                <div className='item' key={stream.id}> 
                    {this.renderAdmin(stream)}
                    <i className='large middle icon camera'></i>
                    <div className='content'>
                        <Link className='header' to={`/streams/show/${stream.id}`}>
                            {stream.title}
                        </Link>
                        <div className='description'>{stream.description}</div>
                    </div>
                </div>
            );     
        });
    }

    render() {
        return(
            <div>
                <h2>Streams</h2>
                <div className='ui celled list'>{this.renderList()}</div>
                {this.renderCreateStreamButton()}
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {fetchStreams}) (StreamList);