let ID =()=> Math.random().toString(36).substr(2,9);

const createAccordion = (index, id, title) => {
    let divAccordion = `
  <div class="accordion-item">
    <button class="accordion-button ${index === 0 ? "" : "collapsed"}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${id}" aria-expanded="true" aria-controls="collapse-${id}">
      ${title}
    </button>
    <div id="collapse-${id}" class="accordion-collapse collapse ${index === 0 ? "show" : ""}" aria-labelledby="heading-${id}" data-bs-parent="#accordionSection">
      <div class="accordion-body">
        <div id="indicator-${id}" class="carousel slide" data-ride="carousel"> 
          <div class="carousel-inner" id="carousel-inner-${id}"></div>
          <a class="carousel-control-prev" href="#indicator-${id}" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#indicator-${id}" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  </div>
`;
return divAccordion;
}

const renderCarouselItems = (id, items) => {
    const carouselInnerId = document.querySelector(`#carousel-inner-${id}`);
  const carouselTemplates = items.map((item, index) => carouselItemTemplate(item, index));
carouselInnerId.innerHTML = carouselTemplates.join('');
   console.log(carouselInnerId);
  }
  
  const carouselItemTemplate = (item, index) => `
  <div class="carousel-item ${index === 0 ? "active" : ""}">
      <div class="card d-block">
        <img class="w-100 img img-responsive" src="${item.enclosure.link}" alt="${item.guid}">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-author">${item.author} <span class="ellipse"></span> ${new Date(item.pubDate).toLocaleDateString()}</p>
          <p class="card-text">${item.description.slice(0, 100)}...
            <a href="${item.link}" class="card-link" target="_blank">View Details</a>
          </p>
        </div>
      </div>
    </div>
  `;
  


async function getRssFeed(magazines){
    const accordionSection = document.getElementById('makeAccordion');

    for(let i = 0 ; i < magazines.length ; i++){
        try{
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${magazines[i]}`);
            if(response.status === 200){
                const data = await response.json();
                const id = ID();
                const{feed,items} =data;

                const accordion = createAccordion(i,id, feed.title);
                accordionSection.innerHTML += accordion;
                renderCarouselItems(id,items);
            }
            else{
                throw new Error('Failed to fetch data');
            }
        }catch(err){
            console.error(err);
        }
    }
}



  export { getRssFeed };