import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";



export const Payment = () => {
  const [valueSwitch, setValueSwitch] = useState("ruble");
  const [valuePlaceholder, setvaluePlaceholder] = useState("");
  const [adresV, setAdresV] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [tonPrice, setTonPrice] = useState("");
  const [valuePrice, setValuePrice] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [sumValue, setSumValue] = useState();

  const handleChange = (e) => {
    const result = e.target.value.replace(/[^\d.]/g, "");

    setValueInput(result);
  };

  function changeRadio(e) {
    setValueInput("");
    setValueSwitch(e.target.value);
  }

  useEffect(() => {
    if (valueSwitch == "ton") {
      setvaluePlaceholder("Сумма в тонах");
      setFinalPrice(tonPrice * valuePrice * valueInput);
      setSumValue("рублей");
    }

    if (valueSwitch == "ruble") {
      setvaluePlaceholder("Сумма в рублях");
      setFinalPrice(valueInput / (tonPrice * valuePrice));
      setSumValue("TON");
    }
  });

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/the-open-network")
      .then((res) => res.json())
      .then((data) => setTonPrice(data.market_data.current_price.usd));
  }, [tonPrice]);

  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/latest.js")
      .then((res) => res.json())
      .then((data) => {
        const price = 1 / data.rates.USD;
        setValuePrice(price);
      });
  }, [valuePrice]);

  return (
    <div className="paymentMain">
      <label className="paymentHead">Выберите валюту</label>
      <div>
        <div className="valueBox">
          <div>
            <input
              type="radio"
              id="ruble"
              name="value"
              value="ruble"
              checked={valueSwitch === "ruble"}
              onChange={changeRadio}
            />
            <label htmlFor="ruble">В рублях</label>
          </div>
          <div>
            <input
              type="radio"
              id="ton"
              name="value"
              value="ton"
              checked={valueSwitch === "ton"}
              onChange={changeRadio}
            />
            <label htmlFor="ton">В тонах</label>
          </div>
        </div>
      </div>
      <div className="inputBox">
        <TextField
          label="Адрес кошелька"
          variant="outlined"
          id="adres"
          onChange={(e) => {
            setAdresV(e.target.value);
          }}

        />
        <TextField
          id="sum"
          label={valuePlaceholder}
          variant="outlined"
          value={valueInput}
          onChange={handleChange}
        />
      </div>

      <label className="priceBox">
        Сумма: <span id="ton-price">{finalPrice || 0}</span> {sumValue}
      </label>
      <button>Оплатить</button>
    </div>
  );
};
