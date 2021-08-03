function increasePage(btnPrev,btnNext,pageBtn) {
    btnPrev.value = parseInt(btnPrev.value) + 5;
    btnNext.value = parseInt(btnNext.value) + 5;

    pageBtn.forEach((btn) => {
        btn.value = parseInt(btn.value) + 5;
        btn.innerText = parseInt(btn.value);
    });

}

function decreasePage(btnPrev,btnNext,pageBtn) {
    btnPrev.value = parseInt(btnPrev.value) - 5;
    btnNext.value = parseInt(btnNext.value) - 5;

    pageBtn.forEach((btn) => {
        btn.value = parseInt(btn.value) - 5;
        btn.innerText = parseInt(btn.value);
    });
}



function resetDefaultBtn(btnPrev,btnNext,pageBtn) {
    let i = 1;
    btnPrev.value = 0;
    btnNext.value = 6;
    pageBtn.forEach((btn) => {
        btn.value = parseInt(i);
        btn.innerText = parseInt(i);
        i++;
    });

}

export {increasePage, decreasePage, resetDefaultBtn};