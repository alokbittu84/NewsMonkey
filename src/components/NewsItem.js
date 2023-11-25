import React from 'react'


export default function NewsItem(props) {

  
    let {title, description,imageUrl,newsUrl, author, publishTime,source}= props;
    // by this ,destucturing happens and we have not to write props.title ,props.auther etc
    return (
      <div>
        <div className="card" >
        <span className="position-absolute top-0  badge rounded-pill text-bg-danger" style={{zIndex:"1",left:'0%'}}>{source}</span>
  <img src={imageUrl} className="card-img-top" alt="..."/>
  
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-body-secondary">By <b>{author}</b> on {publishTime}</small></p>
    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>


      </div>
    )
  }
