const tasteData = [
  {
    id: 1,
    title: "Fresh, Seasonal Ingredients",
    desc: "Our menu follows the seasons, featuring the best local produce available",
  },
  {
    id: 2,
    title: "Comfort Food, Elevated",
    desc: "We have simple crowd-favorites on the menu - but we do them well. Our flavors stand out, guaranteed.",
  },
  {
    id: 3,
    title: "Better Beverages",
    desc: "We're your cafe and barista in one, serving your favorite cuppa by sun-up, and your cocktail-of-choice by sundown.",
  },
];

const tasteContainer = document.getElementById("taste-features");

tasteData.forEach((item) => {
  const feature = document.createElement("div");
  feature.className = "taste-feature";
  feature.innerHTML = `
    <h3>${item.id}</h3>
    <div class="feature-text">
      <h4>${item.title}</h4>
      <p>${item.desc}</p>
    </div>
  `;
  tasteContainer.appendChild(feature);
});

const menu = [
  {
    id: 1,
    img: "/images/menu-section-burgers.jpg",
    title: "Burgers",
    desc: "Packed with flavor and cooked to perfection",
  },
  {
    id: 2,
    img: "/images/menu-dection-wings.jpg",
    title: "Wings",
    desc: "Paired with dipping sauces that are too good to pass up",
  },
  {
    id: 3,
    img: "/images/menu-section-drinks.jpg",
    title: "Drinks",
    desc: "Choose from classic blends and unique concoctions",
  },
];

const MenuContainer = document.getElementById("menu-container");

menu.forEach((item) => {
  const div = document.createElement("div");
  div.className = "menu-item-container";
  div.innerHTML = `
        <img src="${item.img}" alt='${item.title}'/>
        <div class='menu-img-text'>
            <h4>${item.title}</h4>
            <p>${item.desc}<p/>
        </div>
    `;
  MenuContainer.appendChild(div);
});

const community = [
  {
    id: 1,
    img: "/images/person-1.jpg",
    name: "Mara, TSB regular since 2015",
    desc: "TSB is a huge part of my life. The staff feels like family, and they know just how I like my coffee - and my gourmet burger fix!",
  },
  {
    id: 2,
    img: "/images/person-2.jpg",
    name: "Brock, new in town",
    desc: "I stumbled upon TSB when I was exploring my new neighborhood. Everyone was so friendly, and the food was delish! Will be back.",
  },
  {
    id: 3,
    img: "/images/person-3.jpg",
    name: "Steffi, lives around the corner",
    desc: "So glad to have a neighborhood cafe, hangout spot, and bar all in one and nearby! Comfort food in a comforting atmosphere - need I say more?",
  },
  
];

const communityContainer = document.getElementById('community-container');

community.forEach((person) => {
    const div = document.createElement('div');
    div.className = 'community-person';
    div.innerHTML = `
        <img src='${person.img}' alt='${person.name}'/>
        <div class='community-person-text'>
            <h5>${person.name}</h5>
            <p>${person.desc}</p>
        </div>
    `;
    communityContainer.appendChild(div)
})