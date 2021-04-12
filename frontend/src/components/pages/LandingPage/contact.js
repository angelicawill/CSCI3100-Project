import './style.css'
import GitHubIcon from '@material-ui/icons/GitHub';

export const Contact = (props) => {
 
  
  return (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-12'>
            <div className='row'>
              <div>
              <h2>Source Code</h2>
              <div className='social'>  
                  <a href={props.data ? props.data.github : '/'}>
                    <GitHubIcon className='social-icon' />
                  </a>                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='footer'>        
          <p>
            &copy; Group C7, CSCI3100 Spring 2021
          </p>        
      </div>
    </div>
  )
}
