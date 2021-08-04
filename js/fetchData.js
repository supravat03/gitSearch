import {showData,showFollow} from './showData.js'


async function fetchData(url) {
    let data = await fetch(url);
    let dataJson = await data.json();
    return dataJson;
}


async function getRepoData(repoData,pageCount,showRepo,showDataDiv,pagination,searchData) {
    if(searchData !=""){
    const repoUrl = "https://api.github.com/users/" + searchData + "/repos?page=" + pageCount;
     repoData = await fetchData(repoUrl);
    }
   showData(repoData,showRepo,showDataDiv,pagination);
//    return repoData;
}

async function getFollow(followData,showRepo,showDataDiv,pagination,url) {
    if(url != ""){
     followData = await fetchData(url);

    }

    showFollow(followData,showRepo,showDataDiv,pagination);
}

export  {fetchData,getRepoData,getFollow};