import React, { useState, useEffect } from 'react';
import Title from '../../components/Title/Title.jsx';
import NoticesFilters from '../../components/NoticesFilters/NoticesFilters.jsx';
import NoticesList from '../../components/NoticesList/NoticesList.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { fetchNotices } from '../../redux/notices/operations.js';
import {
  selectNotices,
  selectNoticesPage,
  selectTotalPages,
} from '../../redux/notices/selectors.js';
import { selectFavoritesNotices } from '../../redux/users/selectors.js';

import css from './NoticesPage.module.css';

const NoticesPage = () => {
  const dispatch = useDispatch();
  const notices = useSelector(selectNotices) ?? [];
  const totalPages = useSelector(selectTotalPages) ?? 0;
  const currentPage = useSelector(selectNoticesPage) ?? 1;
  const favoritesNotices = useSelector(selectFavoritesNotices) ?? [];
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    species: '',
    locationId: '',
    sex: '',
    byPrice: null,
    byPopularity: null,
    page: 1,
    limit: 6,
  });

  useEffect(() => {
    dispatch(fetchNotices(filters));
  }, [filters, dispatch]);
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1,
    }));
  };

  const handleSortChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1,
    }));
  };

  const handlePageChange = page => {
    setFilters(prev => ({
      ...prev,
      page,
    }));
  };

  const resetFilters = () => {
    setFilters({
      keyword: '',
      category: '',
      species: '',
      locationId: '',
      sex: '',
      byPrice: null,
      byPopularity: null,
      page: 1,
      limit: 6,
    });
  };

  return (
    <section aria-label="Search favorite pets">
      <div className={css.wrapper}>
        <Title>Find your favorite pet</Title>
      </div>

      <NoticesFilters
        keyword={filters.keyword}
        category={filters.category}
        species={filters.species}
        locationId={filters.locationId}
        sex={filters.sex}
        byPrice={filters.byPrice}
        byPopularity={filters.byPopularity}
        handleFilterChange={handleFilterChange}
        handleSortChange={e => {
          const val = e.target.value;

          if (val === 'popularity') {
            setFilters(prev => ({
              ...prev,
              byPopularity: false,
              byPrice: null,
              page: 1,
            }));
          } else if (val === 'unpopularity') {
            setFilters(prev => ({
              ...prev,
              byPopularity: true,
              byPrice: null,
              page: 1,
            }));
          } else if (val === 'cheap') {
            setFilters(prev => ({
              ...prev,
              byPrice: true,
              byPopularity: null,
              page: 1,
            }));
          } else if (val === 'expensive') {
            setFilters(prev => ({
              ...prev,
              byPrice: false,
              byPopularity: null,
              page: 1,
            }));
          } else {
            setFilters(prev => ({
              ...prev,
              byPrice: null,
              byPopularity: null,
              page: 1,
            }));
          }
        }}
        resetFilters={resetFilters}
      />

      <div className={css.wrapper}>
        {notices.length > 0 ? (
          <>
            <NoticesList
              notices={notices}
              favoritesNotices={favoritesNotices}
            />
            <Pagination
              totalPages={totalPages}
              currentPage={filters.page}
              setCurrentPage={handlePageChange}
            />
          </>
        ) : (
          <div>Not found</div>
        )}
      </div>
    </section>
  );
};

export default NoticesPage;
