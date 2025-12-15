/* Clear filtering */

$(document).on('click', '.clear-filter', function(){       

  var table = $('#sorttable').DataTable();
  table
   .search( '' )
   .columns().search( '' )
   .draw();

  $('#sorttable').DataTable().searchPanes.rebuildPane();
  $('#sorttable').DataTable().order([0, 'asc']).draw();

});

/* DataTable options for sort headers*/

$(document).ready(function() {
    $('#sorttable').DataTable( {
      "paging": false,
      "info": true,
      "searching": true,
      "order": [[ 0, "asc" ]],
      dom: "<'row pt-0 pl-3 pr-3'<'col-sm-6'i><'col-sm-6'f>>" +
           "<'row'<'col-sm-12't>>",
    });
} );

/* "Back To Top" button functionality */

$(document).ready(function() {
$(window).scroll(function() {
if ($(this).scrollTop() > 20) {
$('#toTopBtn').fadeIn();
} else {
$('#toTopBtn').fadeOut();
}
});

$('#toTopBtn').click(function() {
$("html, body").animate({
scrollTop: 0
}, 1000);
return false;
});
});