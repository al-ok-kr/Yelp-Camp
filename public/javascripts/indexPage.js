const loading = document.querySelector('.loading')
const div = document.querySelector('#container')
const camps = JSON.parse(campgrounds)
let i = 10;
const showLoading = () => {
    loading.classList.add('show');
}

const addCamp = () => {
    for (let j = 0; j < 10; j++) {
        loading.classList.remove('show');
        var cardmb3 = document.createElement('div')
        cardmb3.classList.add('card')
        cardmb3.classList.add('mb-3')
        var row = document.createElement('div')
        row.classList.add('row')
        var colmd4 = document.createElement('div')
        const img = document.createElement('img')
        img.src = camps.features[i].images[0].url
        img.classList.add('img-fluid')
        var colmd8 = document.createElement('div')
        colmd4.classList.add('col-md-4')
        colmd8.classList.add('col-md-8')
        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')
        colmd4.appendChild(img)
        const h5 = document.createElement('h5')
        h5.classList.add('card-title')
        h5.innerText = camps.features[i].title
        cardBody.appendChild(h5)
        const p1 = document.createElement('p')
        p1.classList.add('card-text')
        p1.innerText = camps.features[i].description
        cardBody.appendChild(p1)
        const p2 = document.createElement('p')
        p2.classList.add('card-text')
        const small = document.createElement('small')
        small.classList.add('text-muted')
        small.innerText = camps.features[i].location
        p2.appendChild(small)
        cardBody.appendChild(p2)
        const a = document.createElement('a')
        a.classList.add('btn')
        a.classList.add('btn-primary')
        a.innerText = camps.features[i].title
        a.href = `/campgrounds/${camps.features[i]._id}`
        cardBody.appendChild(a)
        colmd8.appendChild(cardBody)
        row.appendChild(colmd4)
        row.appendChild(colmd8)
        cardmb3.appendChild(row)
        div.appendChild(cardmb3);
        i++;
    }
}

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 3) {
        showLoading();
        setTimeout(addCamp, 1000)
    }

})