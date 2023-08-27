import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./SkeletonLoading.css"

const SkeletonLoading = () => {
  const [list, setList] = useState([]);
  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => setList(json))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 5000);
  }, []);
  const showCards = () => {
    return (
      <>
        {list.map((item) => {
          return (
            <div key={item.id} className="col-sm-4 card-group mb-4">
              <div className="card">
                <div className="card-body">{item.name}</div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  const showSkeleton = () => {
    return (
      <>
        {Array(20)
          .fill()
          .map((item, index) => {
            return (
              <div key={index} className="col-sm-4 card-group mb-4">
                <div className="card">
                  <Skeleton height={60} />
                </div>
              </div>
            );
          })}
      </>
    );
  };
  return (
    <div>
      <div className="row">
        {list.length > 0 ? showCards() : showSkeleton()}
      </div>
    </div>
  );
};
export default SkeletonLoading;
