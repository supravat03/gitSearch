import {showData,showFollow} from './showData.js'


async function fetchData(url) {
    let data = await fetch(url);
    let dataJson = await data.json();
    return dataJson;
}


async function getRepoData(searchData,pageCount,showRepo,showDataDiv,pagination) {
    const repoUrl = "https://api.github.com/users/" + searchData + "/repos?page=" + pageCount;
    let repoData = await fetchData(repoUrl);
   showData(repoData,showRepo,showDataDiv,pagination);
//    return repoData;
}

async function getFollow(url,showRepo,showDataDiv,pagination) {
    let followData = await fetchData(url);

    showFollow(followData,showRepo,showDataDiv,pagination);
}

export  {fetchData,getRepoData,getFollow};