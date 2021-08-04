// const fetch=require ('node-fetch');

if('ServiceWorker' in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log("service worker registered ", reg))
        .catch((err) => console.log("not registered",err))
    });
}



if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}

console.log("app.js running");

import {fetchData,getRepoData,getFollow} from './fetchData.js';
import {increasePage,decreasePage, resetDefaultBtn} from './btnControl.js';




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
let repoData=[], followersData=[], followingData=[];



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




searchBtn.addEventListener("click", () => {
    searchData = document.querySelector("#search").value;
    if (searchData === "") return;
    //  console.log(searchData);
    const newUrl = url + searchData;
    // console.log(newUrl);
    
    setData(newUrl);
});


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


    const repoUrl = "https://api.github.com/users/" + searchData + "/repos?page=" + pageCount;
    followerURL = data["followers_url"] + "?per_page=32";
    followingURL = "https://api.github.com/users/" + data["login"] + "/following" + "?per_page=32";
    totalRepoPage = Math.ceil(data["public_repos"] / 30);
    totalFollowersPage = Math.ceil(data["followers"] / 30);
    totalFollowingPage = Math.ceil(data["following"] / 30);
    // console.log(totalPage)


    //fetchAll calls to fetch following, followers and repo Data
    Promise.all([
        fetchData(repoUrl),
        fetchData(followerURL),
        fetchData(followingURL)
    ])
    .then((data)=>{
        // console.log(data[0]);
        repoData= data[0];
        followersData= data[1];
        followingData= data[2];
    })
    .catch(err=> console.error(err));
}

getRepos.addEventListener("click", () => {
    // console.log(searchData);
    if (presentData) {
        repoEvent = true;
        followersEvent = false;
        followingEvent = false;
        resetDefaultBtn(btnPrev,btnNext,pageBtn);
        getRepoData(repoData,pageCount,showRepo,showDataDiv,pagination,"");
      
    }
});

getFollowers.addEventListener("click", () => {
    if (presentData) {
        repoEvent = false;
        followersEvent = true;
        followingEvent = false;
        resetDefaultBtn(btnPrev,btnNext,pageBtn);
        getFollow(followersData,showRepo,showDataDiv,pagination,"");
    }
});

getFollowing.addEventListener("click", () => {
    if (presentData) {
        repoEvent = false;
        followersEvent = false;
        followingEvent = true;
        resetDefaultBtn(btnPrev,btnNext,pageBtn);
        getFollow(followingData,showRepo,showDataDiv,pagination,"");
    }
});



const btnPrev = document.querySelector(".btnPrev");
const btnNext = document.querySelector(".btnNext");
const pageBtn = document.querySelectorAll(".pageBtn");

btnPrev.addEventListener("click", (e) => {
    const preValue = e.target.value;
    console.log(preValue);
    if (preValue >= 1) {
        decreasePage(btnPrev,btnNext,pageBtn);
    }
});

btnNext.addEventListener("click", (e) => {
    const nextValue = parseInt(e.target.value);
    console.log(e.target.value);

    if (repoEvent == true && nextValue <= totalRepoPage) {
        increasePage(btnPrev,btnNext,pageBtn);
    }
    else if (followingEvent == true && nextValue <= totalFollowingPage) {
        increasePage(btnPrev,btnNext,pageBtn);
    } else if (followersEvent == true && nextValue <= totalFollowersPage) {
        increasePage(btnPrev,btnNext,pageBtn);
    }
});

pageBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        console.log(e.target.value);
        const value = e.target.value;
        if (repoEvent == true && value <= totalRepoPage) {
            pageCount = value;
            getRepoData([],pageCount,showRepo,showDataDiv,pagination,searchData);
        } else if (followersEvent == true && value <= totalFollowersPage) {
            pageCount = value;
            getFollow([],showRepo,showDataDiv,pagination,`${followerURL}&page=${value}`);
        } else if (followingEvent == true && value <= totalFollowingPage) {
            pageCount = value;
            getFollow([],showRepo,showDataDiv,pagination,`${followingURL}&page=${value}`);
        }
    });
});











/*


let domElements=[
    "presentData","pageCount","totalRepoPage","totalFollowersPage","totalFollowingPage",
    "url","searchData","followerURL","followingURL","avatar","userName","gitUrl","repos","follower","following",
    "searchBtn","getRepos","getFollowers","getFollowing","showRepo","showDataDiv","pagination"
];


*/