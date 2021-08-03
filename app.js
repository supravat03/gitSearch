// const fetch=require ('node-fetch');








let presentData = true;
var pageCount = 1;
let totalRepoPage = 1,
    totalFollowersPage = 1,
    totalFollowingPage = 1;
let repoEvent = false, followersEvent = false, followingEvent = false;
const url = "https://api.github.com/users/";
let searchData = "";
let followerURL = "";
let followingURL = "";
const avatar = document.querySelector(".avatar");
const userName = document.querySelector(".userName");
const gitUrl = document.querySelector(".gitUrl");
const repos = document.querySelector(".repos");
const follower = document.querySelector(".followers");
const following = document.querySelector(".following");
const searchBtn = document.querySelector(".searchBtn");
const getRepos = document.querySelector(".getRepos");
const getFollowers = document.querySelector(".getFollowers");
const getFollowing = document.querySelector(".getFollowing");
const showRepo = document.querySelector(".showRepo");
const showDataDiv = document.querySelector(".showData");
const pagination = document.querySelector(".pagination");





pagination.style.visibility = "hidden";



async function fetchData(url) {
    console.log(presentData);
    let data = await fetch(url);
    let dataJson = await data.json();
    return dataJson;
}

async function setData(url) {
    let data = await fetchData(url);
    showDataDiv.style.visibility = "hidden";
    pagination.style.visibility = "hidden";
    if (data["message"]) {
        presentData = false;
        userName.innerHTML = `<h2 style="color:red">${data["message"]}</h2>`;
        avatar.src = "https://bootdey.com/img/Content/avatar/avatar2.png";
        gitUrl.href = "#";
        repos.innerText = "XXXX";
        follower.innerText = "XXXX";
        following.innerText = "XXXX";

        return;
    }
    presentData = true;

    avatar.src = data["avatar_url"];
    userName.innerText = data["login"];
    gitUrl.href = data["html_url"];
    repos.innerText = data["public_repos"];
    follower.innerText = data["followers"];
    following.innerText = data["following"];

    followerURL = data["followers_url"] + "?per_page=32";
    followingURL = "https://api.github.com/users/" + data["login"] + "/following" + "?per_page=32";
    totalRepoPage = Math.ceil(data["public_repos"] / 30);
    totalFollowersPage = Math.ceil(data["followers"] / 30);
    totalFollowingPage = Math.ceil(data["following"] / 30);
    // console.log(totalPage)
}

searchBtn.addEventListener("click", () => {
    searchData = document.querySelector("#search").value;
    if (searchData === "") return;
    //  console.log(searchData);
    const newUrl = url + searchData;
    // console.log(newUrl);
    setData(newUrl);
});

getRepos.addEventListener("click", () => {
    // console.log(searchData);
    if (presentData) {
        repoEvent = true;
        followersEvent = false;
        followingEvent = false;
        resetDefaultBtn();
        getRepoData(searchData);
    }
});

getFollowers.addEventListener("click", () => {
    if (presentData) {
        repoEvent = false;
        followersEvent = true;
        followingEvent = false;
        resetDefaultBtn();
        getFollow(followerURL);
    }
});

getFollowing.addEventListener("click", () => {
    if (presentData) {
        repoEvent = false;
        followersEvent = false;
        followingEvent = true;
        resetDefaultBtn();
        getFollow(followingURL);
    }
});

async function getRepoData(searchData) {
    const repoUrl = "https://api.github.com/users/" + searchData + "/repos?page=" + pageCount;
    let repoData = await fetchData(repoUrl);
    showData(repoData);
}

async function getFollow(url) {
    let followData = await fetchData(url);
    showFollow(followData);
}

