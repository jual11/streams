import { times } from 'lodash';
import React from 'react';
import { connect } from 'react-redux'

import Modal from '../Modal';
import history from '../../history';
import { deleteStream, fetchStream } from '../../actions';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
        //console.log(this.props);
    }

    // onSubmit = () => {
    //     this.props.deleteStream(this.props.match.params.id);
    // }

    renderActions() {
        return(
            <React.Fragment>
                <button onClick={() => this.props.deleteStream(this.props.match.params.id)}  className="ui primary button">Delete</button>
                <button onClick={() => history.push('/')} className="ui button">Cancel</button>
            </React.Fragment>
        );
    }
    
    renderContent() {
        if(!this.props.stream) {
            return 'Are you sure you want to delete this stream?'
        }
        return `Are you sure you want to delete stream with title: ${this.props.stream.title}?`;
    }


    render() {
        return(
                <Modal
                    title='Delete Stream' 
                    content={this.renderContent()} 
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    //console.log(ownProps);
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {
    fetchStream,
    deleteStream
    }) (StreamDelete);