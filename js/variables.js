
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


