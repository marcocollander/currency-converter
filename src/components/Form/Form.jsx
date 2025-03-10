import React from 'react';
import Selection from './Selection';
import Input from './Input';
import Button from './Button';
import {useState} from 'react';
import Paragraph from './Paragraph';

const Form = ({placeholder, flag}) => {
  const [result, setResult] = useState('To jest tyle złoty');
  const [value, setValue] = useState('');
  const [code, setCode] = useState();

  const onInputChange = (e) => {
    setValue(e.target.value);
  };

  const onSelectChange = (e) => {
    setCode(e.target.value);
  };

  const onBtnClick = (e) => {
    e.preventDefault();
    getCurrency(code);
  };

  const onBtnClickOne = (e) => {
    e.preventDefault();
    getCrypto(code);
  };

  const getCurrency = (currencyCode) => {
    fetch('https://api.nbp.pl/api/exchangerates/tables/a/')
      .then((res) => res.json())
      .then((data) => {
        const currency = data[0].rates.filter(
          (elem) => elem.code === currencyCode,
        );
        if (value) {
          setResult(`To ${(currency[0].mid * value).toFixed(2)} PLN`);
        }
      })
      .catch((error) => console.log(error));
  };

  const getCrypto = (cryptoCode) => {
    fetch(`https://api.zondacrypto.exchange/rest/trading/ticker/${cryptoCode}-PLN`)
      .then(res => res.json())
      .then(data => {
        const valueOfPLN = data.ticker.rate;
        if (value) {
          setResult(`To ${(valueOfPLN * value).toFixed(2)} PLN`);
        }
      })
      .catch(error => console.log(error));

  };


  return (
    <form className="form">
      <fieldset className="form__border">
        <legend className="form__description">{flag ? 'Wybierz walutę' : 'Wybierz kryptowalutę'}</legend>
        <section className="convertor">
          <Input
            change={onInputChange}
            placeholder={placeholder}
            value={value}
          />
          <Selection
            symbols={flag ? ['Wybierz walutę ', 'EUR', 'USD', 'CHF'] : ['Wybierz kryptowalutę ', 'BTC', 'ETH', 'LTC']}
            change={onSelectChange}
            values={flag ? ['', 'EUR', 'USD', 'CHF'] : ['', 'BTC', 'ETH', 'LTC']}
          />
          <Button click={flag ? onBtnClick : onBtnClickOne}/>
          <Paragraph result={result}/>
        </section>
      </fieldset>
    </form>
  );
};

export default Form;
