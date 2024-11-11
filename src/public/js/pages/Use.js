$(document).ready(function() {
    $('.select3').select2();


    let url = window.location.href.split('/'); ;
    url = url[url.length - 1] ;
    console.log(":: url :: ", url)
    let result = $(`a[href*="/admin/${url}"]`)

    $('.nav-link').removeClass('active')

    result.addClass("active");
    let parent = result.parent().parent().parent().get(0) ;
    let n = $(parent).find("a").get(0);

   

    $(n).addClass("active");
    $(parent).addClass("menu-open");

    // commission calculator
    $('#commission-percent-dispute').on('change', function(dets) {
        let walletAmount = $('#amount-dispute').text();
        let govtPercent = $('#govt-percent-dispute').val();
        console.log("govt_tax===============",govtPercent);
        govtPercent = walletAmount/100 * govtPercent
        let adminCommision = walletAmount/100 * dets.target.value
        let finalAmount =  adminCommision + govtPercent
        
        finalAmount = walletAmount - finalAmount;
        $('#commission-amount').val(Math.round(finalAmount*100)/100)
    })


});