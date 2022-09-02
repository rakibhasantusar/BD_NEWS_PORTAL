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
    news.forEach(newsDetail => {
        console.log(newsDetail);
        const { title, image_url, details, author, total_view } = newsDetail
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col')
        newsDiv.innerHTML = `
        <div class="card h-100">
        <img src="${image_url}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>
            <div class="d-flex justify-content-around">
                <div class="d-flex justify-content-around w-75">
                    <img class="img-fluid w-25 rounded-circle" src="${author.img}" alt="">
                    <p class="ml-2" >Author:${author.name}</p>
                </div>
                <div class="">
                    <p>Views: ${total_view}</p>
                </div>
            </div>
        </div>
    </div>
        `;
        newsDetailsBar.appendChild(newsDiv)
    });
}


setAllCategories()