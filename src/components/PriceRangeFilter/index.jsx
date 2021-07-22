import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { priceFormat, noDecimals } from "../../utils/priceFormat";
import "./PriceRangeFilter.scss";

const initialRange = { minRange: 0, maxRange: 100 };

const PriceRangeFilter = ({ priceRange, setPriceRange, clean }) => {
  const [ranges, setRanges] = useState(initialRange);

  useEffect(() => {
    setRanges(initialRange);
    setPriceRange({
      minPriceSel: priceRange.minPrice,
      maxPriceSel: priceRange.maxPrice
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceRange.minPrice, priceRange.maxPrice, clean]);

  const handleChangeRange = e => {
    const target = e.target;
    const value = parseFloat(target.value);
    const name = target.name;
    if (
      (name === "minRange" && value <= ranges.maxRange) ||
      (name === "maxRange" && value >= ranges.minRange)
    ) {
      setRanges({ ...ranges, [name]: value });
    } else {
      setRanges({ minRange: value, maxRange: value });
    }
  };

  const minPriceSel =
    priceRange.minPrice +
    ((priceRange.maxPrice - priceRange.minPrice) * ranges.minRange ** 2) /
      10000;

  const maxPriceSel =
    priceRange.minPrice +
    ((priceRange.maxPrice - priceRange.minPrice) * ranges.maxRange ** 2) /
      10000;

  return (
    <div>
      <Form.Group className="minPriceInput">
        <Form.Label>Precio Mínimo</Form.Label>
        <Form.Control
          name="minRange"
          type="range"
          value={ranges.minRange}
          min="0"
          max="100"
          step=".5"
          onChange={handleChangeRange}
          onPointerUp={e => setPriceRange({ minPriceSel, maxPriceSel }, e)}
          onKeyUp={e => setPriceRange({ minPriceSel, maxPriceSel }, e)}
        />
        <Form.Control
          type="text"
          value={`$${noDecimals(priceFormat(Math.ceil(minPriceSel)))}`}
          placeholder="$ Mín"
          disabled
          className="text-center mt-2"
        />
      </Form.Group>
      <Form.Group className="maxPriceInput">
        <Form.Label>Precio Máximo</Form.Label>
        <Form.Control
          name="maxRange"
          type="range"
          value={ranges.maxRange}
          min="0"
          max="100"
          step=".5"
          onChange={handleChangeRange}
          onPointerUp={e => setPriceRange({ minPriceSel, maxPriceSel }, e)}
          onKeyUp={e => setPriceRange({ minPriceSel, maxPriceSel }, e)}
        />
        <Form.Control
          type="text"
          value={`$${noDecimals(priceFormat(Math.ceil(maxPriceSel)))}`}
          placeholder="$ Máx"
          disabled
          className="text-center mt-2"
        />
      </Form.Group>
    </div>
  );
};

export default PriceRangeFilter;
