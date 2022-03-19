import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import modal from '../../../libs/modal'
import LogInForm from '../forms/LogInForm/LogInForm'
import LogInModal from '../Modal/LogInModal/LogInModal'
import { useTracker } from 'meteor/react-meteor-data'
import cx from 'classnames'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import './style.scss'
import SignUpModal from '../Modal/SignUpModal/SignUpModal'
import SignUpForm from '../forms/SignUpForm/SignUpForm'
const Header = () => {
  let navigate = useNavigate()
  const [profileShow, setprofileShow] = useState(false)
  const user = useTracker(() => {
    return Meteor.user()
  })
  const { pathname } = useLocation()

  const profileDropHandler = () => {
    setprofileShow(!profileShow)
  }

  const handleClickAway = () => {
    setprofileShow(false)
  }

  const ModalLogInHandler = () => {
    modal.set('modalLogIn', {
      open: true
    })
  }
  const ModalSignUpHandler = () => {
    modal.set('modalSignUp', {
      open: true
    })
  }

  const logoutHandler = () => {
    Meteor.logout()

    navigate('/', { replace: true })
  }
  return (
    <header className='header'>
      <LogInModal>
        <LogInForm></LogInForm>
      </LogInModal>
      <SignUpModal>
        <SignUpForm></SignUpForm>
      </SignUpModal>

      <nav className='navbar navbar-expand-lg header-nav'>
        <div className='navbar-header'>
          <a id='mobile_btn' href='#'>
            <span className='bar-icon'>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>
          <Link to='/' className='navbar-brand logo'>
            <img src='/assets/img/logo.png' className='img-fluid' alt='Logo' />
          </Link>
          <a href='index.html' className='navbar-brand logo-small'>
            <img
              src='/assets/img/logo-icon.png'
              className='img-fluid'
              alt='Logo'
            />
          </a>
        </div>
        <div className='main-menu-wrapper'>
          <div className='menu-header'>
            <a href='index.html' className='menu-logo'>
              <img
                src='/assets/img/logo.png'
                className='img-fluid'
                alt='Logo'
              />
            </a>
            <a id='menu_close' className='menu-close' href='#'>
              <i className='fas fa-times'></i>
            </a>
          </div>
          <ul className='main-nav'>
            <li className={cx({ active: pathname === '/' })}>
              <Link to='/'>Home</Link>
            </li>
            {Meteor.userId() && (
              <li className={cx({ active: pathname === '/services' })}>
                <Link to='/services'>Services</Link>
              </li>
            )}

            <li className={cx({ active: pathname === '/providers' })}>
              <Link to='/providers'>Providers</Link>
            </li>
            {user?.profile?.isProvider && (
              <li className={cx({ active: pathname === '/clients' })}>
                <Link to='/clients'>Customers</Link>
              </li>
            )}
          </ul>
        </div>
        {!Meteor.userId() && (
          <>
            {' '}
            <ul className='nav header-navbar-rht'>
              <li
                className='nav-item nav-item--signUp'
                onClick={ModalSignUpHandler}
              >
                <Link
                  to=''
                  className='nav-link header-login'
                  data-bs-toggle='modal'
                  data-bs-target='#login_modal'
                >
                  SignUp
                </Link>
              </li>
            </ul>
            <ul className='nav header-navbar-rht'>
              <li className='nav-item' onClick={ModalLogInHandler}>
                <Link
                  to=''
                  className='nav-link header-login'
                  data-bs-toggle='modal'
                  data-bs-target='#login_modal'
                >
                  Login
                </Link>
              </li>
            </ul>
          </>
        )}

        {/******* */}
        {Meteor.userId() && (
          <ul className={cx('nav', 'header-navbar-rht')}>
            <li className='nav-item logged-item'>
              <a href='chat.html' className='nav-link'>
                <i className='fa fa-comments' aria-hidden='true'></i>
              </a>
            </li>
            <ClickAwayListener onClickAway={handleClickAway}>
              <li
                className={cx(
                  'nav-item',
                  'dropdown',
                  'has-arrow',
                  { 'logged-item': profileShow },
                  {
                    show: profileShow
                  }
                )}
              >
                <div
                  onClick={() => {
                    profileDropHandler()
                  }}
                  className={cx('dropdown-toggle', 'nav-link', {
                    show: profileShow
                  })}
                >
                  <span className='user-img'>
                    <img
                      className='rounded-circle'
                      src='/assets/img/customer/user-01.jpg'
                      alt=''
                    />
                  </span>
                </div>

                <div className='dropdown-menu dropdown-menu-end'>
                  <div className='user-header'>
                    <div className='avatar avatar-sm'>
                      <img
                        className='avatar-img rounded-circle'
                        src='/assets/img/customer/user-01.jpg'
                        alt=''
                      />
                    </div>
                    <div className='user-text'>
                      <h6>
                        {`${user?.profile?.name} ${user?.profile?.lastName}`}{' '}
                      </h6>
                      {true ? (
                        <p className='text-muted mb-0'>User</p>
                      ) : (
                        <p className='text-muted mb-0'>Provider</p>
                      )}
                    </div>
                  </div>
                  <a className='dropdown-item' href='user-dashboard.html'>
                    Dashboard
                  </a>
                  <a className='dropdown-item' href='favourites.html'>
                    Favourites
                  </a>
                  <a className='dropdown-item' href='user-bookings.html'>
                    My Bookings
                  </a>
                  <a className='dropdown-item' href='user-settings.html'>
                    Profile Settings
                  </a>
                  <a className='dropdown-item' href='all-services.html'>
                    Book Services
                  </a>
                  <a className='dropdown-item' href='chat.html'>
                    Chat
                  </a>
                  <div className='dropdown-item' onClick={logoutHandler}>
                    Logout
                  </div>
                </div>
              </li>
            </ClickAwayListener>
          </ul>
        )}
      </nav>
    </header>
  )
}

export default Header
