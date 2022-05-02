import React, { createContext, useContext, useState } from 'react';
import Swal from 'sweetalert2';



const xUserAgent = process.env.REACT_APP_RAPID_API_GOOGLESEARCH_USERAGENT;
const proxyLocation = process.env.REACT_APP_RAPID_API_GOOGLESEARCH_PROXYLOCATION;
const host = process.env.REACT_APP_RAPID_API_GOOGLESEARCH_HOST;
const key = process.env.REACT_APP_RAPID_API_GOOGLESEARCH_KEY;

const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({ children }) => {

    const [ results, setResults ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ searchTerm, setSearchTerm ] = useState('');

    // type: /videos /search /images
    const getResults = async ( type ) => {

        try {
            
            setIsLoading( true );

            const resp = await fetch(`${baseUrl}${type}`, {
                method: 'GET',
                headers: {
                    'X-User-Agent': xUserAgent,
                    'X-Proxy-Location': proxyLocation,
                    'X-RapidAPI-Host': host,
                    'X-RapidAPI-Key': key
                }
            });

            const data  = await resp.json();

            setResults( data );
            setIsLoading( false );

        } catch (error) {
            
            setIsLoading( false );
            Swal.fire('Error', error.toString(), 'error' );

        }

    }

    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            { children }
        </ResultContext.Provider>
    );

}

export const useResultContext = () => useContext( ResultContext );