import axios from 'axios';

function formatInt(num, length) {
    var r = '' + num;
    while (r.length < length) {
        r = '0' + r;
    }
    return r;
}

function fixDataMess(data) {
    var ret = [];
    let i = 1;
    let e = 'element' + i++;

    while (data.hasOwnProperty(e)) {
        ret.push({
            title: data[e].name,
            runtime: data[e].runtime || data.runtime
        });

        e = 'element' + i++
    }

    return ret;
}


export default (server, term) => (
    axios.post('http://'+ server +':41289/alexandria/v1/search',{
        protocol: 'media',
        'search-on': 'txid',
        'search-for': term,
        'search-like': true
    }).then(res => {
        let d = res.data;
        return (d.status === 'success')?d.response[0]:d.response
    }).then(d => {
        let media = d['media-data']['alexandria-media'];
        let info = media.info;
        let xinfo= info['extra-info'];
        let formats = Object.keys(xinfo.element1).filter(k => (k !== 'name'));

        console.log (media);
        return ({
            mediaInfo: {
                title: info.title,
                artist: xinfo.artist,
            },
            price: info.price,
            formats: {
                options: formats,
                selected: formats[0]
            },
            tracks: fixDataMess(xinfo),
            data: info
        });
    })
);
