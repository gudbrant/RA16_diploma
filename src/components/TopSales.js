import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTopSalesRequest, fetchTopSalesClear } from '../actions/topSalesActions';
import Card from './Card';

export default function TopSales() {
  const { items, loading, error } = useSelector((state) => state.topSalesList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTopSalesRequest());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(fetchTopSalesClear());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRepeat = () => {
    dispatch(fetchTopSalesRequest());
  };

  return (
    <>
      {loading && <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>}

      {error && <div className="error-msg">
        <p>Произошла ошибка</p>
        <div onClick={handleRepeat}>Повторить запрос</div>
      </div>}

      <div className="row">
        {items.map((item) => <Card item={item} key={item.id} />)}
      </div>
    </>
  );
}
