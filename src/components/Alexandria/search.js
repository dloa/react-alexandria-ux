import axios from 'axios';

export default (server, term) => (
    axios.post('http://'+ server +':41289/alexandria/v1/search',{
        protocol: 'media',
        'search-on': 'txid',
        'search-for': term,
        'search-like': true
    }).then(res => {
        let d = res.data;
        return (d.status === 'success')?d.response[0]:d.response
    })
);
