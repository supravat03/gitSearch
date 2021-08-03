

function showDataFragment(repoData){
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

    return fragment;

}


function showFollowFragment(followData){

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

    return fragment;

}

export {showDataFragment, showFollowFragment};