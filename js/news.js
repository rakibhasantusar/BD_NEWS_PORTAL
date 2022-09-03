const loadNewsCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const response = await fetch(url);
    const data = await response.json();
    const categories = data.data.news_category
    return categories
}

const setAllCategories = async () => {
    const data = await loadNewsCategories();
    const categoryMenu = document.getElementById('news-category');
    data.forEach(news => {
        const newsItem = document.createElement('li');
        newsItem.innerHTML = `
        <a class="nav-link" onclick="loadDisplayNews('${news.category_id}')" href="#">${news.category_name}</a>
        `
        categoryMenu.appendChild(newsItem)
    });
}
const loadDisplayNews = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.data);
}

const displayNews = news => {
    const newsDetailsBar = document.getElementById('news-detail');
    newsDetailsBar.innerHTML = '';
    news.forEach(newsDetail => {
        // console.log(newsDetail);
        const { title, thumbnail_url, image_url, details, author, total_view, _id } = newsDetail
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div onclick="displayNewsModal('${_id}')" class="card h-100 m-4 mx-auto" data-bs-toggle="modal"
        data-bs-target="#exampleModal" class="card mb-3" style="max-width: 740px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${thumbnail_url}" class="img-fluid w-100 rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${details.slice(0, 200)}...</p>
                    <div class="d-flex justify-content-evenly  align-items-center ">
                        <img class="img-fluid w-25 p-4 rounded-circle" src="${author.img}" alt="">
                        <div class="d-flex justify-content-around">
                        <p class="">Author: <span class="text-primary"> ${author.name ? author.name : 'no data available'} </span></p>&nbsp;&nbsp;
                        <p class="">Views:<span class="text-primary"> ${total_view ? total_view : 'no views'}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
        newsDetailsBar.appendChild(newsDiv)
    });
}
const displayNewsModal = async (news_id) => {
    const url = ` https://openapi.programming-hero.com/api/news/${news_id}`
    const response = await fetch(url);
    const data = await response.json();
    displayNewsModalDetail(data.data[0]);
}
displayNewsModal()

const displayNewsModalDetail = newsModal => {
    console.log(newsModal);
    const newsDetailsBarModal = document.getElementById('news-detail-modal');
    newsDetailsBarModal.innerHTML = '';
    const { title, image_url, details, author, total_view, rating } = newsModal
    const newsDiv = document.createElement('div');
    newsDiv.classList.add('col')
    newsDiv.innerHTML = `
        <div class="card h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <img src="${image_url}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p>${details.slice(0, 200)} ...</p>
            <div class="d-flex justify-content-around bg-dark ">
                <p class="text-light my-auto">Engage: <span class="text-info">${rating.badge}</span></p>
                <p class="text-light my-auto" >Rating: <span class="text-info">${rating.number}</span></p>
            </div>
            <div class="d-flex justify-content-evenly  align-items-center ">
                <img class="img-fluid w-25 p-4 rounded-circle" src="${author.img}" alt="">
                <div class="d-flex justify-content-around">
                    <p class="">Author: <span class="text-primary"> ${author.name ? author.name : 'no data available'} </span></p>&nbsp;&nbsp;
                    <p class="">Views:<span class="text-primary"> ${total_view ? total_view : 'no views'}</span></p>
                </div>
        </div>
        </div>
    </div>
        `;
    newsDetailsBarModal.appendChild(newsDiv)
}




setAllCategories()