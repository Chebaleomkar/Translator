import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  const [option, setOption] = useState([]);
  const [to, setto] = useState('')
  const [from, setFrom] = useState('')
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {

    const getlang = async () => {
      try {
        const res = await fetch('https://libretranslate.com/languages');
        const data = await res.json();
        console.log(data);
        setOption(data)
      } catch (error) {
        console.error(error);
      }
    };

    getlang();


  }, [])

  const translate = () => {
    axios.post('https://libretranslate.de/translate', {
      q: input,
      source: from,
      target: to,
      api_key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res => {
      console.log(res.data)
    })
  }

  const translater = () => {

    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    axios.post('https://libretranslate.de/translate', params, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res => {
      // console.log(res.data)
      setOutput(res.data.translatedText)
    })
  };


  return (
    <div className="App">

      <div>
        From ({from})
        <select style={{ marginLeft: '20px' }} onChange={e => setFrom(e.target.value)}>

          {option.map(opt => <option key={opt.code} value={opt.code}> {opt.name} </option>)}

        </select>

        To ({to})
        <select style={{ marginLeft: '20px' }} onChange={e => setto(e.target.value)}  >

          {option.map(opt => <option key={opt.code} value={opt.code} > {opt.name} </option>)}

        </select>

      </div>


      <div style={{ marginTop: '20px' }} >
        <textarea rows="18" cols="100" onInput={(e) => setInput(e.target.value)} ></textarea>
      </div>

      <div style={{ marginTop: '20px' }} >
        <textarea rows="18" cols="100" value={output} ></textarea>
      </div>

      <button onClick={e => translater()} > Translate </button>

    </div>
  );
}

export default App;
