import React, {useRef, useEffect, useState, useCallback} from 'react';
import styled from 'styled-components';
import Gravatar from 'react-gravatar';
import Spinner from "react-svg-spinner";
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
const Loader = styled.div`
    width: 100%;
    height: 70px;
    text-align: center;
`;

const StarsList = (props) => {
    const { fetchStars, stars, isFetching, nextStars } = props;
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
    // Create ref to attach to the loader component
    const loader = useRef(null);

    const loadMore = useCallback((entries) => {

        const target = entries[0];
        if (target.isIntersecting && nextStars) {
            !isFetching && fetchStars(nextStars)
        }
    }, [isFetching, nextStars, fetchStars]);

    useEffect(() => {
        const options = {
            root: null, // window by default
            rootMargin: '0px',
            threshold: 0.25
        };

        // Create observer
        const observer = new IntersectionObserver(loadMore, options);

        // observer the loader
        if (loader && loader.current) {
            observer.observe(loader.current);
        }

        // clean up on willUnMount
        return () => observer.unobserve(loader.current);
    }, [loader, loadMore]);

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
            <Loader ref={loader}>{isFetching && <Spinner color="goldenrod" size="64px" thickness={2}/>}</Loader>
        </StarList>
    </div>;
};

const mapStateToProps = (state) => {
    const {isFetching, stars, nextStars} = state.stars;
    return {
        isFetching,
        stars,
        nextStars
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchStars }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StarsList);
