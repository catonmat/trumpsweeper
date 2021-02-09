import { CellState } from '../globals'
import './Tweet.scss'

export default function Tweet({ clicked, tweet }: CellState) { 
  if (tweet) {
    const { date, content, lie, source } = tweet
    return(
      <>
        <div data-testid='tweet-panel' className='tweet-container'>
          <p data-testid='tweet-panel-date' className='date'>{date}</p>
          <p data-testid='tweet-panel-content' className='content'>{content}</p>  
          { clicked && (
            <>
              <p>Status : {lie ? 'Lie!' : 'True'} </p>
              <p>Source : {source} </p>
            </>
          ) }
        </div>
      </>
    )
  } else {
    return(<></>)
  }
}
