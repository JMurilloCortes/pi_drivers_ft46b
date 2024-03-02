import React from "react";
import { connect } from "react-redux";
import {
  nextPage,
  prevPage,
  goToPage,
  goToFirstPage,
  goToLastPage,
} from "../../redux/actions/paginationActions";
import Card from "../card/Card";
import styles from "./Cards.module.css";

const Cards = ({
  drivers,
  currentPage,
  nextPage,
  prevPage,
  goToPage,
  goToFirstPage,
  goToLastPage,
}) => {
  const driversPerPage = 9;
  const totalPages = Math.ceil(drivers.length / driversPerPage);
  const firstIndex = currentPage * driversPerPage;
  const lastIndex = firstIndex + driversPerPage;
  const currentDrivers = drivers.slice(firstIndex, lastIndex);

  const handleNextPage = () => {
    nextPage();
  };

  const handlePrevPage = () => {
    prevPage();
  };

  const handleGoToFirstPage = () => {
    goToFirstPage();
  };

  const handleGoToLastPage = () => {
    goToLastPage();
  };

  const handlePageClick = (page) => {
    goToPage(page);
  };


  const renderPageNumbers = () => {
    const visiblePages = 10;
    const middlePage = Math.ceil(visiblePages / 2);
    const startPage = Math.max(0, currentPage - middlePage);
    const endPage = Math.min(totalPages, startPage + visiblePages);

    return Array.from(
      { length: endPage - startPage },
      (_, i) => startPage + i
    ).map((page) => (
      <span
        key={page}
        className={
          currentPage === page
            ? `${styles.page} ${styles.activePage}`
            : styles.page
        }
        onClick={() => handlePageClick(page)}
      >
        {page + 1}
      </span>
    ));
  };

  return (
    <div className={styles["cards-container"]}>
      <div className={styles.cards}>
        {currentDrivers.map((driver) => (
          <Card key={driver.id} driver={driver} />
        ))}
      </div>
      <br />
      <br />
      <div className={styles.global}>
        <div className={styles.pageControl} onClick={handleGoToFirstPage}>
          <b>{"<<"}</b>
        </div>
        <div className={styles.pageControl} onClick={handlePrevPage}>
          <b>{"<"}</b>
        </div>
        <div>
          <b>{renderPageNumbers()}</b>
        </div>
        <div className={styles.pageControl} onClick={handleNextPage}>
          <b>{">"}</b>
        </div>
        <div className={styles.pageControl} onClick={handleGoToLastPage}>
          <b>{">>"}</b>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentPage: state.currentPage,
});

const mapDispatchToProps = {
  nextPage,
  prevPage,
  goToPage,
  goToFirstPage,
  goToLastPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
