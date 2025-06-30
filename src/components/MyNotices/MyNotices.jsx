import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectViewedNotices } from '../../redux/users/selectors.js';
import { selectFavoritesNotices } from '../../redux/users/selectors.js';
import css from './MyNotices.module.css';
import { fetchUserFullInfo } from '../../redux/users/operations.js';
import NoticesList from '../NoticesList/NoticesList.jsx';
const MyNotices = () => {
  const favorites = useSelector(selectFavoritesNotices);
  const viewedNotices = useSelector(selectViewedNotices);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('favorites');

  useEffect(() => {
    if (activeTab === 'favorites') {
      dispatch(fetchUserFullInfo());
    } else {
      dispatch(fetchUserFullInfo());
    }
  }, [activeTab, dispatch]);

  const handleTabClick = tab => {
    setActiveTab(tab);
  };

  return (
    <div>
      <nav className={css.tabs} role="tablist" aria-label="User notices tabs">
        <button
          id="tab-favorites"
          role="tab"
          aria-selected={activeTab === 'favorites'}
          aria-controls="tabpanel-favorites"
          tabIndex={activeTab === 'favorites' ? 0 : -1}
          className={`${css.tab} ${
            activeTab === 'favorites' ? css.active : ''
          }`}
          onClick={() => handleTabClick('favorites')}
        >
          My favorite pets
        </button>
        <button
          id="tab-viewed"
          role="tab"
          aria-selected={activeTab === 'viewed'}
          aria-controls="tabpanel-viewed"
          tabIndex={activeTab === 'viewed' ? 0 : -1}
          className={`${css.tab} ${activeTab === 'viewed' ? css.active : ''}`}
          onClick={() => handleTabClick('viewed')}
        >
          Viewed
        </button>
      </nav>

      <div className="content">
        {activeTab === 'favorites' && (
          <section
            id="tabpanel-favorites"
            role="tabpanel"
            aria-labelledby="tab-favorites"
            tabIndex={0}
          >
            {favorites?.length > 0 ? (
              <NoticesList
                notices={favorites}
                className={'listNoticesUserFav'}
              />
            ) : (
              <p className={css.desc}>
                Oops,
                <span className={css.descPart}>
                  {' '}
                  looks like there aren't any furries{' '}
                </span>
                on our adorable page yet. Do not worry! View your pets on the
                "find your favorite pet" page and add them to your favorites.
              </p>
            )}
          </section>
        )}

        {activeTab === 'viewed' && (
          <section
            id="tabpanel-viewed"
            role="tabpanel"
            aria-labelledby="tab-viewed"
            tabIndex={0}
          >
            {viewedNotices?.length > 0 ? (
              <NoticesList
                className={'listNoticesUserViewed'}
                notices={viewedNotices}
              />
            ) : (
              <p className={css.desc}>You have not viewed any pets yet.</p>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default MyNotices;
