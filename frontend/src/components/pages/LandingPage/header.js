import './style.css'
import {ReactComponent as Logo} from './../../logo-white.svg';

export const Header = (props) => {
  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <a href='/'><Logo className='landing-page-logo'/></a>
                <h1>
                  Find the perfect tutor for you
                  <span></span>
                </h1>
                <p>We help you connect and arrange meetings with the best tutors in Hong Kong to learn a variety of different subjects and skills.</p>
                <a
                  href='/register'
                  className='btn btn-custom btn-lg page-scroll'
                >
                  Get Started
                </a>{' '}
                <a
                  href='/login'
                  className='btn btn-custom-outline btn-lg page-scroll'
                >
                  Sign In
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
