import {showDataFragment,showFollowFragment} from './dataFragment.js';
import {fetchData,getRepoData,getFollow} from './fetchData.js';






function showData(repoData,showRepo,showDataDiv,pagination) {
    
    
       let fragment= showDataFragment(repoData);
    
        while (showRepo.firstChild && showRepo.removeChild(showRepo.firstChild));
        showRepo.appendChild(fragment);
        showDataDiv.style.visibility = "visible";
        pagination.style.visibility = "visible";
    
    }


    function showFollow(followData,showRepo,showDataDiv,pagination) {
  
        const fragment= showFollowFragment(followData);
    
        while (showRepo.firstChild && showRepo.removeChild(showRepo.firstChild));
        showRepo.appendChild(fragment);
        showDataDiv.style.visibility = "visible";
        pagination.style.visibility = "visible";
    
    }


export { showData, showFollow};