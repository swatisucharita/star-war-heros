import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Gravatar from 'react-gravatar'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchStars } from './stars-actions';

const StarHeading = styled.h3`
    text-align: center;
`;
const StarList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;
const StarIinfo = styled.div`
    width: 40%;
    padding: 10px;
    border: 1px solid;
    margin: 10px;
    display: flex;
`;
const StarDetails = styled.div`
    margin: 0 20px;
`;

const StarsList = (props) => {
    const { fetchStars, stars, nextStars } = props;
    const attributes = [
        {name: 'name', label: 'Name'},
        {name: 'height', label: 'Height'},
        {name: 'mass', label: 'Weight (kgs)'},
        {name: 'hair_color', label: 'Hair Color'},
        {name: 'skin_color', label: 'Skin Color'},
        {name: 'eye_color', label: 'Eye Color'},
        {name: 'birth_year', label: 'Birth Year'},
        {name: 'gender', label: 'Gender'}
    ];
    // const [stars, addStar] = useState(props.stars || []);

    useEffect(() => {
        fetchStars(nextStars);
    }, []);

    return <div>
        <StarHeading>The Force Awakens</StarHeading>
        <StarList>
            {stars.map(star => {
                return <StarIinfo>
                    <Gravatar size={120} style={{ margin: '1.6em'}} email={`${star.name.replace(/\s/g, '')}@starwars.com`} />
                    <StarDetails>
                        <h5>{star.name}</h5>
                        {attributes.map(attribute => {
                            return (<div>
                                <span>{`${attribute.label}: `}</span><span>{star[attribute.name]}</span>
                            </div>);
                        })}
                    </StarDetails>
                </StarIinfo>;
            })}
        </StarList>
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
