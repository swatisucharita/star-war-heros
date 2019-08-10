import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchStars } from './stars-actions';

const StarsList = (props) => {
    const { fetchStars, stars, nextStars } = props;
    // const [stars, addStar] = useState(props.stars || []);

    useEffect(() => {
        fetchStars(nextStars);
    }, []);

    return <div>
        <h3>Plan for the day</h3>
        {stars.map(star => {
            return <div>
                <details>
                    <summary>{star.name}</summary>
                    <pre>{JSON.stringify(star)}</pre>
                </details>
            </div>;
        })}
    </div>;
};

const mapStateToProps = (state) => {
    const {stars, nextStars} = state.stars;
    return {
        stars,
        nextStars
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchStars }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StarsList);
