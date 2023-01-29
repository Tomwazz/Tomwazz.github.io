const rules = document.getElementById("Rules");
const price = document.getElementById("Price");
const info = document.getElementById("Info");
const navbar = document.getElementById("nav-bar");
const footer = document.querySelector("footer");
const hero = document.getElementById("hero");
const button = document.getElementById("submit");
const pravidla = document.getElementById("pravidla");
const informace = document.getElementById("informace");
const cena = document.getElementById("cena");
const normal = document.getElementById("Normal");
const fancy = document.getElementById("Fancy");
const wrapper = document.getElementById("page-wrapper");
const Back = document.getElementById("Back");
const video = document.querySelector("iframe");
Back.style.display = "none"; 
info.style.display = "none";
price.style.display = "none";
rules.style.display = "none";
navbar.style.display = "none";
footer.style.display = "none";
pravidla.style.display = "none";
informace.style.display = "none";
cena.style.display = "none";
normal.style.display = "none";
fancy.style.display = "none";
video.style.display = "none";
button.addEventListener('click', () => {
      hero.style.display = 'none';
      normal.style.display = "block";
      fancy.style.display = "block";
    });
normal.addEventListener('click', () => {
    normal.style.display = "none";
    fancy.style.display = "none";
    info.style.display = "block";
    rules.style.display = "flex";
    navbar.style.display = "flex";
    footer.style.display = "flex";
    price.style.display = "flex";
    video.style.display = "flex";
});
fancy.addEventListener('click', () => {
    pravidla.style.display = "block";
informace.style.display = "block";
cena.style.display = "block";
normal.style.display = "none";
    fancy.style.display = "none";
    Back.style.display = "none";
    video.style.display = "none";
});
pravidla.addEventListener('click', () => {
    rules.style.display = "flex";
    pravidla.style.display = "none";
    informace.style.display = "none";
    cena.style.display = "none";
    Back.style.display = "block";
    video.style.display = "flex";
});
informace.addEventListener('click', () => {
    info.style.display = "block";
    pravidla.style.display = "none";
    informace.style.display = "none";
    cena.style.display = "none";
    Back.style.display = "block";
    video.style.display = "none";
});
cena.addEventListener('click', () => {
    price.style.display = "flex";
    pravidla.style.display = "none";
    informace.style.display = "none";
    cena.style.display = "none";
    Back.style.display = "block";
    video.style.display = "none";
});
Back.addEventListener('click', () => {
    pravidla.style.display = "block";
informace.style.display = "block";
cena.style.display = "block";
normal.style.display = "none";
    fancy.style.display = "none";
    Back.style.display = "none";
    info.style.display = "none";
price.style.display = "none";
rules.style.display = "none";
navbar.style.display = "none";
footer.style.display = "none";

});
function redirect() {
window.location.href = "https://www.worldcubeassociation.org";
}