function showData(repoData) {
    let fragment = new DocumentFragment();

    repoData.forEach(function (repo) {
        let li = document.createElement("li");
        let outerDiv = document.createElement("div");
        let middleDiv = document.createElement("div");
        let innerDiv = document.createElement("div");
        let h3 = document.createElement("h3");
        let h2_star = document.createElement("h2");
        let h2_fork = document.createElement("h2");
        let p = document.createElement("p");
        let a = document.createElement("a");
        let outerA = document.createElement("a");
        let span_star = document.createElement("span");
        let span_fork = document.createElement("span");
        let i_star = document.createElement("i");
        let i_fork = document.createElement("i");

        // To add required Classes
        outerDiv.classList.add("col-md-6", "col-sm-6");
        outerA.classList.add("textDecoration");
        middleDiv.classList.add("repocard", "bg-c-yellow", "order-card");
        innerDiv.classList.add("card-block");
        // h6.classList.add("m-b-20");
        h2_star.classList.add("text-right", "inlineBlock");
        h2_fork.classList.add("text-right", "inlineBlock", "space");
        p.classList.add("m-b-0");
        i_star.classList.add("fa", "fa-star");
        i_fork.classList.add("fa", "fa-code-fork");
        a.classList.add("textDecoration");

        //To add innerHtml/innerText
        a.href = repo["html_url"];
        a.innerText = repo["name"];
        span_star.innerText = repo["stargazers_count"];
        span_fork.innerText = repo["forks_count"];
        p.innerText = repo["description"];
        outerA.href = repo["html_url"];

        //to append childs
        h3.appendChild(a);
        h2_star.appendChild(i_star);
        h2_star.appendChild(span_star);
        h2_fork.appendChild(i_fork);
        h2_fork.appendChild(span_fork);
        innerDiv.appendChild(h3);
        innerDiv.appendChild(h2_star);
        innerDiv.appendChild(h2_fork);
        innerDiv.appendChild(p);
        middleDiv.appendChild(innerDiv);
        outerA.appendChild(middleDiv);
        outerDiv.appendChild(outerA);
        fragment.appendChild(outerDiv);
    });

    while (showRepo.firstChild && showRepo.removeChild(showRepo.firstChild));
    showRepo.appendChild(fragment);
    showDataDiv.style.visibility = "visible";
    pagination.style.visibility = "visible";

}

function showFollow(followData) {
    let fragment = new DocumentFragment();

    followData.forEach((data) => {
        let outerA = document.createElement("a");
        let outerDiv = document.createElement("div");
        let innerDiv = document.createElement("div");
        let img = document.createElement("img");
        let h4 = document.createElement("h4");
        let a = document.createElement("a");
        let i = document.createElement("i");

        outerA.classList.add("inlineBlock");
        outerDiv.classList.add("col-md-3", "followChange");
        innerDiv.classList.add("bg-white", "rounded", "shadow-sm", "py-1", "px-1");
        img.classList.add(
            "img-fluid",
            "rounded-circle",
            "mb-3",
            "img-thumbnail",
            "shadow-sm"
        );
        h4.classList.add("mb-0");
        i.classList.add("fa", "fa-github");

        img.src = data["avatar_url"];
        a.href = data["html_url"];
        h4.innerText = data["login"];
        outerA.href = data["html_url"];

        a.appendChild(i);
        innerDiv.appendChild(img);
        innerDiv.appendChild(h4);
        innerDiv.appendChild(a);
        outerDiv.appendChild(innerDiv);

        fragment.appendChild(outerDiv);
    });

    while (showRepo.firstChild && showRepo.removeChild(showRepo.firstChild));
    showRepo.appendChild(fragment);
    showDataDiv.style.visibility = "visible";
    pagination.style.visibility = "visible";

}

const btnPrev = document.querySelector(".btnPrev");
const btnNext = document.querySelector(".btnNext");
const pageBtn = document.querySelectorAll(".pageBtn");

btnPrev.addEventListener("click", (e) => {
    const preValue = e.target.value;
   
    if (preValue >= 1) {
        decreasePage();
    }
});

btnNext.addEventListener("click", (e) => {
    const nextValue = parseInt(e.target.value);

    if (repoEvent == true && nextValue <= totalRepoPage) {
        increasePage();
    }
    else if (followingEvent == true && nextValue <= totalFollowingPage) {
        increasePage();
    } else if (followersEvent == true && nextValue <= totalFollowersPage) {
        increasePage();
    }
});

pageBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.value;
        if (repoEvent == true && value <= totalRepoPage) {
            pageCount = value;
            getRepoData(searchData);
        } else if (followersEvent == true && value <= totalFollowersPage) {
            pageCount = value;
            getFollow(`${followerURL}&page=${value}`);
        } else if (followingEvent == true && value <= totalFollowingPage) {
            pageCount = value;
            getFollow(`${followingURL}&page=${value}`);
        }
    });
});

function increasePage() {
    btnPrev.value = parseInt(btnPrev.value) + 5;
    btnNext.value = parseInt(btnNext.value) + 5;

    pageBtn.forEach((btn) => {
        btn.value = parseInt(btn.value) + 5;
        btn.innerText = parseInt(btn.value);
    });

}

function decreasePage() {
    btnPrev.value = parseInt(btnPrev.value) - 5;
    btnNext.value = parseInt(btnNext.value) - 5;

    pageBtn.forEach((btn) => {
        btn.value = parseInt(btn.value) - 5;
        btn.innerText = parseInt(btn.value);
    });
}

function resetDefaultBtn() {
    let i = 1;
    btnPrev.value = 0;
    btnNext.value = 6;
    pageBtn.forEach((btn) => {
        btn.value = parseInt(i);
        btn.innerText = parseInt(i);
        i++;
    });

}
