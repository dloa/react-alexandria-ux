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

let getPrices = (pwyw) => {
    if (! pwyw) {
        return  {
            play: {
                suggested: 0.0125,
                min: 0
            },
            download: {
                suggested: 1,
                min: 0
            }
        }
    }

    var pricesArray = pwyw.split(',')

    return {
        play: {
            suggested: pricesArray[0]/100,
            min: pricesArray[1]/100
        },
        buy: {
            suggested: pricesArray[0],
            min: pricesArray[1]
        }
    }
}

export default (librarydHost, term) => (
    Promise.all([axios.get('https://api.bitcoinaverage.com/ticker/global/USD/'),
                 axios.post('http://'+ librarydHost +':41289/alexandria/v1/search', {
                     protocol: 'media',
                     'search-on': 'txid',
                     'search-for': term,
                     'search-like': true
                 }).then((res) => {
                     let d = res.data;
                     if (d.status === 'success')
                         return d.response[0]
                     throw new Error(d.response)
                 })])
        .then(results => {
            let [btcusd, d] = results;
            console.log (btcusd, d)
            let media = d['media-data']['alexandria-media'];
            let info = media.info;
            let xinfo= info['extra-info'];
            let formats = Object.keys(xinfo.element1).filter(k => (k !== 'name'));

            console.log (media);
            return ({
                btcusd: btcusd.data['24h_avg'],
                mediaInfo: {
                    title: info.title,
                    artist: xinfo.artist,
                },
                prices: getPrices(xinfo.pwyw),
                formats: {
                    options: formats,
                    selected: formats[0]
                },
                tracks: fixDataMess(xinfo),
                data: info
            });
        })
);
