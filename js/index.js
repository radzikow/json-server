// javascript for index.html

const container = document.querySelector('.blogs');
const searchForm = document.querySelector('form.search');

const renderPosts = async (term) => {
  let uri = 'http://localhost:3000/posts?_sort=likes&_order=desc';

  if(term) {
    uri += `&q=${term}`;
  }

  const res = await fetch(uri);
  const posts = await res.json();

  let template = '';
  [...posts].forEach(post => {
    template += `
      <div class="posts">
        <h2>${post.title}</h2>
        <p><small>Likes: ${post.likes}</small></p>
        <p>${post.body.slice(0, 200)}</p>
        <div>
          <a href="/details.html?id=${post.id}">read more..</a>
        </div>
      </div>
    `;
  });

  container.innerHTML = template;
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  renderPosts(searchForm.term.value.trim());
});

window.addEventListener('DOMContentLoaded', () => renderPosts());